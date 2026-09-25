---
name: terminal-shell
description: Use when changing homepage terminal commands, command-not-found behavior, Tab completion, or keyboard focus between the shell and the layout toggle.
---

# Terminal command behavior

## When to use

Use this when editing `src/lib/terminal/` or the homepage shell in `src/pages/_components/terminal-view.astro`. The shell is how the terminal layout browses the site.

## Steps

1. Keep the command list in `COMMANDS` inside `src/lib/terminal/engine.ts`. Implemented commands are read-only: `cd`, `cat`, `pwd`, `ls`, `echo`, `whoami`, `clear`, `history`, `head`, `tail`, `wc`, `find`, `grep`, `tree`, `file`, `uname`, `date`, `man`, `help`, and `open`.
2. Send `open <project>` to `/projekty/<slug>/` or `/en/projekty/<slug>/` for the current language.
3. Treat a single token, and any other command-shaped line, as a shell command. Unknown names use `terminal.error.command-not-found` (`bash: <name>: nie znaleziono polecenia` / `bash: <name>: command not found`).
4. Keep write commands (`rm`, `mv`, and the rest of `WRITE_COMMANDS`) and redirection on `terminal.error.denied`.
5. Leave questions and prose to the content answer path. A line is not a command when it contains `?` or `!`, a question word, or four or more tokens with no flag or path.
6. Tab, while the input is focused, calls `suggestInput` and must not move focus. Print several matches in the scrollback and insert their shared prefix. One match completes the token. Escape blurs the input and does not clear it.
7. Add any new visitor-facing help or error string to both locales in `src/i18n/ui.ts`.

## What not to do

- Do not call an external model. Answers come from the content collections and GitHub project data already loaded into the corpus.
- Do not use Node `fs` in code that runs during Cloudflare prerender.
- Do not remove the input from tab order. When it is not focused, Tab and Shift+Tab must be able to reach `[data-layout-choice]`.
- Do not add menu or footer links to the terminal layout. Browsing stays in the shell; `open` may still navigate.
- Do not complete on Shift+Tab, Alt+Tab, or Ctrl+Tab. Only unmodified Tab completes.
