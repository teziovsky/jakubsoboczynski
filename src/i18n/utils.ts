import { defaultLang, ui } from "./ui";

export function getLang(params: Record<string, string | undefined>, url: URL) {
  const { lang } = params;
  const [, urlLang] = url.pathname.split("/");
  const pageLang = lang ?? urlLang;
  if (pageLang in ui) return pageLang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
