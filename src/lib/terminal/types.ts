export type TerminalLang = "pl" | "en";

export type TermTone = "text" | "error" | "muted" | "dir" | "accent";

export type TermLine = {
  text: string;
  tone: TermTone;
};

export type FsSection = {
  heading: string;
  text: string;
};

export type FsFile = {
  type: "file";
  name: string;
  title: string;
  content: string;
  sections: FsSection[];
  kind: "about" | "project" | "uses" | "social";
  href?: string;
  technologies?: string[];
  sort?: number;
};

export type FsDir = {
  type: "dir";
  name: string;
  children: FsNode[];
};

export type FsNode = FsDir | FsFile;

export type TerminalCorpus = {
  lang: TerminalLang;
  root: FsDir;
};

export type TerminalMessages = {
  helpHeader: string;
  helpHelp: string;
  helpLs: string;
  helpCd: string;
  helpPwd: string;
  helpCat: string;
  helpOpen: string;
  helpWhoami: string;
  helpClear: string;
  helpAsk: string;
  helpTab: string;
  noSuch: string;
  isDir: string;
  notDir: string;
  usageCd: string;
  usageCat: string;
  usageOpen: string;
  openOnly: string;
  openNone: string;
  openMany: string;
  openGoing: string;
  askNone: string;
  askProjects: string;
  askSocial: string;
  askUses: string;
  labelTechnologies: string;
};

export type CommandResult =
  { type: "output"; lines: TermLine[] } | { type: "clear" } | { type: "navigate"; href: string; lines: TermLine[] };

export type TerminalPayload = {
  corpus: TerminalCorpus;
  messages: TerminalMessages;
};
