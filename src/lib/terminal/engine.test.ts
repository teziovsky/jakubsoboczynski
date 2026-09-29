import assert from "node:assert/strict";
import { test } from "node:test";

import { buildCorpus } from "@/lib/terminal/corpus";
import { runCommand, suggestInput } from "@/lib/terminal/engine";
import type { CommandResult, TerminalLang, TerminalMessages } from "@/lib/terminal/types";

const overrides: Partial<TerminalMessages> = {
  commandNotFound: "bash: {command}: command not found",
  denied: "permission denied",
  openGoing: "opening",
  openNone: "no such project",
};

// Every other message returns its own key, which keeps assertions readable.
const messages = new Proxy(overrides, {
  get: (target, key) =>
    typeof key === "string" && key in target ? target[key as keyof TerminalMessages] : String(key),
}) as TerminalMessages;

function corpus(lang: TerminalLang = "pl") {
  const prefix = lang === "pl" ? "" : "/en";
  const project = (slug: string) => ({
    slug,
    title: slug,
    body: `${slug} is a project.`,
    technologies: [],
    githubUrl: null,
    demoUrl: "",
    sort: 1,
    href: `${prefix}/projekty/${slug}/`,
  });
  return buildCorpus({
    lang,
    labels: { technologies: "Tech", github: "GitHub", demo: "Demo", page: "Page", link: "Link" },
    about: { title: "O mnie", body: "Frontend developer." },
    uses: { title: "Uses", body: "## Editor\nCursor" },
    projects: [project("raycast-height"), project("uses")],
    socials: [],
  });
}

function run(line: string, lang: TerminalLang = "pl", cwd = "/"): CommandResult {
  return runCommand(line, cwd, corpus(lang), messages).result;
}

function hrefOf(result: CommandResult): string | null {
  return result.type === "navigate" ? result.href : null;
}

function firstText(result: CommandResult): string {
  return result.type === "output" ? (result.lines[0]?.text ?? "") : "";
}

test("open navigates to pages in the page language", () => {
  assert.equal(hrefOf(run("open about")), "/o-mnie/");
  assert.equal(hrefOf(run("open about", "en")), "/en/o-mnie/");
  assert.equal(hrefOf(run("open ~/projects")), "/projekty/");
  assert.equal(hrefOf(run("open projects/")), "/projekty/");
  assert.equal(hrefOf(run("open ~")), "/");
  assert.equal(hrefOf(run("open ~", "en")), "/en/");
});

test("open still navigates to projects", () => {
  assert.equal(hrefOf(run("open raycast-height")), "/projekty/raycast-height/");
  assert.equal(hrefOf(run("open raycast-height", "en")), "/en/projekty/raycast-height/");
});

test("a page alias beats a project with the same name, and the project stays reachable by path", () => {
  assert.equal(hrefOf(run("open uses")), "/uses/");
  assert.equal(hrefOf(run("open ~/projects/uses")), "/projekty/uses/");
});

test("open with an unknown target prints an error", () => {
  assert.equal(firstText(run("open nothing-here")), "no such project: nothing-here");
  assert.equal(firstText(run("open")), "usageOpen");
});

test("the navigate line names the target", () => {
  const result = run("open uses");
  assert.equal(result.type, "navigate");
  if (result.type === "navigate") assert.equal(result.lines[0]?.text, "opening /uses/");
});

test("unknown single tokens are bash errors and write commands are denied", () => {
  assert.equal(firstText(run("foobar")), "bash: foobar: command not found");
  assert.equal(firstText(run("rm -rf /")), "rm: permission denied");
  assert.equal(firstText(run("echo hi > x")), "echo: permission denied");
});

test("questions are answered from content, not treated as commands", () => {
  assert.doesNotMatch(firstText(run("jakie projekty?")), /^bash:/);
});

test("Tab after open completes page names too", () => {
  assert.equal(suggestInput("open ab", "/", corpus()).value, "open about ");
  assert.equal(suggestInput("open pro", "/", corpus()).value, "open projects ");
  const uses = suggestInput("open u", "/", corpus());
  assert.equal(uses.value, "open uses ");
  assert.deepEqual(uses.matches, ["uses"]);
  assert.equal(suggestInput("open ray", "/", corpus()).value, "open raycast-height ");
});
