---
name: format-and-lint
description: Use when changing format or lint config, adding a dependency, or running cleanup before a build. Covers oxfmt, the Astro-only Prettier scope, the oxlint/ESLint split, and the release-age pin policy.
---

# Format and lint

## When to use

Use this when editing tooling, `package.json`, lockfile pins, or before claiming `npm run fix` / `pnpm run build` passed.

## Steps

1. Format with the existing scripts. `oxfmt` owns JS, TS, JSON, CSS, Markdown, and MDX (`.oxfmtrc.json`). Prettier owns `*.astro` only.
2. Lint with `oxlint` first, then ESLint. Oxlint holds the TypeScript recommended rules and `no-unused-vars` (see `.oxlintrc.json`). ESLint holds `eslint-plugin-astro` template rules and `no-mixed-spaces-and-tabs` (`eslint.config.js`).
3. Keep `minimumReleaseAge` enabled. If install fails with `ERR_PNPM_MINIMUM_RELEASE_AGE_VIOLATION`, pin the newest version older than the window in `package.json` and `pnpm.overrides`. Re-run `pnpm install` with the policy still on.
4. Finish with `npm run fix`, then `pnpm run build`.

## What not to do

- Do not format `.astro` with oxfmt, and do not run Prettier on the file types oxfmt already formats.
- Do not enable one rule in both oxlint and ESLint.
- Do not remove ESLint while Astro template rules (`astro/*`) are still required. Oxlint does not lint Astro templates.
- Do not disable `minimumReleaseAge` or run `pnpm run clean`.
- Do not add Vite+. It pulls Vite 8, which breaks this Astro 7 Cloudflare adapter.
- Do not add `clsx` or `tailwind-merge`. Class names go through `cn` from the `cn` package.
