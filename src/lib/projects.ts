import { getCollection } from "astro:content";

import { format } from "date-fns";
import { enGB, pl } from "date-fns/locale";

import { type Languages, defaultLang } from "@/i18n/ui";

export type GitHubRepo = {
  name: string;
  htmlUrl: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  stars: number;
  topics: string[];
  pushedAt: string;
  updatedAt: string;
};

export type Project = GitHubRepo & {
  blurb: string | null;
  intro: string | null;
  summary: string | null;
  href: string;
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

type ListedRepo = GitHubRepo & { ownerLogin: string };

let pendingRepos: Promise<GitHubRepo[]> | null = null;
let pendingUsername: string | null = null;

export function projectPath(lang: Languages, name: string) {
  const path = `/projekty/${name}/`;
  return lang === defaultLang ? path : `/en${path}`;
}

export function formatProjectDate(iso: string, lang: Languages) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return format(date, "d MMM yyyy", { locale: lang === "pl" ? pl : enGB });
}

export async function githubLogin() {
  const links = await getCollection("social-link");
  for (const link of links) {
    try {
      const url = new URL(link.data.link);
      if (url.hostname !== "github.com" && url.hostname !== "www.github.com") continue;
      const login = url.pathname.split("/").filter(Boolean)[0];
      if (login) return login;
    } catch {
      continue;
    }
  }

  return "jakubsoboczynski";
}

export async function getProjectSlugs() {
  const repos = await loadGitHubRepos(await githubLogin());
  return repos.map((repo) => repo.name);
}

export async function getProjects(lang: Languages): Promise<Project[]> {
  const [repos, copies] = await Promise.all([loadGitHubRepos(await githubLogin()), getCollection("project")]);

  return repos.map((repo) => {
    const copy = copies.find((entry) => entry.id === `${lang}/${repo.name}`);
    const blurb = copy?.body?.trim() || null;
    const introValue = copy?.data.intro?.trim();
    const intro = introValue ? introValue : null;
    const summary = blurb || repo.description;

    return {
      ...repo,
      blurb,
      intro,
      summary,
      href: projectPath(lang, repo.name),
    };
  });
}

export async function getProject(lang: Languages, slug: string) {
  const projects = await getProjects(lang);
  return projects.find((project) => project.name === slug) ?? null;
}

async function loadGitHubRepos(username: string) {
  if (!pendingRepos || pendingUsername !== username) {
    pendingUsername = username;
    pendingRepos = fetchRepos(username);
  }

  return pendingRepos;
}

async function fetchRepos(username: string) {
  const publicRepos = await fetchRepoPages(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed&type=owner`,
    githubHeaders(),
    false,
  );

  const token = readBuildToken();
  let listed = publicRepos;
  let acceptedToken = "";
  if (token) {
    try {
      const visible = await fetchRepoPages(
        "https://api.github.com/user/repos?per_page=100&sort=pushed&visibility=all&affiliation=owner",
        githubHeaders(token),
        true,
      );
      if (visible) {
        acceptedToken = token;
        const owned = visible.filter((repo) => repo.ownerLogin.toLowerCase() === username.toLowerCase());
        listed = mergeListed(publicRepos, owned);
      }
    } catch {
      acceptedToken = "";
    }
  }

  const portfolio = await keepPortfolioRepos(username, listed, acceptedToken);
  return portfolio.map(withoutOwner).sort((a, b) => b.pushedAt.localeCompare(a.pushedAt));
}

function readBuildToken() {
  const env = globalThis.process?.env;
  if (!env) return "";
  const names = ["GITHUB_TOKEN", "GH_TOKEN"];
  for (const name of names) {
    const value = env[name];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
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
  initialUrl: string,
  headers: Record<string, string>,
  includePrivate: false,
): Promise<ListedRepo[]>;
async function fetchRepoPages(
  initialUrl: string,
  headers: Record<string, string>,
  includePrivate: true,
): Promise<ListedRepo[] | null>;
async function fetchRepoPages(initialUrl: string, headers: Record<string, string>, includePrivate: boolean) {
  const repos: ListedRepo[] = [];
  let url: string | null = initialUrl;
  let pages = 0;

  while (url && pages < 10) {
    const response = await fetch(url, { headers });
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
    htmlUrl: repo.htmlUrl,
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

async function keepPortfolioRepos(username: string, repos: ListedRepo[], token: string) {
  const headers = githubHeaders(token);
  const detailed: ListedRepo[] = new Array(repos.length);
  let next = 0;

  async function worker() {
    while (next < repos.length) {
      const index = next;
      next += 1;
      const repo = repos[index];
      if (!repo) continue;
      const topics = await topicNamesFor(username, repo, headers);
      detailed[index] = { ...repo, topics };
    }
  }

  await Promise.all(Array.from({ length: Math.min(4, repos.length) }, () => worker()));
  return detailed.filter((repo) => repo?.topics?.some(isPortfolioTopic));
}

async function topicNamesFor(username: string, repo: ListedRepo, headers: Record<string, string>) {
  if (repo.topics.some(isPortfolioTopic)) return repo.topics;

  try {
    const response = await fetch(
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
