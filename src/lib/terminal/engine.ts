import { pageHref } from "@/lib/terminal/routes";
import { excerpt, firstSentence, fold, queryTokens, searchForms, tokenizeCommand } from "@/lib/terminal/text";
import type {
  CommandResult,
  FsDir,
  FsFile,
  FsNode,
  TermLine,
  TerminalCorpus,
  TerminalMessages,
} from "@/lib/terminal/types";

const COMMANDS = [
  "cat",
  "cd",
  "clear",
  "date",
  "echo",
  "file",
  "find",
  "grep",
  "head",
  "help",
  "history",
  "ls",
  "man",
  "open",
  "pwd",
  "tail",
  "tree",
  "uname",
  "wc",
  "whoami",
] as const;

const WRITE_COMMANDS = new Set([
  "chmod",
  "chown",
  "cp",
  "dd",
  "install",
  "ln",
  "mkdir",
  "mv",
  "rm",
  "rmdir",
  "tee",
  "touch",
  "truncate",
  "unlink",
]);

const PATH_COMMANDS = new Set(["cat", "cd", "file", "find", "head", "ls", "tail", "tree", "wc"]);

function isCommand(value: string): value is (typeof COMMANDS)[number] {
  return (COMMANDS as readonly string[]).includes(value);
}

const QUESTION_WORDS = new Set([
  "about",
  "am",
  "are",
  "can",
  "co",
  "could",
  "czy",
  "czym",
  "describe",
  "did",
  "dlaczego",
  "do",
  "does",
  "gdzie",
  "how",
  "is",
  "jak",
  "jaka",
  "jakie",
  "jaki",
  "jest",
  "jestem",
  "jestes",
  "kiedy",
  "kim",
  "kto",
  "lubie",
  "lubisz",
  "mam",
  "masz",
  "me",
  "moj",
  "moje",
  "my",
  "nie",
  "opisz",
  "opowiedz",
  "please",
  "pokaz",
  "powiedz",
  "prosze",
  "robi",
  "robisz",
  "sa",
  "sie",
  "sobie",
  "tell",
  "the",
  "tobie",
  "twoj",
  "twoje",
  "what",
  "when",
  "where",
  "which",
  "who",
  "why",
  "your",
]);

function isShellInvocation(raw: string, tokens: string[]): boolean {
  const command = tokens[0];
  if (!command || tokens.length === 1) return true;
  if (/[?¿!]/.test(raw)) return false;
  if (!/^[A-Za-z][A-Za-z0-9_+.-]*$/.test(command)) return false;
  if (tokens.some((token) => QUESTION_WORDS.has(fold(token)))) return false;
  const args = tokens.slice(1);
  const hasShellArg = args.some((token) => token.startsWith("-") || /[~/]/.test(token) || token.includes("."));
  if (!hasShellArg && tokens.length >= 4) return false;
  return true;
}

function hasRedirection(raw: string): boolean {
  let quote: '"' | "'" | null = null;
  for (const char of raw) {
    if (quote) {
      if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }
    if (char === ">" || char === "<") return true;
  }
  return false;
}

type Intent = "about" | "projects" | "uses" | "social";

const PHRASES: readonly { intent: Intent; pattern: RegExp }[] = [
  {
    intent: "about",
    pattern:
      /\b(who are you|who is jakub|about you|about yourself|tell me about yourself|kim jestes|o sobie|o tobie|opowiedz o sobie|czym sie zajmujesz)\b/,
  },
  {
    intent: "projects",
    pattern: /\b(projects?|projekt\w*|portfolio|what have you built|jakie projekty|twoje projekty|twoich projektow)\b/,
  },
  {
    intent: "uses",
    pattern: /\b(what do you use|your setup|uses|sprzet\w*|hardware|narzedzi\w*|what tools|jakiego sprzetu)\b/,
  },
  {
    intent: "social",
    pattern: /\b(contact|kontakt\w*|social links?|e-?mail|jak sie skontaktowac|how to reach|how can i reach)\b/,
  },
];

export function promptFor(cwd: string): string {
  return `jakub@portfolio:${cwd === "/" ? "~" : `~${cwd}`}$`;
}

