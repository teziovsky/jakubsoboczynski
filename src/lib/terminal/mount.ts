import { navigate } from "astro:transitions/client";

import { promptFor, runCommand, suggestInput } from "@/lib/terminal/engine";
import type { TermLine, TerminalPayload } from "@/lib/terminal/types";

const TONE_CLASS: Record<TermLine["tone"], string> = {
  text: "text-emerald-100",
  error: "text-rose-300",
  muted: "text-slate-500",
  dir: "text-sky-300",
  accent: "text-amber-200",
};

export function mountTerminal(root: HTMLElement, payload: TerminalPayload) {
  const scrollback = root.querySelector<HTMLElement>("[data-scrollback]");
  const prompt = root.querySelector<HTMLElement>("[data-prompt]");
  const form = root.querySelector<HTMLFormElement>("[data-form]");
  const input = root.querySelector<HTMLInputElement>("[data-command]");
  const cursor = root.querySelector<HTMLElement>("[data-cursor]");
  const hint = root.querySelector<HTMLElement>("[data-hint]");
  if (!scrollback || !prompt || !form || !input || !cursor || !hint) return;

  let cwd = "/";
  const history: string[] = [];
  let historyIndex = -1;
  let draft = "";

  const renderPrompt = () => {
    prompt.textContent = promptFor(cwd);
  };

  const syncCursor = () => {
    const empty = input.value.length === 0;
    cursor.classList.toggle("hidden", !empty);
    input.style.caretColor = empty ? "transparent" : "#6ee7b7";
  };

  const showHint = (matches: string[]) => {
    if (matches.length < 2) {
      hint.textContent = "";
      hint.classList.add("hidden");
      return;
    }
    hint.textContent = matches.slice(0, 12).join("   ");
    hint.classList.remove("hidden");
  };

  const scrollToEnd = () => {
    scrollback.scrollTop = scrollback.scrollHeight;
  };

  const appendLine = (parent: HTMLElement, entry: TermLine, href?: string) => {
    const row = document.createElement("div");
    row.className = `whitespace-pre-wrap break-words ${TONE_CLASS[entry.tone]}`;
    if (href && entry.tone === "accent") {
      const anchor = document.createElement("a");
      anchor.href = href;
      anchor.textContent = entry.text;
      anchor.className = "inline-flex min-h-11 items-center break-all underline underline-offset-2";
      row.append(anchor);
    } else {
      appendLinkified(row, entry.text);
    }
    parent.append(row);
  };

  const appendBlock = (command: string, lines: TermLine[], href?: string) => {
    const block = document.createElement("div");
    block.className = "mt-3";
    const typed = document.createElement("div");
    typed.className = "flex flex-wrap gap-x-2";
    const promptEl = document.createElement("span");
    promptEl.className = "shrink-0 text-emerald-300";
    promptEl.textContent = promptFor(cwd);
    const commandEl = document.createElement("span");
    commandEl.className = "min-w-0 break-all text-emerald-50";
    commandEl.textContent = command;
    typed.append(promptEl, commandEl);
    block.append(typed);
    for (const entry of lines) appendLine(block, entry, href);
    scrollback.append(block);
    scrollToEnd();
  };

  const layout = () => {
    const viewport = window.visualViewport;
    const viewportHeight = viewport?.height ?? window.innerHeight;
    const offsetTop = viewport?.offsetTop ?? 0;
    const wide = window.matchMedia("(min-width: 640px)").matches;
    const keyboardOpen = !wide && viewportHeight < window.innerHeight - 80;

    if (keyboardOpen) {
      const topInVisual = root.getBoundingClientRect().top - offsetTop;
      if (topInVisual > 8) window.scrollBy(0, topInVisual - 8);
    }

    const topInVisual = root.getBoundingClientRect().top - offsetTop;
    const footer = document.querySelector("footer");
    const main = root.closest("main");
    const padBottom = main ? Number.parseFloat(getComputedStyle(main).paddingBottom) || 0 : 0;
    const footerHeight = footer?.offsetHeight ?? 0;
    const reserve = keyboardOpen ? 8 : footerHeight + padBottom + 12;
    const available = viewportHeight - Math.max(topInVisual, 0) - reserve;
    const next = Math.max(keyboardOpen ? 168 : 260, Math.floor(available));
    root.style.height = `${next}px`;

    if (document.activeElement === input) input.scrollIntoView({ block: "nearest" });
  };

  let frame = 0;
  const scheduleLayout = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(layout);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const command = input.value;
    if (!command.trim()) return;

    const { cwd: nextCwd, result } = runCommand(command, cwd, payload.corpus, payload.messages, history);
    if (result.type === "clear") {
      scrollback.replaceChildren();
    } else if (result.type === "navigate") {
      appendBlock(command, result.lines, result.href);
      const href = result.href;
      window.setTimeout(() => {
        void navigate(href).catch(() => {
          window.location.assign(href);
        });
      }, 40);
    } else if (result.lines.length > 0 || command.trim().startsWith("cd")) {
      appendBlock(command, result.lines);
    }

    cwd = nextCwd;
    history.push(command);
    historyIndex = -1;
    draft = "";
    input.value = "";
    showHint([]);
    syncCursor();
    renderPrompt();
    scheduleLayout();
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const suggestion = suggestInput(input.value, cwd, payload.corpus);
      if (suggestion.value !== input.value) input.value = suggestion.value;
      showHint(suggestion.matches);
      syncCursor();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      if (historyIndex === -1) {
        draft = input.value;
        historyIndex = history.length - 1;
      } else if (historyIndex > 0) {
        historyIndex -= 1;
      }
      input.value = history[historyIndex] ?? "";
      showHint([]);
      syncCursor();
      return;
    }

    if (event.key === "ArrowDown") {
      if (historyIndex === -1) return;
      event.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex += 1;
        input.value = history[historyIndex] ?? "";
      } else {
        historyIndex = -1;
        input.value = draft;
      }
      showHint([]);
      syncCursor();
      return;
    }

    if (event.key === "c" && event.ctrlKey) {
      event.preventDefault();
      input.value = "";
      showHint([]);
      syncCursor();
      return;
    }

    if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      scrollback.replaceChildren();
      return;
    }

    if (event.key === "u" && event.ctrlKey) {
      event.preventDefault();
      input.value = "";
      showHint([]);
      syncCursor();
    }
  });

  input.addEventListener("input", () => {
    historyIndex = -1;
    const suggestion = suggestInput(input.value, cwd, payload.corpus);
    showHint(suggestion.matches);
    syncCursor();
  });

  root.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest("a, input, button")) return;
    input.focus();
  });

  input.addEventListener("focus", () => {
    scheduleLayout();
    window.setTimeout(scheduleLayout, 250);
    window.setTimeout(scheduleLayout, 700);
  });
  input.addEventListener("blur", scheduleLayout);

  window.visualViewport?.addEventListener("resize", scheduleLayout);
  window.visualViewport?.addEventListener("scroll", scheduleLayout);
  window.addEventListener("resize", scheduleLayout);

  renderPrompt();
  syncCursor();
  scheduleLayout();

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const wide = window.matchMedia("(min-width: 640px)").matches;
  if (wide && !coarse) input.focus();
}

function appendLinkified(parent: HTMLElement, text: string) {
  const pattern = /https?:\/\/[^\s<>)]+|mailto:[^\s<>)]+|\/(?:en\/)?projekty\/[a-z0-9-]+\/?/g;
  let last = 0;

  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    const raw = match[0] ?? "";
    if (!raw) continue;
    if (index > last) parent.append(text.slice(last, index));

    let url = raw;
    let trailing = "";
    while (/[.,;:]$/.test(url)) {
      trailing = url.slice(-1) + trailing;
      url = url.slice(0, -1);
    }

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.textContent = url;
    anchor.className = "break-all text-sky-300 underline decoration-sky-300/50 underline-offset-2";
    if (/^https?:|^mailto:/.test(url)) {
      anchor.target = "_blank";
      anchor.rel = "noreferrer noopener";
    }
    parent.append(anchor);
    if (trailing) parent.append(trailing);
    last = index + raw.length;
  }

  if (last < text.length) parent.append(text.slice(last));
}
