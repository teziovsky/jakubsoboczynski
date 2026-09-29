import type { TermLine, TermTone } from "@/lib/terminal/types";

export type OutputBlock = { cwd: string; command: string; lines: TermLine[] };
export type PageBlock = { cwd: string; command: string; href: string };
export type Block = OutputBlock | PageBlock;
export type Session = { v: 1; history: string[]; blocks: Block[] };
export type SessionStore = Pick<Storage, "getItem" | "setItem">;

export const HISTORY_LIMIT = 100;
export const BLOCK_LIMIT = 150;

const TONES: readonly TermTone[] = ["text", "error", "muted", "dir", "accent"];

export function emptySession(): Session {
  return { v: 1, history: [], blocks: [] };
}

export function isPageBlock(block: Block): block is PageBlock {
  return "href" in block;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isLine(value: unknown): value is TermLine {
  return isRecord(value) && typeof value.text === "string" && TONES.includes(value.tone as TermTone);
}

function isBlock(value: unknown): value is Block {
  if (!isRecord(value) || typeof value.cwd !== "string" || typeof value.command !== "string") return false;
  if (typeof value.href === "string") return value.href.startsWith("/") && !value.href.startsWith("//");
  return Array.isArray(value.lines) && value.lines.every(isLine);
}

export function parseSession(raw: string | null): Session {
  if (!raw) return emptySession();
  try {
    const value: unknown = JSON.parse(raw);
    if (!isRecord(value) || value.v !== 1 || !Array.isArray(value.history) || !Array.isArray(value.blocks)) {
      return emptySession();
    }
    return {
      v: 1,
      history: value.history.filter((entry): entry is string => typeof entry === "string").slice(-HISTORY_LIMIT),
      blocks: value.blocks.filter(isBlock).slice(-BLOCK_LIMIT),
    };
  } catch {
    return emptySession();
  }
}

export function withBlock(session: Session, block: Block): Session {
  return { ...session, blocks: [...session.blocks, block].slice(-BLOCK_LIMIT) };
}

export function withHistory(session: Session, command: string): Session {
  return { ...session, history: [...session.history, command].slice(-HISTORY_LIMIT) };
}

export function clearBlocks(session: Session): Session {
  return { ...session, blocks: [] };
}

function sessionKey(lang: string): string {
  return `terminal-session:${lang}`;
}

export function loadSession(store: SessionStore | null, lang: string): Session {
  try {
    return parseSession(store?.getItem(sessionKey(lang)) ?? null);
  } catch {
    return emptySession();
  }
}

export function saveSession(store: SessionStore | null, lang: string, session: Session): void {
  try {
    store?.setItem(sessionKey(lang), JSON.stringify(session));
  } catch {
    /* storage disabled or full: the shell keeps working without persistence */
  }
}
