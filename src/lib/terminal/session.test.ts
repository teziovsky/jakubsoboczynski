import assert from "node:assert/strict";
import { test } from "node:test";

import {
  BLOCK_LIMIT,
  HISTORY_LIMIT,
  clearBlocks,
  emptySession,
  loadSession,
  parseSession,
  saveSession,
  withBlock,
  withHistory,
  type SessionStore,
} from "@/lib/terminal/session";

const output = { cwd: "/", command: "ls", lines: [{ text: "projects/", tone: "dir" as const }] };
const marker = { cwd: "/", command: "open uses", href: "/uses/" };

test("parseSession round-trips a valid record", () => {
  const session = withBlock(withBlock(withHistory(emptySession(), "ls"), output), marker);
  assert.deepEqual(parseSession(JSON.stringify(session)), session);
});

test("parseSession drops null, garbage, and other versions", () => {
  assert.deepEqual(parseSession(null), emptySession());
  assert.deepEqual(parseSession("{not json"), emptySession());
  assert.deepEqual(parseSession("[]"), emptySession());
  assert.deepEqual(parseSession(JSON.stringify({ v: 2, history: [], blocks: [] })), emptySession());
});

test("parseSession drops malformed blocks and off-site hrefs", () => {
  const raw = JSON.stringify({
    v: 1,
    history: ["ls", 42],
    blocks: [
      output,
      { cwd: "/", command: "x", lines: [{ text: "a", tone: "rainbow" }] },
      { cwd: "/", command: "open a", href: "//evil.example/" },
      { cwd: "/", command: "open b", href: "javascript:alert(1)" },
      { cwd: "/", command: "open c", href: "https://evil.example/" },
      marker,
    ],
  });
  assert.deepEqual(parseSession(raw), { v: 1, history: ["ls"], blocks: [output, marker] });
});

test("history and blocks are capped, oldest first out", () => {
  let session = emptySession();
  for (let index = 0; index < HISTORY_LIMIT + 5; index += 1) session = withHistory(session, `cmd ${index}`);
  for (let index = 0; index < BLOCK_LIMIT + 5; index += 1)
    session = withBlock(session, { ...output, command: `b ${index}` });
  assert.equal(session.history.length, HISTORY_LIMIT);
  assert.equal(session.history[0], "cmd 5");
  assert.equal(session.blocks.length, BLOCK_LIMIT);
  assert.equal(session.blocks[0]?.command, "b 5");
});

test("clearBlocks keeps history", () => {
  const session = clearBlocks(withBlock(withHistory(emptySession(), "ls"), output));
  assert.deepEqual(session, { v: 1, history: ["ls"], blocks: [] });
});

test("load and save use a per-language key", () => {
  const data = new Map<string, string>();
  const store: SessionStore = {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => void data.set(key, value),
  };
  const session = withHistory(emptySession(), "whoami");
  saveSession(store, "en", session);
  assert.ok(data.has("terminal-session:en"));
  assert.deepEqual(loadSession(store, "en"), session);
  assert.deepEqual(loadSession(store, "pl"), emptySession());
});

test("a throwing or missing store never throws", () => {
  const broken: SessionStore = {
    getItem: () => {
      throw new Error("SecurityError");
    },
    setItem: () => {
      throw new Error("QuotaExceededError");
    },
  };
  assert.deepEqual(loadSession(broken, "pl"), emptySession());
  assert.doesNotThrow(() => saveSession(broken, "pl", emptySession()));
  assert.deepEqual(loadSession(null, "pl"), emptySession());
  assert.doesNotThrow(() => saveSession(null, "pl", emptySession()));
});
