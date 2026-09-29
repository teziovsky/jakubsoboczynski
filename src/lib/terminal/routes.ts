import type { Languages } from "@/i18n/ui";
import { getLocalizedPath, getPathWithoutLang } from "@/i18n/utils";

export type PageRoute = { command: string | null; cwd: string };

const PAGES: readonly { name: string; path: string; cwd: string; aliases: readonly string[] }[] = [
  { name: "home", path: "/", cwd: "/", aliases: ["", "home"] },
  { name: "about", path: "/o-mnie/", cwd: "/about", aliases: ["about", "o-mnie", "about/o-mnie"] },
  { name: "uses", path: "/uses/", cwd: "/uses", aliases: ["uses", "uses-tech", "uses/uses-tech"] },
  { name: "projects", path: "/projekty/", cwd: "/projects", aliases: ["projects", "projekty"] },
];

function cleanTarget(target: string): string {
  return target
    .trim()
    .toLowerCase()
    .replace(/^~\/?/, "")
    .replace(/^\.\/+/, "")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
}

/** The command that leads to this URL and the cwd the shell starts in there. */
export function routeForPath(pathname: string): PageRoute | null {
  const bare = getPathWithoutLang(pathname.replace(/index\.html$/, ""));
  for (const page of PAGES) {
    if (bare === page.path) return { command: page.name === "home" ? null : `open ${page.name}`, cwd: page.cwd };
  }
  const project = /^\/projekty\/([^/]+)\/$/.exec(bare);
  if (project?.[1]) return { command: `open ${decodeURIComponent(project[1])}`, cwd: "/projects" };
  return null;
}

/** The localized URL of a site page named by `open`, or null when the target is not a page. */
export function pageHref(target: string, lang: Languages): string | null {
  const cleaned = cleanTarget(target);
  const page = PAGES.find((entry) => entry.aliases.includes(cleaned));
  return page ? getLocalizedPath(page.path, lang) : null;
}