export function normalizePath(cwd: string, input: string): string {
  let raw = input.trim();
  if (raw === "" || raw === "~") return "/";
  if (raw.startsWith("~/")) raw = raw.slice(1);

  const stack = raw.startsWith("/") ? [] : cwd.split("/").filter(Boolean);
  for (const part of raw.split("/")) {
    if (part === "" || part === ".") continue;
    if (part === "..") stack.pop();
    else stack.push(part);
  }

  return `/${stack.join("/")}`;
}

export function nodeAt(root: FsDir, path: string): FsNode | null {
  if (path === "/") return root;
  let current: FsNode = root;
  for (const part of path.split("/").filter(Boolean)) {
    if (current.type !== "dir") return null;
    const next: FsNode | undefined = current.children.find((child) => child.name === part);
    if (!next) return null;
    current = next;
  }
  return current;
}

function line(text: string, tone: TermLine["tone"]): TermLine {
  return { text, tone };
}

function helpLines(messages: TerminalMessages): TermLine[] {
  return [
    line(messages.helpHeader, "accent"),
    line(messages.helpHelp, "text"),
    line(messages.helpMan, "text"),
    line(messages.helpLs, "text"),
    line(messages.helpCd, "text"),
    line(messages.helpPwd, "text"),
    line(messages.helpCat, "text"),
    line(messages.helpHead, "text"),
    line(messages.helpTail, "text"),
    line(messages.helpWc, "text"),
    line(messages.helpGrep, "text"),
    line(messages.helpFind, "text"),
    line(messages.helpTree, "text"),
    line(messages.helpFile, "text"),
    line(messages.helpEcho, "text"),
    line(messages.helpHistory, "text"),
    line(messages.helpDate, "text"),
    line(messages.helpUname, "text"),
    line(messages.helpOpen, "text"),
    line(messages.helpWhoami, "text"),
    line(messages.helpClear, "text"),
    line(messages.helpAsk, "muted"),
    line(messages.helpTab, "muted"),
  ];
}

function helpFor(topic: string | undefined, messages: TerminalMessages): TermLine[] {
  const lines = helpLines(messages);
  if (!topic || topic === "help" || topic === "man") return lines;
  const matched = lines.filter((entry) => entry.text.startsWith(`${topic} `));
  if (matched.length === 0) return [line(`${topic}: ${messages.noSuch}`, "error"), ...lines];
  return [line(messages.helpHeader, "accent"), ...matched];
}

function listDir(dir: FsDir): TermLine[] {
  return dir.children.map((child) =>
    line(child.type === "dir" ? `${child.name}/` : child.name, child.type === "dir" ? "dir" : "text"),
  );
}

function projectsIn(root: FsDir): FsFile[] {
  const dir = nodeAt(root, "/projects");
  if (!dir || dir.type !== "dir") return [];
  return dir.children.filter((child): child is FsFile => child.type === "file");
}

function socialsIn(root: FsDir): FsFile[] {
  const dir = nodeAt(root, "/social");
  if (!dir || dir.type !== "dir") return [];
  return dir.children.filter((child): child is FsFile => child.type === "file");
}

function filesIn(root: FsDir): { path: string; file: FsFile }[] {
  const found: { path: string; file: FsFile }[] = [];

  function walk(node: FsNode, path: string) {
    if (node.type === "file") {
      found.push({ path, file: node });
      return;
    }
    for (const child of node.children) {
      walk(child, `${path === "/" ? "" : path}/${child.name}`);
    }
  }

  walk(root, "/");
  return found;
}

