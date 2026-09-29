import assert from "node:assert/strict";
import { test } from "node:test";

import { pageHref, routeForPath } from "@/lib/terminal/routes";

test("routeForPath maps each page to its open command and cwd", () => {
  assert.deepEqual(routeForPath("/"), { command: null, cwd: "/" });
  assert.deepEqual(routeForPath("/o-mnie/"), { command: "open about", cwd: "/about" });
  assert.deepEqual(routeForPath("/uses/"), { command: "open uses", cwd: "/uses" });
  assert.deepEqual(routeForPath("/projekty/"), { command: "open projects", cwd: "/projects" });
  assert.deepEqual(routeForPath("/projekty/raycast-height/"), { command: "open raycast-height", cwd: "/projects" });
});

test("routeForPath treats /en and slash-less paths like the canonical ones", () => {
  assert.deepEqual(routeForPath("/en"), { command: null, cwd: "/" });
  assert.deepEqual(routeForPath("/en/"), { command: null, cwd: "/" });
  assert.deepEqual(routeForPath("/index.html"), { command: null, cwd: "/" });
  assert.deepEqual(routeForPath("/uses"), { command: "open uses", cwd: "/uses" });
  assert.deepEqual(routeForPath("/en/o-mnie"), { command: "open about", cwd: "/about" });
  assert.deepEqual(routeForPath("/en/projekty/x"), { command: "open x", cwd: "/projects" });
});

test("routeForPath returns null for unknown paths", () => {
  assert.equal(routeForPath("/nope/"), null);
  assert.equal(routeForPath("/projekty/a/b/"), null);
});

test("pageHref resolves page aliases in both locales", () => {
  assert.equal(pageHref("about", "pl"), "/o-mnie/");
  assert.equal(pageHref("about", "en"), "/en/o-mnie/");
  assert.equal(pageHref("~/about/", "pl"), "/o-mnie/");
  assert.equal(pageHref("o-mnie", "pl"), "/o-mnie/");
  assert.equal(pageHref("uses", "en"), "/en/uses/");
  assert.equal(pageHref("/uses/uses-tech", "pl"), "/uses/");
  assert.equal(pageHref("projects", "pl"), "/projekty/");
  assert.equal(pageHref("~/projects/", "en"), "/en/projekty/");
  assert.equal(pageHref("Projekty", "pl"), "/projekty/");
  assert.equal(pageHref("~", "pl"), "/");
  assert.equal(pageHref("home", "en"), "/en/");
});

test("pageHref returns null for anything that is not a page", () => {
  assert.equal(pageHref("raycast-height", "pl"), null);
  assert.equal(pageHref("projects/raycast-height", "pl"), null);
  assert.equal(pageHref("social", "pl"), null);
});
