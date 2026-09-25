import { markdownToPlain, markdownToSections } from "@/lib/terminal/text";
import type { FsDir, FsFile, FsNode, TerminalCorpus, TerminalLang } from "@/lib/terminal/types";

export type CorpusLabels = {
  technologies: string;
  github: string;
  demo: string;
  page: string;
  link: string;
};

export type CorpusProject = {
  slug: string;
  title: string;
  body: string;
  technologies: string[];
  githubUrl: string | null;
  demoUrl: string;
  sort: number;
  href: string;
};

export type CorpusSocial = {
  slug: string;
  title: string;
  link: string;
  alt: string;
  sort: number;
};

export type CorpusInput = {
  lang: TerminalLang;
  labels: CorpusLabels;
  about: { title: string; body: string } | null;
  uses: { title: string; body: string } | null;
  projects: CorpusProject[];
  socials: CorpusSocial[];
};

function file(entry: Omit<FsFile, "type">): FsFile {
  return { type: "file", ...entry };
}

function directory(name: string, children: FsNode[]): FsDir {
  return {
    type: "dir",
    name,
    children: [...children].sort((a, b) => a.name.localeCompare(b.name)),
  };
}

function projectContent(project: CorpusProject, labels: CorpusLabels): string {
  const lines = [`# ${project.title}`, "", markdownToPlain(project.body)];
  if (project.technologies.length > 0) {
    lines.push("", `${labels.technologies}: ${project.technologies.join(", ")}`);
  }
  if (project.githubUrl) lines.push(`${labels.github}: ${project.githubUrl}`);
  if (project.demoUrl) lines.push(`${labels.demo}: ${project.demoUrl}`);
  lines.push(`${labels.page}: ${project.href}`);
  return lines.join("\n");
}

export function buildCorpus(input: CorpusInput): TerminalCorpus {
  const children: FsNode[] = [];

  if (input.about) {
    const plain = markdownToPlain(input.about.body);
    children.push(
      directory("about", [
        file({
          name: "o-mnie",
          title: input.about.title,
          content: `# ${input.about.title}\n\n${plain}`,
          sections: markdownToSections(input.about.body),
          kind: "about",
        }),
      ]),
    );
  }

  if (input.projects.length > 0) {
    children.push(
      directory(
        "projects",
        input.projects.map((project) => {
          const plain = markdownToPlain(project.body);
          return file({
            name: project.slug,
            title: project.title,
            content: projectContent(project, input.labels),
            sections: [
              {
                heading: project.title,
                text: [plain, project.technologies.join(", "), project.githubUrl ?? "", project.demoUrl]
                  .filter(Boolean)
                  .join("\n"),
              },
            ],
            kind: "project",
            href: project.href,
            technologies: project.technologies,
            sort: project.sort,
          });
        }),
      ),
    );
  }

  if (input.socials.length > 0) {
    children.push(
      directory(
        "social",
        input.socials.map((social) =>
          file({
            name: social.slug,
            title: social.title,
            content: `# ${social.title}\n\n${social.alt}\n${input.labels.link}: ${social.link}`,
            sections: [{ heading: social.title, text: `${social.alt}\n${social.link}` }],
            kind: "social",
            href: social.link,
            sort: social.sort,
          }),
        ),
      ),
    );
  }

  if (input.uses) {
    const plain = markdownToPlain(input.uses.body);
    children.push(
      directory("uses", [
        file({
          name: "uses-tech",
          title: input.uses.title,
          content: `# ${input.uses.title}\n\n${plain}`,
          sections: markdownToSections(input.uses.body),
          kind: "uses",
        }),
      ]),
    );
  }

  return {
    lang: input.lang,
    root: directory("", children),
  };
}
