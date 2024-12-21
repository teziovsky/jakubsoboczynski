import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const sort = z.number().int().min(1);
const lastModified = z.string().datetime().optional();
const minutesRead = z
  .string()
  .regex(/^\d+ min read$/)
  .optional();

const aboutMeCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "content/about-me" }),
  schema: z.object({
    title: z.string(),
    minutesRead,
    lastModified,
  }),
});

const projectCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "content/project" }),
  schema: z.object({
    sort,
    title: z.string(),
    screenshot: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    technologies: z.array(z.string()),
    githubUrl: z.string().url().nullable().optional(),
    demoUrl: z.string().url(),
    lastModified,
  }),
});

const socialLinkCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "content/social-link" }),
  schema: z.object({
    sort,
    title: z.string(),
    link: z.string().url(),
    alt: z.string(),
    icon: z.string(),
    newTab: z.boolean(),
    lastModified,
  }),
});

const usesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "content/uses" }),
  schema: z.object({
    title: z.string(),
    minutesRead,
    lastModified,
  }),
});

export const collections = {
  "about-me": aboutMeCollection,
  project: projectCollection,
  "social-link": socialLinkCollection,
  uses: usesCollection,
};
