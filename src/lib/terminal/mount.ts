import { navigate } from "astro:transitions/client";

import { renderBlock, renderCompletions, renderNote } from "@/lib/terminal/dom";
import { promptFor, runCommand, suggestInput } from "@/lib/terminal/engine";
import { loadPayload } from "@/lib/terminal/payload-client";
import { routeForPath } from "@/lib/terminal/routes";
import {
  type Block,
  type Session,
  type SessionStore,
  clearBlocks,
  isPageBlock,
  loadSession,
  saveSession,
  withBlock,
  withHistory,
} from "@/lib/terminal/session";
import type { TerminalLang, TerminalPayload } from "@/lib/terminal/types";

function sessionStore(): SessionStore | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function whenIdle(callback: () => void) {
  // Safari has no requestIdleCallback.
  if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(callback);
  else window.setTimeout(callback, 200);
}

function safeDecode(path: string): string {
  try {
    return decodeURI(path);
  } catch {
    return path;
  }
}

export function mountShell(root: HTMLElement) {
  const scrollBody = root.querySelector<HTMLElement>("[data-scroll-body]");
  const restored = root.querySelector<HTMLElement>("[data-scrollback-restored]");
  const pageOutput = root.querySelector<HTMLElement>("[data-page-output]");
  const live = root.querySelector<HTMLElement>("[data-live]");
  const prompt = root.querySelector<HTMLElement>("[data-prompt]");
  const form = root.querySelector<HTMLFormElement>("[data-form]");
  const input = root.querySelector<HTMLInputElement>("[data-command]");
  const cursor = root.querySelector<HTMLElement>("[data-cursor]");
  const hint = root.querySelector<HTMLElement>("[data-hint]");
  if (!scrollBody || !restored || !pageOutput || !live || !prompt || !form || !input || !cursor || !hint) return;

  const lang: TerminalLang = document.documentElement.lang === "en" ? "en" : "pl";
  const loadError = root.dataset.loadError ?? "terminal: error";
  const store = sessionStore();
  const route = routeForPath(location.pathname);
  const controller = new AbortController();
  const { signal } = controller;

  let session: Session = loadSession(store, lang);
  let cwd = route?.cwd ?? "/";
  let payload: TerminalPayload | null = null;
  let queue: Promise<void> = Promise.resolve();
  let historyIndex = -1;
  let draft = "";

  const persist = (next: Session) => {
    session = next;
    saveSession(store, lang, session);
  };

  const warm = () =>
    loadPayload(lang)
      .then((loaded) => {
        payload = loaded;
        return loaded;
      })
      .catch(() => null);

  const renderPrompt = () => {
    prompt.textContent = promptFor(cwd);
  };

  const syncCursor = () => {
    const focused = document.activeElement === input;
    const empty = input.value.length === 0;
    cursor.classList.toggle("hidden", !(focused && empty));
    input.style.caretColor = focused && !empty ? "#6ee7b7" : "transparent";
  };

  const showHint = (matches: string[]) => {
    hint.textContent = matches.length < 2 ? "" : matches.slice(0, 12).join("   ");
    hint.classList.toggle("hidden", matches.length < 2);
  };

  const scrollToEnd = () => {
    scrollBody.scrollTop = scrollBody.scrollHeight;
  };

  const appendLive = (element: HTMLElement) => {
    live.append(element);
    scrollToEnd();
  };

  const clearScreen = () => {
    restored.replaceChildren();
    live.replaceChildren();
    pageOutput.dataset.cleared = "true";
    persist(clearBlocks(session));
  };

  async function execute(command: string) {
    let loaded = payload;
    if (!loaded) {
      const waiting = renderNote("…", "muted");
      appendLive(waiting);
      loaded = await warm();
      waiting.remove();
    }

    const from = cwd;
    if (!loaded) {
      const block: Block = { cwd: from, command, lines: [{ text: loadError, tone: "error" }] };
      appendLive(renderBlock(block));
      persist(withBlock(withHistory(session, command), block));
      return;
    }

    const { cwd: nextCwd, result } = runCommand(command, cwd, loaded.corpus, loaded.messages, session.history);
    cwd = nextCwd;
    persist(withHistory(session, command));

    if (result.type === "clear") {
      clearScreen();
    } else if (result.type === "navigate") {
      appendLive(renderBlock({ cwd: from, command, lines: result.lines }));
      const href = result.href;
      window.setTimeout(() => {
        void navigate(href).catch(() => {
          window.location.assign(href);
        });
      }, 40);
    } else if (result.lines.length > 0 || command.trim().startsWith("cd")) {
      const block: Block = { cwd: from, command, lines: result.lines };
      appendLive(renderBlock(block));
      persist(withBlock(session, block));
    }

    renderPrompt();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const command = input.value;
    if (!command.trim()) return;
    input.value = "";
    historyIndex = -1;
    draft = "";
    showHint([]);
    syncCursor();
    queue = queue.then(() => execute(command));
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Tab" && !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {
      event.preventDefault();
      if (!payload) {
        void warm();
        return;
      }
      const suggestion = suggestInput(input.value, cwd, payload.corpus);
      if (suggestion.matches.length > 1) appendLive(renderCompletions(suggestion.matches));
      if (suggestion.value !== input.value) input.value = suggestion.value;
      const end = input.value.length;
      input.setSelectionRange(end, end);
      showHint([]);
      syncCursor();
      input.focus();
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      input.blur();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const history = session.history;
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
      const history = session.history;
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

    if ((event.key === "c" || event.key === "u") && event.ctrlKey) {
      event.preventDefault();
      input.value = "";
      showHint([]);
      syncCursor();
      return;
    }

    if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      clearScreen();
    }
  });

  input.addEventListener("input", () => {
    historyIndex = -1;
    showHint(payload ? suggestInput(input.value, cwd, payload.corpus).matches : []);
    syncCursor();
  });

  form.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest("a, input, button")) return;
    input.focus();
  });

  input.addEventListener("focus", syncCursor);
  input.addEventListener("blur", syncCursor);

  // In terminal layout, typing anywhere on the page goes to the prompt.
  document.addEventListener(
    "keydown",
    (event) => {
      if (document.documentElement.dataset.layout !== "terminal") return;
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key.length !== 1 || event.key === " ") return;
      const active = document.activeElement;
      if (active && active !== document.body) return;
      input.focus();
    },
    { signal },
  );

  document.addEventListener("astro:before-swap", () => controller.abort(), { once: true, signal });

  root.querySelectorAll<HTMLElement>("[data-missing-path]").forEach((missing) => {
    missing.textContent = safeDecode(location.pathname);
  });

  // Arriving on this page: log it as a collapsed marker so the scrollback reads like a shell history.
  // It is rendered only on later pages, since this page's own output is already on screen (a reload
  // finds it as the last block and neither repeats nor renders it).
  const last = session.blocks[session.blocks.length - 1];
  const alreadyLogged = last !== undefined && isPageBlock(last) && last.href === location.pathname;
  const visible = alreadyLogged ? session.blocks.slice(0, -1) : session.blocks;
  for (const block of visible) restored.append(renderBlock(block));
  // Start at this page's output; the restored scrollback stays above it.
  if (visible.length > 0) scrollBody.scrollTop = pageOutput.offsetTop;

  const logArrival = () => {
    const previous = session.blocks[session.blocks.length - 1];
    const logged = previous !== undefined && isPageBlock(previous) && previous.href === location.pathname;
    if (route?.command && !logged) {
      persist(withBlock(session, { cwd: "/", command: route.command, href: location.pathname }));
    }
  };
  logArrival();

  // A back/forward-cache restore keeps this closure's session, which other pages may have changed since.
  window.addEventListener(
    "pageshow",
    (event) => {
      if (!event.persisted) return;
      session = loadSession(store, lang);
      logArrival();
    },
    { signal },
  );

  renderPrompt();
  syncCursor();
  whenIdle(() => void warm());

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const wide = window.matchMedia("(min-width: 640px)").matches;
  const home = route?.command === null;
  if (home && wide && !coarse && document.documentElement.dataset.layout === "terminal") input.focus();
}
