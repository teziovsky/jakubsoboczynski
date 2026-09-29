# AGENTS.md

## Commands

- `pnpm install` must succeed with the release-age policy left on. Do not disable `minimumReleaseAge`. Packages that were inside the window are pinned with exact versions in `package.json` and `overrides` in `pnpm-workspace.yaml`.
- `npm run fix` formats, lints, then runs `astro check`.
- Format: `oxfmt` (`.oxfmtrc.json`) for JS, TS, JSON, CSS, Markdown, and MDX. Prettier formats `*.astro` only. Oxfmt does not format Astro, so that Prettier scope stays: `prettier`, `prettier-plugin-astro`, `@trivago/prettier-plugin-sort-imports`, and `prettier-plugin-tailwindcss`.
- Lint: `oxlint` (`.oxlintrc.json`) runs the TypeScript recommended set and `no-unused-vars` on JS/TS, including Astro script blocks. ESLint runs only `eslint-plugin-astro` template rules plus `no-mixed-spaces-and-tabs`, which oxlint does not implement. Do not enable the same rule in both.
- `pnpm run typecheck` is `astro check`. `pnpm run build` is the production build. `pnpm test` runs `src/**/*.test.ts` with Node's built-in runner (Node 24+, `scripts/test-resolve.mjs` maps `@/`). Test files are excluded from `astro check`.
- Do not run `pnpm run clean`.
- Do not add Vite+. It ships Vite 8, and this Astro 7 Cloudflare adapter breaks when Vite 8 is resolved as the top-level Vite.

## App

- Astro 7 portfolio, Cloudflare adapter. `wrangler.jsonc` serves `./dist/client` with `not_found_handling: "404-page"`.
- Every page is prerendered, with `prerenderEnvironment: "node"`. Keep it: under workerd the build's `process.env` has no `GITHUB_TOKEN`/`GH_TOKEN`. Never read the token through `import.meta.env`, which inlines it into the bundle.
- `@/*` resolves to `src/*`.
- Tailwind v4 via `@tailwindcss/vite`, configured in `src/global.css` with `@theme`, `@utility`, and `@variant`. There is no `tailwind.config`.
- Combine class names with `import { cn } from "cn"` in the file that uses it. Do not re-export `cn`, and do not add `clsx` or `tailwind-merge`.

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

- Projects are non-fork GitHub repos for the login in `src/data/social-link/{pl,en}/github.mdx` whose topics include `portfolio` (case-insensitive). Public repos load with no token. `GITHUB_TOKEN` or `GH_TOKEN` is read only at build time; when it is accepted, private `portfolio` repos of that account are included too, and a missing or rejected token keeps the public list. Optional blurbs are `src/data/project/{pl,en}/<repo-name>.md` and apply only to repos that pass the filter. A missing blurb falls back to the GitHub description.
- The shell is `src/lib/terminal/`, mounted on every page by `src/components/shell-frame.astro` inside `layout.astro`. In terminal layout each page is the output of the command in `src/lib/terminal/routes.ts` (`open about`, `open uses`, `open projects`, `open <project>`). It is read-only. `open` navigates to any of those pages. The corpus is served from `/terminal/{lang}.json`. Scrollback and history persist in `sessionStorage` (`terminal-session:<lang>`). A single unknown token, and any other command-shaped line, prints bash "command not found" in the page language. Write commands and redirection stay permission-denied. Sentences that are not command-shaped are answered only from site content.
- While the terminal input is focused, Tab completes and does not move focus. Several matches are printed in the scrollback and the shared prefix is inserted. Escape blurs the input and does not clear it. The block cursor blinks only while that input is focused. When the input is not focused, Tab and Shift+Tab move through the page controls, including the layout toggle.
