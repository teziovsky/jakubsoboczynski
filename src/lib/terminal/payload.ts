import { getCollection } from "astro:content";

import type { Languages } from "@/i18n/ui";
import { useTranslations } from "@/i18n/utils";
import { getProjects } from "@/lib/projects";
import { buildCorpus } from "@/lib/terminal/corpus";
import type { TerminalMessages, TerminalPayload } from "@/lib/terminal/types";

export async function buildPayload(lang: Languages): Promise<TerminalPayload> {
  const t = useTranslations(lang);

  const [aboutEntries, socialEntries, usesEntries, projects] = await Promise.all([
    getCollection("about-me", ({ id }) => id.startsWith(`${lang}/`)),
    getCollection("social-link", ({ id }) => id.startsWith(`${lang}/`)),
    getCollection("uses", ({ id }) => id.startsWith(`${lang}/`)),
    getProjects(lang),
  ]);

  const about = aboutEntries.find((entry) => entry.id === `${lang}/o-mnie`) ?? aboutEntries[0];
  const uses = usesEntries.find((entry) => entry.id === `${lang}/uses-tech`) ?? usesEntries[0];

  function terminalProjectBody(project: (typeof projects)[number]) {
    const lines = [
      project.summary,
      project.intro,
      project.language ? `${t("projects.language")}: ${project.language}` : null,
      `${t("projects.stars")}: ${project.stars}`,
      project.topics.length > 0 ? `${t("projects.topics")}: ${project.topics.join(", ")}` : null,
      project.homepage ? `${t("projects.homepage")}: ${project.homepage}` : null,
      project.htmlUrl ? `${t("projects.repository")}: ${project.htmlUrl}` : null,
      project.pushedAt ? `${t("projects.pushed")}: ${project.pushedAt}` : null,
      project.updatedAt ? `${t("projects.updated")}: ${project.updatedAt}` : null,
    ];

    return lines.filter((line): line is string => Boolean(line)).join("\n\n");
  }

  const corpus = buildCorpus({
    lang,
    labels: {
      technologies: t("projects.technologies.title"),
      github: t("project.github"),
      demo: t("project.demo"),
      page: t("terminal.label.page"),
      link: t("terminal.label.link"),
    },
    about: about ? { title: about.data.title, body: about.body ?? "" } : null,
    uses: uses ? { title: uses.data.title, body: uses.body ?? "" } : null,
    projects: projects.map((project, index) => ({
      slug: project.name,
      title: project.name,
      body: terminalProjectBody(project),
      technologies: [],
      githubUrl: null,
      demoUrl: "",
      sort: projects.length - index,
      href: project.href,
    })),
    socials: socialEntries.map((social) => ({
      slug: social.id.slice(lang.length + 1),
      title: social.data.title,
      link: social.data.link,
      alt: social.data.alt,
      sort: social.data.sort,
    })),
  });

  const messages: TerminalMessages = {
    helpHeader: t("terminal.help.header"),
    helpHelp: t("terminal.help.help"),
    helpLs: t("terminal.help.ls"),
    helpCd: t("terminal.help.cd"),
    helpPwd: t("terminal.help.pwd"),
    helpCat: t("terminal.help.cat"),
    helpOpen: t("terminal.help.open"),
    helpWhoami: t("terminal.help.whoami"),
    helpClear: t("terminal.help.clear"),
    helpEcho: t("terminal.help.echo"),
    helpHistory: t("terminal.help.history"),
    helpHead: t("terminal.help.head"),
    helpTail: t("terminal.help.tail"),
    helpWc: t("terminal.help.wc"),
    helpFind: t("terminal.help.find"),
    helpGrep: t("terminal.help.grep"),
    helpTree: t("terminal.help.tree"),
    helpFile: t("terminal.help.file"),
    helpUname: t("terminal.help.uname"),
    helpDate: t("terminal.help.date"),
    helpMan: t("terminal.help.man"),
    helpAsk: t("terminal.help.ask"),
    helpTab: t("terminal.help.tab"),
    noSuch: t("terminal.error.no-such"),
    isDir: t("terminal.error.is-dir"),
    notDir: t("terminal.error.not-dir"),
    usageCd: t("terminal.error.usage-cd"),
    usageCat: t("terminal.error.usage-cat"),
    denied: t("terminal.error.denied"),
    commandNotFound: t("terminal.error.command-not-found"),
    usageHead: t("terminal.error.usage-head"),
    usageTail: t("terminal.error.usage-tail"),
    usageWc: t("terminal.error.usage-wc"),
    usageGrep: t("terminal.error.usage-grep"),
    usageFind: t("terminal.error.usage-find"),
    usageFile: t("terminal.error.usage-file"),
    grepNone: t("terminal.grep.none"),
    grepMore: t("terminal.grep.more"),
    findNone: t("terminal.find.none"),
    fileDir: t("terminal.file.dir"),
    fileText: t("terminal.file.text"),
    unameValue: t("terminal.uname"),
    wcLines: t("terminal.wc.lines"),
    wcWords: t("terminal.wc.words"),
    wcChars: t("terminal.wc.chars"),
    usageOpen: t("terminal.error.usage-open"),
    openOnly: t("terminal.error.open-only"),
    openNone: t("terminal.error.open-none"),
    openMany: t("terminal.error.open-many"),
    openGoing: t("terminal.open.going"),
    askNone: t("terminal.ask.none"),
    askProjects: t("terminal.ask.projects"),
    askSocial: t("terminal.ask.social"),
    askUses: t("terminal.ask.uses"),
    labelTechnologies: t("projects.technologies.title"),
  };

  return { corpus, messages };
}
