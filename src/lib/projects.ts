import { getCollection } from "astro:content";

import { format } from "date-fns";
import { enGB, pl } from "date-fns/locale";

import { type Languages, defaultLang } from "@/i18n/ui";
import { type GitHubRepo, fetchPortfolioRepos } from "@/lib/github";

export type Project = GitHubRepo & {
  blurb: string | null;
  intro: string | null;
  summary: string | null;
  href: string;
};

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
  return fetchPortfolioRepos(username, readBuildToken());
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
