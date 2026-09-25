---
name: add-project-blurb
description: Use when adding or editing a localized description for a GitHub project shown on the portfolio.
---

# Add a translated project blurb

## When to use

Use this when a GitHub repo shown on the portfolio should have Polish and English copy. The repo list itself comes from GitHub at build time.

## Steps

1. Confirm the repo name. Projects are non-fork repos for the GitHub login in `src/data/social-link/pl/github.mdx` (and the English file) that have the topic `portfolio`. Private ones are included only when a build-time token is accepted. The filename must be that repo's `name`.
2. Add `src/data/project/pl/<repo-name>.md` and `src/data/project/en/<repo-name>.md`. The body is the blurb. Optional frontmatter is `intro` only.
3. Keep the two blurbs in the same voice, translated rather than copied. The view loads the entry whose id is `${lang}/<repo-name>`.
4. Leave the page routes alone. `src/pages/projekty/[slug].astro` and `src/pages/en/projekty/[slug].astro` already call `getProjectSlugs()`.
5. Run `pnpm run build` so the GitHub fetch and the new entries both resolve.

## What not to do

- Do not add a project that is not a non-fork repo under that GitHub login with the topic `portfolio`. It will not appear.
- Do not put `lastModified` or `minutesRead` in the frontmatter.
- Do not invent a third locale directory.
- Do not commit a GitHub token or print it. `GITHUB_TOKEN` or `GH_TOKEN` is read only at build time; if it is missing or rejected, the public `portfolio` list still builds.
- If either blurb file is absent, the UI falls back to the GitHub description. Do not duplicate that description into one locale and leave the other stale on purpose.
