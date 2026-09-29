export type GitHubRepo = {
  name: string;
  /** Null for private repos: their GitHub page must never be linked. */
  htmlUrl: string | null;
  private: boolean;
  /** The preview URL. Repos without one are not listed. */
  homepage: string | null;
  description: string | null;
  language: string | null;
  stars: number;
  topics: string[];
  pushedAt: string;
  updatedAt: string;
};

type ApiRepo = {
  name?: string;
  fork?: boolean;
  private?: boolean;
  html_url?: string;
  homepage?: string | null;
  description?: string | null;
  language?: string | null;
  stargazers_count?: number;
  topics?: unknown;
  pushed_at?: string | null;
  updated_at?: string | null;
  owner?: { login?: string };
};

type ListedRepo = Omit<GitHubRepo, "htmlUrl"> & { htmlUrl: string; ownerLogin: string };

/** Non-fork repos of `username` tagged `portfolio` with a preview URL, plus private ones when `token` is accepted. */
export async function fetchPortfolioRepos(
  username: string,
  token: string,
  fetchImpl: typeof fetch = fetch,
): Promise<GitHubRepo[]> {
  // Check the token first so an accepted one also lifts the anonymous rate limit on the public listing.
  let owned: ListedRepo[] = [];
  let acceptedToken = "";
  if (token) {
    try {
      const visible = await fetchRepoPages(
        fetchImpl,
        "https://api.github.com/user/repos?per_page=100&sort=pushed&visibility=all&affiliation=owner",
        githubHeaders(token),
        true,
      );
      if (visible) {
        acceptedToken = token;
        owned = visible.filter((repo) => repo.ownerLogin.toLowerCase() === username.toLowerCase());
      }
    } catch {
      acceptedToken = "";
    }
  }

  const publicRepos = await fetchRepoPages(
    fetchImpl,
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed&type=owner`,
    githubHeaders(acceptedToken),
    false,
  );
  const listed = mergeListed(publicRepos, owned);

  const withPreview = listed.filter((repo) => repo.homepage);
  const portfolio = await keepPortfolioRepos(fetchImpl, username, withPreview, acceptedToken);
  return portfolio.map(withoutOwner).sort((a, b) => b.pushedAt.localeCompare(a.pushedAt));
}

function githubHeaders(token = "") {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "jakubsoboczynski-portfolio",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function fetchRepoPages(
  fetchImpl: typeof fetch,
  initialUrl: string,
  headers: Record<string, string>,
  includePrivate: false,
): Promise<ListedRepo[]>;
async function fetchRepoPages(
  fetchImpl: typeof fetch,
  initialUrl: string,
  headers: Record<string, string>,
  includePrivate: true,
): Promise<ListedRepo[] | null>;
async function fetchRepoPages(
  fetchImpl: typeof fetch,
  initialUrl: string,
  headers: Record<string, string>,
  includePrivate: boolean,
) {
  const repos: ListedRepo[] = [];
  let url: string | null = initialUrl;
  let pages = 0;

  while (url && pages < 10) {
    const response = await fetchImpl(url, { headers });
    if (includePrivate && (response.status === 401 || response.status === 403)) return null;
    if (!response.ok) {
      throw new Error(`GitHub repository request failed (${response.status} ${response.statusText})`);
    }

    const page = (await response.json()) as ApiRepo[];
    for (const repo of page) repos.push(...normalizeRepo(repo, includePrivate));
    url = nextPage(response.headers.get("link"));
    pages += 1;
  }

  return repos;
}

function normalizeRepo(repo: ApiRepo, includePrivate: boolean): ListedRepo[] {
  if (repo.fork) return [];
  if (repo.private && !includePrivate) return [];
  if (!repo.name || !repo.html_url) return [];

  const homepage = typeof repo.homepage === "string" ? repo.homepage.trim() : "";

  return [
    {
      name: repo.name,
      htmlUrl: repo.html_url,
      private: repo.private === true,
      homepage: homepage || null,
      description: repo.description?.trim() || null,
      language: repo.language?.trim() || null,
      stars: typeof repo.stargazers_count === "number" ? repo.stargazers_count : 0,
      topics: topicNames(repo.topics),
      pushedAt: repo.pushed_at ?? "",
      updatedAt: repo.updated_at ?? "",
      ownerLogin: repo.owner?.login ?? "",
    },
  ];
}

function mergeListed(base: ListedRepo[], extra: ListedRepo[]) {
  const byName = new Map(base.map((repo) => [repo.name.toLowerCase(), repo]));
  for (const repo of extra) byName.set(repo.name.toLowerCase(), repo);
  return [...byName.values()];
}

function withoutOwner(repo: ListedRepo): GitHubRepo {
  return {
    name: repo.name,
    htmlUrl: repo.private ? null : repo.htmlUrl,
    private: repo.private,
    homepage: repo.homepage,
    description: repo.description,
    language: repo.language,
    stars: repo.stars,
    topics: repo.topics,
    pushedAt: repo.pushedAt,
    updatedAt: repo.updatedAt,
  };
}

function topicNames(value: unknown) {
  return Array.isArray(value) ? value.filter((topic): topic is string => typeof topic === "string") : [];
}

function isPortfolioTopic(topic: string) {
  return topic.toLowerCase() === "portfolio";
}

async function keepPortfolioRepos(fetchImpl: typeof fetch, username: string, repos: ListedRepo[], token: string) {
  const headers = githubHeaders(token);
  const detailed: ListedRepo[] = new Array(repos.length);
  let next = 0;

  async function worker() {
    while (next < repos.length) {
      const index = next;
      next += 1;
      const repo = repos[index];
      if (!repo) continue;
      const topics = await topicNamesFor(fetchImpl, username, repo, headers);
      detailed[index] = { ...repo, topics };
    }
  }

  await Promise.all(Array.from({ length: Math.min(4, repos.length) }, () => worker()));
  return detailed.filter((repo) => repo?.topics?.some(isPortfolioTopic));
}

async function topicNamesFor(
  fetchImpl: typeof fetch,
  username: string,
  repo: ListedRepo,
  headers: Record<string, string>,
) {
  if (repo.topics.some(isPortfolioTopic)) return repo.topics;

  try {
    const response = await fetchImpl(
      `https://api.github.com/repos/${encodeURIComponent(username)}/${encodeURIComponent(repo.name)}/topics`,
      { headers },
    );
    if (!response.ok) return repo.topics;
    const body = (await response.json()) as { names?: unknown };
    return topicNames(body.names);
  } catch {
    return repo.topics;
  }
}

function nextPage(link: string | null) {
  if (!link) return null;

  for (const part of link.split(",")) {
    const match = /<([^>]+)>;\s*rel="next"/.exec(part);
    if (match?.[1]) return match[1];
  }

  return null;
}
