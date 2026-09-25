# AGENTS.md

## Commands

- `pnpm install` must succeed with the release-age policy left on. Do not disable `minimumReleaseAge`. Packages that were inside the window are pinned in `package.json` (`pnpm.overrides` and exact versions).
- `npm run fix` formats, lints, then runs `astro check`.
- Format: `oxfmt` (`.oxfmtrc.json`) for JS, TS, JSON, CSS, Markdown, and MDX. Prettier formats `*.astro` only. Oxfmt does not format Astro, so that Prettier scope stays: `prettier`, `prettier-plugin-astro`, `@trivago/prettier-plugin-sort-imports`, and `prettier-plugin-tailwindcss`.
- Lint: `oxlint` (`.oxlintrc.json`) runs the TypeScript recommended set and `no-unused-vars` on JS/TS, including Astro script blocks. ESLint runs only `eslint-plugin-astro` template rules plus `no-mixed-spaces-and-tabs`, which oxlint does not implement. Do not enable the same rule in both.
- `pnpm run typecheck` is `astro check`. `pnpm run build` is the production build. There is no test script.
- Do not run `pnpm run clean`.
- Do not add Vite+. It ships Vite 8, and this Astro 7 Cloudflare adapter breaks when Vite 8 is resolved as the top-level Vite.

## App

- Astro 7 portfolio, Cloudflare adapter. `wrangler.jsonc` serves `./dist/client` with `not_found_handling: "404-page"`.
- `@/*` resolves to `src/*`.
- Tailwind v4 via `@tailwindcss/vite`, configured in `src/global.css` with `@theme`, `@utility`, and `@variant`. There is no `tailwind.config`.
- Combine class names with `cn` from the `cn` package. `src/lib/utils.ts` re-exports it. Do not add `clsx` or `tailwind-merge`.

## I18n and content

- Polish is the unprefixed default: `defaultLang = "pl"` in `src/i18n/ui.ts`. English is `/en/...`. Do not infer the default language from `astro.config.mjs`.
- Shared views live in `src/pages/_components/*-view.astro`. Files in `src/pages/` and `src/pages/en/` are thin wrappers.
- Collections are under `src/data/{about-me,project,social-link,uses}/{pl,en}`. Schemas are in `src/content.config.ts`.
- `about-me` and `uses` load `${lang}/o-mnie` and `${lang}/uses-tech`. Project and social-link views keep entries whose id starts with `${lang}/`.
- New user-facing copy needs both locales and matching keys in `src/i18n/ui.ts`.
- Remark plugins set `lastModified` and `minutesRead` at render. Do not hand-write those fields.

## Layout

- `localStorage` key `site-layout`, default `terminal`, applied as `html[data-layout]`.
- Terminal layout shows only the layout toggle (`[data-layout-choice]`). No menu, sidebar links, footer links, or section links. The toggle stays visible on desktop and phone without opening a menu.
- Normal layout shows the menu, readable pages, and footer. The same toggle stays visible.
- The toggle changes layout only. Both modes use the same dark monospace styles. Chrome that belongs to one layout uses `data-show="terminal"` or `data-show="normal"`.

## Projects and the shell

- Projects are public, non-fork GitHub repos for the login in `src/data/social-link/{pl,en}/github.mdx`. Optional blurbs are `src/data/project/{pl,en}/<repo-name>.md`. A missing blurb falls back to the GitHub description.
- The homepage shell is `src/lib/terminal/`. It is read-only. `open <project>` navigates to that project's page. A single unknown token, and any other command-shaped line, prints bash "command not found" in the page language. Write commands and redirection stay permission-denied. Sentences that are not command-shaped are answered only from site content.
- While the terminal input is focused, Tab completes and does not move focus. Several matches are printed in the scrollback and the shared prefix is inserted. Escape blurs the input and does not clear it. When the input is not focused, Tab and Shift+Tab move through the page controls, including the layout toggle.
