import { getCollection } from "astro:content";

import { format } from "date-fns";
import { enGB, pl } from "date-fns/locale";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

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
};

type RepoCache = {
  username: string;
  repos: GitHubRepo[];
};

const CACHE_PATH = fileURLToPath(new URL("../../.astro/github-repos.json", import.meta.url));
const CACHE_MAX_AGE_MS = 15 * 60 * 1000;

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
    pendingRepos = readOrFetchRepos(username);
  }

  return pendingRepos;
}

async function readOrFetchRepos(username: string) {
  const cached = await readCache(username);
  if (cached) return cached;

  const repos = await fetchRepos(username);
  await writeCache({ username, repos });
  return repos;
}

async function readCache(username: string) {
  try {
    const info = await stat(CACHE_PATH);
    if (Date.now() - info.mtimeMs > CACHE_MAX_AGE_MS) return null;
    const parsed = JSON.parse(await readFile(CACHE_PATH, "utf8")) as RepoCache;
    if (parsed.username !== username || !Array.isArray(parsed.repos)) return null;
    return parsed.repos;
  } catch {
    return null;
  }
}

async function writeCache(cache: RepoCache) {
  await mkdir(dirname(CACHE_PATH), { recursive: true });
  await writeFile(CACHE_PATH, JSON.stringify(cache));
}

async function fetchRepos(username: string) {
  const headers = githubHeaders();
  const repos: GitHubRepo[] = [];
  let url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed&type=owner`;
  let pages = 0;

  while (url && pages < 10) {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`GitHub repository request failed (${response.status} ${response.statusText}) for ${username}`);
    }

    const page = (await response.json()) as ApiRepo[];
    for (const repo of page) repos.push(...normalizeRepo(repo));
    url = nextPage(response.headers.get("link")) ?? "";
    pages += 1;
  }

  return repos.sort((a, b) => b.pushedAt.localeCompare(a.pushedAt));
}

function githubHeaders() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "jakubsoboczynski-portfolio",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

function normalizeRepo(repo: ApiRepo): GitHubRepo[] {
  if (repo.fork || repo.private) return [];
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
      topics: Array.isArray(repo.topics)
        ? repo.topics.filter((topic): topic is string => typeof topic === "string")
        : [],
      pushedAt: repo.pushed_at ?? "",
      updatedAt: repo.updated_at ?? "",
    },
  ];
}

function nextPage(link: string | null) {
  if (!link) return null;

  for (const part of link.split(",")) {
    const match = /<([^>]+)>;\s*rel="next"/.exec(part);
    if (match?.[1]) return match[1];
  }

  return null;
}
