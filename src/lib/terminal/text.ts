const STOPWORDS = new Set([
  "and",
  "are",
  "but",
  "can",
  "did",
  "does",
  "for",
  "from",
  "have",
  "her",
  "him",
  "his",
  "how",
  "into",
  "its",
  "just",
  "not",
  "please",
  "she",
  "that",
  "the",
  "them",
  "they",
  "this",
  "was",
  "what",
  "with",
  "you",
  "your",
  "albo",
  "bardzo",
  "czy",
  "czyli",
  "dla",
  "jego",
  "jest",
  "jestem",
  "jestes",
  "juz",
  "ktora",
  "ktore",
  "ktory",
  "mnie",
  "moja",
  "moje",
  "oraz",
  "prosze",
  "przez",
  "przy",
  "sie",
  "sobie",
  "tak",
  "ten",
  "tej",
  "tego",
  "tez",
  "tylko",
  "twoja",
  "twoje",
  "tym",
  "jaka",
  "jakie",
  "jakiego",
  "jakich",
  "jaki",
  "lubie",
  "lubisz",
  "masz",
]);

const ALIASES: Record<string, readonly string[]> = {
  browser: ["helium", "przeglad"],
  contact: ["kontakt", "mail"],
  editor: ["edytor", "cursor"],
  edytor: ["editor", "cursor"],
  edytora: ["edytor", "cursor"],
  hardware: ["sprzet"],
  keyboard: ["klawiat", "nuphy"],
  klawiatura: ["keyboard", "nuphy"],
  kontakt: ["contact", "mail"],
  mouse: ["mysz", "logitech"],
  music: ["muzyk", "techno"],
  muzyka: ["muzyk", "techno", "music"],
  muzyk: ["music", "techno"],
  przegladarka: ["browser", "helium"],
  sprzet: ["hardware"],
  sprzetu: ["sprzet", "hardware"],
};

export function fold(value: string): string {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

export function tokenizeCommand(input: string): string[] {
  const tokens: string[] = [];
  const pattern = /"([^"]*)"|'([^']*)'|(\S+)/g;
  for (const match of input.matchAll(pattern)) {
    tokens.push(match[1] ?? match[2] ?? match[3] ?? "");
  }
  return tokens;
}

export function queryTokens(value: string): string[] {
  return fold(value)
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2 && !STOPWORDS.has(token));
}

export function searchForms(token: string): string[] {
  const forms = new Set<string>([token]);
  for (const alias of ALIASES[token] ?? []) forms.add(alias);

  const suffixes = ["ach", "ami", "owi", "iem", "ego", "om", "em", "ie", "y", "a", "u", "e"];
  for (const suffix of suffixes) {
    if (token.length - suffix.length >= 4 && token.endsWith(suffix)) {
      forms.add(token.slice(0, -suffix.length));
    }
  }

  return [...forms];
}

export function markdownToPlain(markdown: string): string {
  return markdown
    .replace(/\r\n/g, "\n")
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/~~([^~]+)~~/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*]\s+/gm, "• ")
    .replace(/\[|\]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function markdownToSections(markdown: string): { heading: string; text: string }[] {
  const sections: { heading: string; lines: string[] }[] = [{ heading: "", lines: [] }];

  for (const line of markdown.replace(/\r\n/g, "\n").split("\n")) {
    const heading = /^(#{2,6})\s+(.*)$/.exec(line);
    if (heading?.[2]) {
      sections.push({ heading: heading[2].trim(), lines: [] });
      continue;
    }
    if (/^#{1}\s+/.test(line)) continue;
    const current = sections[sections.length - 1];
    current?.lines.push(line);
  }

  return sections
    .map((section) => ({
      heading: section.heading,
      text: markdownToPlain(section.lines.join("\n")),
    }))
    .filter((section) => section.text.length > 0);
}

export function firstSentence(text: string, max = 220): string {
  const paragraph = text
    .split(/\n+/)
    .map((line) => line.trim())
    .find((line) => line.length > 0);
  if (!paragraph) return "";
  const sentence = paragraph.split(/(?<=[.!?])\s+/)[0] ?? paragraph;
  if (sentence.length <= max) return sentence;
  const cut = sentence.lastIndexOf(" ", max);
  return `${sentence.slice(0, cut > 40 ? cut : max).trim()}…`;
}

export function excerpt(text: string, max: number): string {
  const flat = text
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  if (flat.length <= max) return flat;
  const slice = flat.slice(0, max);
  const newline = slice.lastIndexOf("\n");
  const sentence = slice.lastIndexOf(". ");
  const space = slice.lastIndexOf(" ");
  const cut = Math.max(newline, sentence, space);
  const end = cut > max * 0.55 ? cut : max;
  return `${slice.slice(0, end).trim()}…`;
}
