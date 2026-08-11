import { type Languages, defaultLang, ui } from "./ui";

export function getLang(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (!lang) return defaultLang;
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

/** Normalize a pathname to a trailing-slash form (except bare empty). */
function withTrailingSlash(pathname: string) {
  if (!pathname || pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

/** Strip the `/en` locale prefix, returning the shared path. */
export function getPathWithoutLang(pathname: string) {
  const normalized = withTrailingSlash(pathname);
  if (normalized === "/en/") return "/";
  if (normalized.startsWith("/en/")) return normalized.slice(3);
  return normalized;
}

/** Build a locale-prefixed path that matches the site's sitemap URLs. */
export function getLocalizedPath(pathname: string, targetLang: Languages) {
  const bare = getPathWithoutLang(pathname);
  if (targetLang === defaultLang) return bare;
  return bare === "/" ? "/en/" : `/en${bare}`;
}

export function getLanguageAlternates(pathname: string, site: URL | undefined) {
  const origin = site?.origin ?? "https://jakubsoboczynski.pl";
  const plPath = getLocalizedPath(pathname, "pl");
  const enPath = getLocalizedPath(pathname, "en");

  return [
    { href: new URL(plPath, origin).href, hrefLang: "pl" },
    { href: new URL(enPath, origin).href, hrefLang: "en" },
    { href: new URL(plPath, origin).href, hrefLang: "x-default" },
  ];
}
