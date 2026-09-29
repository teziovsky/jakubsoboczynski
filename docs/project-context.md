# Portfolio context

Agent context for Jakub Soboczyński’s site. Operational steps live in the repo: `AGENTS.md` and `.agents/skills/`. This file is the goal and the decisions already made.

Work is on draft PR https://github.com/teziovsky/jakubsoboczynski/pull/258 (`cursor/homepage-agent-terminal-e617`). It is not merged.

## Goal

The site should feel like a nerdy AI-agent terminal, and a non-technical visitor must still be able to read it. One visual design. Two layouts.

## Layouts

The design does not change between modes: dark background, monospace, terminal panels, the same colors.

- **Terminal** is the default. No menu, no section links, no footer. The only chrome is the layout switch. Every page is shell output: the page content renders under a prompt line such as `jakub@portfolio:~$ open uses`, with a sticky live prompt below. `open` reaches every page (`about`, `uses`, `projects`, a project, `~`). The scrollback and history survive navigation within the tab (`sessionStorage`).
- **Normal** (`Zwykły` / `Normal`) shows the menu and clickable pages: about, projects, uses, project pages, footer. Same design, ordinary arrangement.

The choice is stored in `localStorage` and must survive navigation. The switch is on screen in terminal mode without opening a menu, and available in normal mode too. Polish is the unprefixed locale. English is `/en`.

## Terminal

Prompt: `jakub@portfolio:~$`. Answers come only from site content. No LLM and no invented biography.

- Focused input: the block cursor is visible and blinking. Tab shows completions (commands and paths) and does not move focus. Escape blurs the input and does not clear the line. The cursor hides when the input is not focused.
- Unfocused: Tab and Shift+Tab move through the page, including the layout switch, then the menu when normal layout is on. The input is in that tab order.
- Unknown command: bash-style `command not found` in the page language (`bash: foobar: nie znaleziono polecenia` / `bash: foobar: command not found`).
- A sentence or question that is not a command still answers from content (`jakie projekty`, `who are you`). A single unknown token is a command, not a question.
- Write or delete commands (`rm`, `mv`, `mkdir`, `touch`, redirection) are refused with a permission-denied style line. The shell is read-only.
- Implemented read-only commands include `help`, `man`, `ls`, `cd`, `pwd`, `cat`, `head`, `tail`, `wc`, `grep`, `find`, `tree`, `file`, `echo`, `history`, `date`, `uname`, `open`, `whoami`, `clear`. `open` navigates; the others print in place. `clear` also clears the saved scrollback, not the history.
- Planned next: agent-style tool traces (B), suggested commands for non-technical visitors (C), generated `llms.txt` and `.md` versions of pages (D).

## Projects

Source of truth is GitHub, account `teziovsky` (the account already linked on the site). Not a hand-written catalog.

Include a repo only when all of these hold:

- topics include `portfolio` (case-insensitive)
- it is not a fork
- it is public, or it is private and the build accepted a token

`GITHUB_TOKEN` or `GH_TOKEN` is read only at build time. Never commit it, print it, or send it to the browser. Public `portfolio` repos still load with no token. A missing or rejected token must not fail the build.

With no token, the list is: `movie-search-engine`, `raycast-height`, `raycast-infakt`, `raycast-meta-music`, `raycast-raydocs`, `rock-paper-scissors`.

Locale blurbs stay in `src/data/project/{pl,en}/<repo-name>.md`, keyed by repo name. They are copy only, not a second catalog. If a blurb is missing, show the GitHub description. Do not invent text.

Private-repo fields that are rendered (name, description, homepage, language, stars, topics, dates, blurbs) are public on the deployed site. Do not pull extra file contents.

Vehicle Service Book was removed. It is not a public `portfolio` repo. Do not add it back unless Jakub asks.

The terminal, the projects list, and project pages all use this same filtered list.

## Toolchain

Do not disable `minimumReleaseAge`. If a newest release is inside the window, pin the newest version that passes.

- Class names: `import { cn } from "cn"` in the file that uses it. Do not re-export `cn`. Do not add `clsx` or `tailwind-merge`.
- `oxfmt` formats JS, TS, JSON, CSS, Markdown, and MDX. It does not format Astro. Prettier stays only for `*.astro` (`prettier-plugin-astro`, import sort, Tailwind class sort).
- `oxlint` runs TypeScript recommended rules and `no-unused-vars`, including Astro script blocks. ESLint keeps `eslint-plugin-astro` template rules and `no-mixed-spaces-and-tabs`. Do not enable the same rule in both.
- Vite+ was rejected. It ships Vite 8, and the Astro 7 Cloudflare adapter breaks when Vite 8 is the top-level Vite.
- TypeScript stays on 6.0.3. TypeScript 7 is published, and Astro plus typescript-eslint do not support it yet.
- `pnpm.overrides` lives in `pnpm-workspace.yaml`. pnpm no longer reads a `pnpm` field in `package.json`.
- `npm run fix` is format, then lint, then `astro check`. Do not run `pnpm run clean` unless the intent is to delete dependencies and lockfiles.

Removed as direct dependencies: `clsx`, `tailwind-merge`, `concurrently`, `@typescript-eslint/eslint-plugin`, `astro-eslint-parser`, `eslint-plugin-jsx-a11y`. pnpm may still link `eslint-plugin-jsx-a11y` as an optional peer of `eslint-plugin-astro`. Its rules are not enabled. It warns that it wants ESLint 9.

## Skills in the repo

- `.agents/skills/format-and-lint`
- `.agents/skills/add-locale-page`
- `.agents/skills/add-project-blurb`
- `.agents/skills/terminal-shell`

## Leave alone unless asked

About, uses, and social content are not the GitHub project list. Polish stays the default language. The normal layout must keep real links. The terminal layout must not grow a menu.