function cleanOpenQuery(query: string): string {
  return query
    .trim()
    .replace(/^~\//, "")
    .replace(/^~/, "")
    .replace(/^\.\/+/, "")
    .replace(/^\/+/, "")
    .replace(/^projects\//, "")
    .replace(/\/$/, "");
}

function matchProjects(query: string, files: FsFile[]): FsFile[] {
  const q = fold(cleanOpenQuery(query));
  if (!q) return [];

  const exactSlug = files.filter((file) => fold(file.name) === q);
  if (exactSlug.length > 0) return exactSlug;

  const exactTitle = files.filter((file) => fold(file.title) === q);
  if (exactTitle.length > 0) return exactTitle;

  const starts = files.filter((file) => fold(file.name).startsWith(q) || fold(file.title).startsWith(q));
  if (starts.length > 0) return starts;

  if (q.length < 3) return [];
  return files.filter((file) => fold(file.name).includes(q) || fold(file.title).includes(q));
}

function displayPath(path: string): string {
  return path === "/" ? "~" : `~${path}`;
}

function countOf(haystack: string, needle: string): number {
  if (!needle) return 0;
  let count = 0;
  let from = 0;
  while (from < haystack.length) {
    const found = haystack.indexOf(needle, from);
    if (found === -1) break;
    count += 1;
    from = found + needle.length;
  }
  return count;
}

function scoreBlob(blob: string, tokens: string[]): number {
  const folded = fold(blob);
  let score = 0;
  let matched = 0;

  for (const token of tokens) {
    let best = 0;
    for (const form of searchForms(token)) {
      if (form.length < 3) continue;
      const count = countOf(folded, form);
      if (count > 0) best = Math.max(best, Math.min(count, 4));
    }
    if (best > 0) {
      matched += 1;
      score += best;
    }
  }

  if (tokens.length > 1 && matched === tokens.length) score += tokens.length * 2;
  return score;
}

function broadIntent(query: string): Intent | null {
  const folded = fold(query);
  for (const phrase of PHRASES) {
    if (phrase.pattern.test(folded)) return phrase.intent;
  }
  return null;
}

function projectLines(file: FsFile, messages: TerminalMessages): TermLine[] {
  const summary = firstSentence(file.sections[0]?.text ?? file.content);
  const lines = [
    line(`• ${file.title}${summary ? ` — ${summary}` : ""}`, "text"),
    line(`  ~/projects/${file.name}`, "muted"),
  ];
  if (file.technologies && file.technologies.length > 0) {
    lines.push(line(`  ${messages.labelTechnologies}: ${file.technologies.join(", ")}`, "muted"));
  }
  return lines;
}

function answerBroad(intent: Intent, corpus: TerminalCorpus, messages: TerminalMessages): TermLine[] {
  if (intent === "projects") {
    const projects = [...projectsIn(corpus.root)].sort((a, b) => (b.sort ?? 0) - (a.sort ?? 0));
    return [line(messages.askProjects, "accent"), ...projects.flatMap((project) => projectLines(project, messages))];
  }

  if (intent === "social") {
    const socials = [...socialsIn(corpus.root)].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
    return [
      line(messages.askSocial, "accent"),
      ...socials.flatMap((social) => [
        line(`${social.title}`, "text"),
        line(`  ${social.sections[0]?.text ?? social.content}`, "muted"),
      ]),
    ];
  }

  if (intent === "about") {
    const about = filesIn(corpus.root).find((entry) => entry.file.kind === "about");
    if (!about) return [line(messages.askNone, "muted")];
    return [
      line(displayPath(about.path), "muted"),
      line(excerpt(about.file.content.replace(/^# .+\n+/, ""), 1600), "text"),
    ];
  }

  const uses = filesIn(corpus.root).find((entry) => entry.file.kind === "uses");
  if (!uses) return [line(messages.askNone, "muted")];
  const intro = uses.file.sections.find((section) => section.heading === "")?.text ?? "";
  const headings = uses.file.sections.filter((section) => section.heading).map((section) => section.heading);
  return [
    line(displayPath(uses.path), "muted"),
    ...(intro ? [line(excerpt(intro, 500), "text")] : []),
    line(messages.askUses, "accent"),
    ...headings.map((heading) => line(`• ${heading}`, "dir")),
  ];
}

function answerSpecific(tokens: string[], corpus: TerminalCorpus): TermLine[] | null {
  const hits: { path: string; heading: string; text: string; score: number }[] = [];

  for (const entry of filesIn(corpus.root)) {
    const titleScore = scoreBlob(entry.file.title, tokens) * 3;
    for (const section of entry.file.sections) {
      const score = scoreBlob(`${section.heading}\n${section.text}`, tokens) + titleScore;
      if (score <= 0) continue;
      hits.push({ path: entry.path, heading: section.heading, text: section.text, score });
    }
  }

  hits.sort((a, b) => b.score - a.score);
  const chosen: typeof hits = [];
  const seen = new Set<string>();
  for (const hit of hits) {
    const key = `${hit.path}:${hit.heading}`;
    if (seen.has(key)) continue;
    seen.add(key);
    chosen.push(hit);
    if (chosen.length === 3) break;
  }

  if (chosen.length === 0 || (chosen[0]?.score ?? 0) < 1) return null;

  return chosen.flatMap((hit) => [
    line(displayPath(hit.path), "muted"),
    ...(hit.heading ? [line(hit.heading, "accent")] : []),
    line(excerptMatching(hit.text, tokens), "text"),
  ]);
}

const INTENT_WORDS: Record<Intent, readonly string[]> = {
  projects: ["project", "projects", "projekt", "projekty", "projektow", "portfolio"],
  about: ["who", "kim", "about", "bio", "sobie", "tobie"],
  uses: ["uses", "use", "sprzet", "sprzetu", "hardware", "narzedzia", "narzedzi", "setup", "tools", "tool"],
  social: ["contact", "kontakt", "email", "mail", "social"],
};

function isIntentWord(token: string, intent: Intent): boolean {
  return INTENT_WORDS[intent].some((word) => token === word || token.startsWith(word));
}

function excerptMatching(text: string, tokens: string[]): string {
  const paragraphs = text
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const matching = paragraphs.filter((paragraph) => scoreBlob(paragraph, tokens) > 0);
  return excerpt(matching.length > 0 ? matching.slice(0, 5).join("\n") : text, 700);
}

export function answerQuestion(query: string, corpus: TerminalCorpus, messages: TerminalMessages): TermLine[] {
  const tokens = queryTokens(query);
  const intent = broadIntent(query);
  const focused = intent ? tokens.filter((token) => !isIntentWord(token, intent)) : tokens;
  const specific = focused.length > 0 ? answerSpecific(focused, corpus) : null;
  if (specific) return specific;
  if (intent) return answerBroad(intent, corpus, messages);

  return [line(messages.askNone, "muted")];
}

function runOpen(query: string, corpus: TerminalCorpus, messages: TerminalMessages): CommandResult {
  if (!query.trim()) return { type: "output", lines: [line(messages.usageOpen, "error")] };

  const page = pageHref(query, corpus.lang);
  if (page) {
    return { type: "navigate", href: page, lines: [line(`${messages.openGoing} ${page}`, "accent")] };
  }

  const matches = matchProjects(query, projectsIn(corpus.root));
  const first = matches[0];
  if (matches.length === 1 && first?.href && first.kind === "project") {
    return {
      type: "navigate",
      href: first.href,
      lines: [line(`${messages.openGoing} ${first.href}`, "accent"), line(first.title, "text")],
    };
  }

  if (matches.length > 1) {
    return {
      type: "output",
      lines: [
        line(messages.openMany, "error"),
        ...matches.map((match) => line(`${match.name}  ${match.title}`, "text")),
      ],
    };
  }

  const cleaned = cleanOpenQuery(query);
  const asPath = nodeAt(
    corpus.root,
    normalizePath("/", cleaned.startsWith("projects/") ? `/${cleaned}` : `/projects/${cleaned}`),
  );
  const anywhere = nodeAt(corpus.root, normalizePath("/", cleaned));
  if (asPath || anywhere) return { type: "output", lines: [line(messages.openOnly, "error")] };

  return { type: "output", lines: [line(`${messages.openNone}: ${query}`, "error")] };
}

function readFile(target: string, cwd: string, root: FsDir, messages: TerminalMessages, command: string) {
  const path = normalizePath(cwd, target);
  const node = nodeAt(root, path);
  if (!node) return { error: line(`${command}: ${target}: ${messages.noSuch}`, "error") };
  if (node.type === "dir") return { error: line(`${command}: ${target}: ${messages.isDir}`, "error") };
  return { path, file: node };
}

function parseLineCount(args: string[], usage: string): { count: number; paths: string[]; error: TermLine | null } {
  const paths: string[] = [];
  let count = 10;

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index] ?? "";
    if (arg === "-n") {
      const value = Number(args[index + 1]);
      if (!Number.isInteger(value) || value < 0) return { count, paths, error: line(usage, "error") };
      count = value;
      index += 1;
      continue;
    }
    if (/^-\d+$/.test(arg)) {
      count = Number(arg.slice(1));
      continue;
    }
    if (arg.startsWith("-")) return { count, paths, error: line(usage, "error") };
    paths.push(arg);
  }

  return { count, paths, error: null };
}

function sliceFile(content: string, count: number, fromEnd: boolean): string[] {
  const rows = content.split("\n");
  if (count === 0) return [];
  return fromEnd ? rows.slice(-count) : rows.slice(0, count);
}

function showHeadTail(
  args: string[],
  fromEnd: boolean,
  cwd: string,
  root: FsDir,
  messages: TerminalMessages,
  command: "head" | "tail",
): TermLine[] {
  const usage = command === "head" ? messages.usageHead : messages.usageTail;
  const parsed = parseLineCount(args, usage);
  if (parsed.error) return [parsed.error];
  if (parsed.paths.length === 0) return [line(usage, "error")];

  const lines: TermLine[] = [];
  for (const target of parsed.paths) {
    const file = readFile(target, cwd, root, messages, command);
    if (file.error || !file.file) {
      if (file.error) lines.push(file.error);
      continue;
    }
    if (parsed.paths.length > 1) lines.push(line(`==> ${displayPath(file.path ?? target)} <==`, "muted"));
    for (const row of sliceFile(file.file.content, parsed.count, fromEnd)) lines.push(line(row, "text"));
  }
  return lines;
}

function walk(node: FsNode, path: string, found: { path: string; node: FsNode }[]) {
  found.push({ path, node });
  if (node.type !== "dir") return;
  for (const child of node.children) {
    walk(child, `${path === "/" ? "" : path}/${child.name}`, found);
  }
}

function nameMatches(name: string, pattern: string): boolean {
  const source = pattern
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replaceAll("*", ".*")
    .replaceAll("?", ".");
  return new RegExp(`^${source}$`, "i").test(name);
}

function treeLines(dir: FsDir, prefix = ""): TermLine[] {
  const lines: TermLine[] = [];
  dir.children.forEach((child, index) => {
    const last = index === dir.children.length - 1;
    const branch = last ? "└── " : "├── ";
    const next = last ? "    " : "│   ";
    const name = child.type === "dir" ? `${child.name}/` : child.name;
    lines.push(line(`${prefix}${branch}${name}`, child.type === "dir" ? "dir" : "text"));
    if (child.type === "dir") lines.push(...treeLines(child, `${prefix}${next}`));
  });
  return lines;
}

export function runCommand(
  raw: string,
  cwd: string,
  corpus: TerminalCorpus,
  messages: TerminalMessages,
  history: readonly string[] = [],
): {
  cwd: string;
  result: CommandResult;
} {
  const tokens = tokenizeCommand(raw);
  const command = tokens[0];
  if (!command) return { cwd, result: { type: "output", lines: [] } };

  if (hasRedirection(raw) || WRITE_COMMANDS.has(command)) {
    return { cwd, result: { type: "output", lines: [line(`${command}: ${messages.denied}`, "error")] } };
  }

  const args = tokens.slice(1);
  if (!isCommand(command)) {
    if (isShellInvocation(raw, tokens)) {
      return {
        cwd,
        result: {
          type: "output",
          lines: [line(messages.commandNotFound.replaceAll("{command}", command), "error")],
        },
      };
    }
    return { cwd, result: { type: "output", lines: answerQuestion(raw, corpus, messages) } };
  }

  switch (command) {
    case "help":
    case "man":
      return { cwd, result: { type: "output", lines: helpFor(command === "man" ? args[0] : undefined, messages) } };
    case "pwd":
      return { cwd, result: { type: "output", lines: [line(displayPath(cwd), "text")] } };
    case "echo":
      return { cwd, result: { type: "output", lines: [line(args.join(" "), "text")] } };
    case "history":
      return {
        cwd,
        result: {
          type: "output",
          lines: [...history, raw.trim()].map((entry, index) =>
            line(`${String(index + 1).padStart(4, " ")}  ${entry}`, "text"),
          ),
        },
      };
    case "date":
      return {
        cwd,
        result: {
          type: "output",
          lines: [
            line(
              new Intl.DateTimeFormat(corpus.lang === "pl" ? "pl-PL" : "en-GB", {
                dateStyle: "full",
                timeStyle: "short",
              }).format(new Date()),
              "text",
            ),
          ],
        },
      };
    case "uname":
      return { cwd, result: { type: "output", lines: [line(messages.unameValue, "text")] } };
    case "head":
      return { cwd, result: { type: "output", lines: showHeadTail(args, false, cwd, corpus.root, messages, "head") } };
    case "tail":
      return { cwd, result: { type: "output", lines: showHeadTail(args, true, cwd, corpus.root, messages, "tail") } };
    case "wc": {
      const paths = args.filter((arg) => !arg.startsWith("-"));
      if (paths.length === 0) return { cwd, result: { type: "output", lines: [line(messages.usageWc, "error")] } };
      const lines: TermLine[] = [];
      for (const target of paths) {
        const file = readFile(target, cwd, corpus.root, messages, "wc");
        if (file.error || !file.file || !file.path) {
          if (file.error) lines.push(file.error);
          continue;
        }
        const content = file.file.content;
        const lineCount = content.length === 0 ? 0 : content.split("\n").length;
        const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
        lines.push(
          line(
            `${messages.wcLines}: ${lineCount}  ${messages.wcWords}: ${wordCount}  ${messages.wcChars}: ${content.length}  ${displayPath(file.path)}`,
            "text",
          ),
        );
      }
      return { cwd, result: { type: "output", lines } };
    }
    case "file": {
      if (args.length === 0) return { cwd, result: { type: "output", lines: [line(messages.usageFile, "error")] } };
      const lines: TermLine[] = [];
      for (const target of args) {
        const path = normalizePath(cwd, target);
        const node = nodeAt(corpus.root, path);
        if (!node) {
          lines.push(line(`file: ${target}: ${messages.noSuch}`, "error"));
          continue;
        }
        lines.push(line(`${displayPath(path)}: ${node.type === "dir" ? messages.fileDir : messages.fileText}`, "text"));
      }
      return { cwd, result: { type: "output", lines } };
    }
    case "tree": {
      const target = args.filter((arg) => !arg.startsWith("-"))[0] ?? ".";
      const path = normalizePath(cwd, target);
      const node = nodeAt(corpus.root, path);
      if (!node)
        return { cwd, result: { type: "output", lines: [line(`tree: ${target}: ${messages.noSuch}`, "error")] } };
      if (node.type !== "dir") {
        return { cwd, result: { type: "output", lines: [line(displayPath(path), "text")] } };
      }
      return {
        cwd,
        result: { type: "output", lines: [line(displayPath(path), "dir"), ...treeLines(node)] },
      };
    }
    case "find": {
      let start = ".";
      let pattern = "";
      for (let index = 0; index < args.length; index += 1) {
        const arg = args[index] ?? "";
        if (arg === "-name") {
          pattern = args[index + 1] ?? "";
          if (!pattern) return { cwd, result: { type: "output", lines: [line(messages.usageFind, "error")] } };
          index += 1;
          continue;
        }
        if (arg.startsWith("-")) return { cwd, result: { type: "output", lines: [line(messages.usageFind, "error")] } };
        start = arg;
      }
      const path = normalizePath(cwd, start);
      const node = nodeAt(corpus.root, path);
      if (!node)
        return { cwd, result: { type: "output", lines: [line(`find: ${start}: ${messages.noSuch}`, "error")] } };
      const found: { path: string; node: FsNode }[] = [];
      walk(node, path, found);
      const matches = found.filter((entry) => !pattern || nameMatches(entry.node.name, pattern));
      if (matches.length === 0) return { cwd, result: { type: "output", lines: [line(messages.findNone, "muted")] } };
      return {
        cwd,
        result: {
          type: "output",
          lines: matches.map((entry) => line(displayPath(entry.path), entry.node.type === "dir" ? "dir" : "text")),
        },
      };
    }
    case "grep": {
      const paths: string[] = [];
      let pattern = "";
      for (const arg of args) {
        if (arg.startsWith("-")) continue;
        if (!pattern) pattern = arg;
        else paths.push(arg);
      }
      if (!pattern) return { cwd, result: { type: "output", lines: [line(messages.usageGrep, "error")] } };
      const starts = paths.length > 0 ? paths : ["."];
      const files: { path: string; file: FsFile }[] = [];
      const lines: TermLine[] = [];
      for (const target of starts) {
        const path = normalizePath(cwd, target);
        const node = nodeAt(corpus.root, path);
        if (!node) {
          lines.push(line(`grep: ${target}: ${messages.noSuch}`, "error"));
          continue;
        }
        const found: { path: string; node: FsNode }[] = [];
        walk(node, path, found);
        for (const entry of found) {
          if (entry.node.type === "file") files.push({ path: entry.path, file: entry.node });
        }
      }
      const needle = pattern.toLowerCase();
      for (const entry of files) {
        entry.file.content.split("\n").forEach((row, index) => {
          if (row.toLowerCase().includes(needle)) {
            lines.push(line(`${displayPath(entry.path)}:${index + 1}: ${row}`, "text"));
          }
        });
      }
      const visible = lines.slice(0, 40);
      if (visible.length === 0) return { cwd, result: { type: "output", lines: [line(messages.grepNone, "muted")] } };
      if (lines.length > visible.length) visible.push(line(messages.grepMore, "muted"));
      return { cwd, result: { type: "output", lines: visible } };
    }
    case "whoami": {
      const about = filesIn(corpus.root).find((entry) => entry.file.kind === "about");
      const bio = about ? firstSentence(about.file.sections[0]?.text ?? "", 500) : "";
      return {
        cwd,
        result: {
          type: "output",
          lines: [
            line("jakub", "accent"),
            ...(about ? [line(displayPath(about.path), "muted")] : []),
            ...(bio ? [line(bio, "text")] : []),
          ],
        },
      };
    }
    case "clear":
      return { cwd, result: { type: "clear" } };
    case "cd": {
      if (args.length > 1) return { cwd, result: { type: "output", lines: [line(messages.usageCd, "error")] } };
      const target = normalizePath(cwd, args[0] ?? "");
      const node = nodeAt(corpus.root, target);
      if (!node)
        return {
          cwd,
          result: { type: "output", lines: [line(`cd: ${args[0] ?? target}: ${messages.noSuch}`, "error")] },
        };
      if (node.type !== "dir") {
        return {
          cwd,
          result: { type: "output", lines: [line(`cd: ${args[0] ?? target}: ${messages.notDir}`, "error")] },
        };
      }
      return { cwd: target, result: { type: "output", lines: [] } };
    }
    case "ls": {
      const targets = args.filter((arg) => !arg.startsWith("-"));
      const listed = targets.length > 0 ? targets : ["."];
      const lines: TermLine[] = [];
      for (const target of listed) {
        const path = normalizePath(cwd, target);
        const node = nodeAt(corpus.root, path);
        if (!node) {
          lines.push(line(`ls: ${target}: ${messages.noSuch}`, "error"));
          continue;
        }
        if (listed.length > 1) lines.push(line(`${target}:`, "muted"));
        if (node.type === "dir") lines.push(...listDir(node));
        else lines.push(line(node.name, "text"));
      }
      return { cwd, result: { type: "output", lines } };
    }
    case "cat": {
      if (args.length === 0) return { cwd, result: { type: "output", lines: [line(messages.usageCat, "error")] } };
      const lines: TermLine[] = [];
      for (const target of args) {
        const path = normalizePath(cwd, target);
        const node = nodeAt(corpus.root, path);
        if (!node) {
          lines.push(line(`cat: ${target}: ${messages.noSuch}`, "error"));
          continue;
        }
        if (node.type === "dir") {
          lines.push(line(`cat: ${target}: ${messages.isDir}`, "error"));
          continue;
        }
        for (const text of node.content.split("\n")) lines.push(line(text, "text"));
      }
      return { cwd, result: { type: "output", lines } };
    }
    case "open":
      return { cwd, result: runOpen(args.join(" "), corpus, messages) };
  }
}

function commonPrefix(values: readonly string[]): string {
  const first = values[0];
  if (!first) return "";
  let prefix = first;
  for (const value of values.slice(1)) {
    while (!value.startsWith(prefix)) prefix = prefix.slice(0, -1);
  }
  return prefix;
}

function completePath(partial: string, cwd: string, root: FsDir): string[] {
  const slash = partial.lastIndexOf("/");
  const dirPart = slash >= 0 ? partial.slice(0, slash + 1) : "";
  const namePart = slash >= 0 ? partial.slice(slash + 1) : partial;
  const base = dirPart === "" ? cwd : normalizePath(cwd, dirPart);
  const node = nodeAt(root, base);
  if (!node || node.type !== "dir") return [];

  return node.children
    .filter((child) => child.name.startsWith(namePart))
    .map((child) => `${dirPart}${child.name}${child.type === "dir" ? "/" : ""}`);
}

const OPEN_PAGES = ["about", "projects", "uses"] as const;

function completeOpen(partial: string, projects: FsFile[]): string[] {
  const quoted = partial.startsWith('"') || partial.startsWith("'");
  const bare = partial.replace(/^["']/, "").replace(/["']$/, "");
  const q = fold(bare);
  const pages = OPEN_PAGES.filter((page) => page.startsWith(q));
  const slugs = projects.filter((project) => fold(project.name).startsWith(q)).map((project) => project.name);
  const titles = projects
    .filter((project) => fold(project.title).startsWith(q))
    .map((project) => (quoted || /\s/.test(project.title) ? `"${project.title}"` : project.title));

  if (quoted || /[A-ZĄĆĘŁŃÓŚŹŻ]/.test(partial)) return titles;
  const names = [...new Set([...pages, ...slugs])];
  if (names.length > 0) return names;
  return titles;
}

export function suggestInput(raw: string, cwd: string, corpus: TerminalCorpus): { value: string; matches: string[] } {
  const typingCommand = !/\s/.test(raw);
  const { head, partial } = splitTrailing(raw);
  let matches: string[] = [];

  if (typingCommand) {
    matches = COMMANDS.filter((command) => command.startsWith(partial));
  } else {
    const command = tokenizeCommand(raw)[0];
    if (command === "help" || command === "man") {
      matches = COMMANDS.filter((name) => name.startsWith(partial));
    } else if (command && PATH_COMMANDS.has(command)) {
      matches = completePath(partial, cwd, corpus.root);
    } else if (command === "grep") {
      const typed = tokenizeCommand(raw);
      if (typed.length > 2 || /\s$/.test(raw)) matches = completePath(partial, cwd, corpus.root);
    } else if (command === "open") {
      matches = completeOpen(partial, projectsIn(corpus.root));
    }
  }

  if (matches.length === 0) return { value: raw, matches: [] };

  const prefix = commonPrefix(matches);
  const unique = matches.length === 1;
  const command = tokenizeCommand(raw)[0] ?? "";
  let completedToken = unique
    ? finishToken(matches[0] ?? prefix, typingCommand || command === "open" || PATH_COMMANDS.has(command))
    : prefix;
  if (!unique && partial && (!completedToken.startsWith(partial) || completedToken.length < partial.length)) {
    completedToken = partial;
  }
  const value = `${head}${completedToken}`;
  return { value, matches };
}

function finishToken(token: string, addSpace: boolean): string {
  if (token.endsWith("/")) return token;
  return addSpace ? `${token} ` : token;
}

function splitTrailing(raw: string): { head: string; partial: string } {
  if (/\s$/.test(raw)) return { head: raw, partial: "" };
  const match = /(\S+)$/.exec(raw);
  const partial = match?.[1] ?? "";
  return { head: raw.slice(0, raw.length - partial.length), partial };
}
