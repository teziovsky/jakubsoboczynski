---
name: add-locale-page
description: Use when adding or changing a routable page, nav label, or other user-facing string that must exist in Polish and English.
---

# Add a page in both locales

## When to use

Use this when adding a page, a section, or copy visitors read. Polish is the default language and English is the `/en` tree.

## Steps

1. Put shared markup in `src/pages/_components/<name>-view.astro`. Read the language with `getLang` and strings with `useTranslations` from `@/i18n/utils`.
2. Add a thin wrapper at the unprefixed Polish route, for example `src/pages/<route>.astro`, and the same wrapper at `src/pages/en/<route>.astro`. Both render the shared view.
3. Add every new string to both `pl` and `en` in `src/i18n/ui.ts`. Use the Polish key set as the source of truth.
4. Build links with `getLocalizedPath`. Polish paths stay unprefixed (`/o-mnie/`, `/projekty/<slug>/`). English paths start with `/en`.
5. If the page is linked from the menu, add it only inside chrome marked `data-show="normal"`. Terminal layout must not gain a menu link.
6. Run `npm run fix`.

## What not to do

- Do not treat `astro.config.mjs` `defaultLocale: "en"` as the site default. `src/i18n/ui.ts` has `defaultLang = "pl"`.
- Do not duplicate the view markup in both route files.
- Do not add a Polish-only or English-only string.
- Do not hand-write `lastModified` or `minutesRead` on content entries. Remark plugins set those at render.
- Do not show the new page as a clickable nav item in the terminal layout.
