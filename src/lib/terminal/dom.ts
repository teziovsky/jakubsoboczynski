import { promptFor } from "@/lib/terminal/engine";
import { type Block, isPageBlock } from "@/lib/terminal/session";
import type { TermLine, TermTone } from "@/lib/terminal/types";

const TONE_CLASS: Record<TermTone, string> = {
  text: "text-emerald-100",
  error: "text-rose-300",
  muted: "text-slate-500",
  dir: "text-sky-300",
  accent: "text-amber-200",
};

const LINK_CLASS = "break-all text-sky-300 underline decoration-sky-300/50 underline-offset-2";

function promptRow(cwd: string, command: string): HTMLElement {
  const row = document.createElement("div");
  row.className = "flex flex-wrap gap-x-2";
  const promptEl = document.createElement("span");
  promptEl.className = "shrink-0 text-emerald-300";
  promptEl.textContent = promptFor(cwd);
  const commandEl = document.createElement("span");
  commandEl.className = "min-w-0 break-all text-emerald-50";
  commandEl.textContent = command;
  row.append(promptEl, commandEl);
  return row;
}

function outputRow(entry: TermLine): HTMLElement {
  const row = document.createElement("div");
  row.className = `whitespace-pre-wrap break-words ${TONE_CLASS[entry.tone]}`;
  appendLinkified(row, entry.text);
  return row;
}

export function renderBlock(block: Block): HTMLElement {
  const element = document.createElement("div");
  element.className = "mt-3";
  element.append(promptRow(block.cwd, block.command));
  if (isPageBlock(block)) {
    const row = document.createElement("div");
    row.className = TONE_CLASS.muted;
    row.append("→ ");
    const anchor = document.createElement("a");
    anchor.href = block.href;
    anchor.textContent = block.href;
    anchor.className = LINK_CLASS;
    row.append(anchor);
    element.append(row);
  } else {
    for (const entry of block.lines) element.append(outputRow(entry));
  }
  return element;
}

export function renderCompletions(matches: string[]): HTMLElement {
  const element = document.createElement("div");
  element.className = "mt-2 break-words whitespace-pre-wrap text-emerald-100";
  element.textContent = matches.join("  ");
  return element;
}

export function renderNote(text: string, tone: TermTone): HTMLElement {
  return outputRow({ text, tone });
}

// Absolute site paths are linkified only when they stand alone, so "~/uses/uses-tech" stays plain text.
const LINK_PATTERN =
  /https?:\/\/[^\s<>)]+|mailto:[^\s<>)]+|(?<![\w~.-])\/(?:en\/)?(?:projekty\/(?:[a-z0-9-]+\/?)?|o-mnie\/|uses\/)/g;

function appendLinkified(parent: HTMLElement, text: string) {
  let last = 0;

  for (const match of text.matchAll(LINK_PATTERN)) {
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
    anchor.className = LINK_CLASS;
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
