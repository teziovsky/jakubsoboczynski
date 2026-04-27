# AGENTS.md

## Commands

- `pnpm run fix` is the broad local cleanup path: format, ESLint `--fix`, then `astro check`.
- For focused verification use `pnpm run typecheck` (`astro check`) and `pnpm run build`; there is no test script in this repo.
- Avoid `pnpm run clean` unless intentionally deleting dependencies and lockfiles; it removes `.astro`, `dist`, `node_modules`, `package-lock.json`, `pnpm-lock.yaml`, and `bun.lockb`.

## App Shape

- This is an Astro 5 portfolio deployed through the Cloudflare adapter; `wrangler.jsonc` serves `./dist` with `not_found_handling: "404-page"`.
- `@/*` resolves to `src/*`; keep imports in that style when matching existing code.
- Tailwind is v4 via `@tailwindcss/vite` and configured in `src/global.css` with `@theme`, `@utility`, and `@variant`, not a `tailwind.config.*` file.

## I18n And Content

- Site helpers treat Polish as the unprefixed/default language: `src/i18n/ui.ts` has `defaultLang = "pl"`; `/en/...` is English. Do not infer default language from `astro.config.mjs` alone.
- Shared page views live in `src/pages/_components/*-view.astro`; route files at root and `src/pages/en/` are thin wrappers.
- Content collections are file-backed under `src/data/{about-me,project,social-link,uses}/{pl,en}` and schemas live in `src/content.config.ts`.
- `about-me` and `uses` views load fixed IDs (`${lang}/o-mnie`, `${lang}/uses-tech`); project and social-link views filter entries by `id.startsWith(lang)`.
- Adding user-facing text usually requires both locale MDX files plus matching keys in `src/i18n/ui.ts`.
- Markdown frontmatter gets `lastModified` and `minutesRead` from remark plugins during render; do not hand-maintain those fields unless a schema explicitly needs them.

## Formatting And Hooks

- After changes run `npm run fix` to apply formatting and linting fixes.

## Caveman

Terse like caveman. Technical substance exact. Only fluff die.
Drop: articles, filler (just/really/basically), pleasantries, hedging.
Fragments OK. Short synonyms. Code unchanged.
Pattern: [thing] [action] [reason]. [next step].
ACTIVE EVERY RESPONSE. No revert after many turns. No filler drift.
Code/commits/PRs: normal. Off: "stop caveman" / "normal mode".
