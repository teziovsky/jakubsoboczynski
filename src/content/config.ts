import { z, defineCollection } from "astro:content";

const sort = z.number().int().min(1);
const lastModified = z.string().datetime().optional();
const minutesRead = z
  .string()
  .regex(/^\d+ min read$/)
  .optional();

const aboutMeCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    minutesRead,
    lastModified,
  }),
});

const projectCollection = defineCollection({
  type: "content",
  schema: z.object({
    sort,
    title: z.string(),
    screenshot: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    technologies: z.array(z.string()),
    githubUrl: z.string().url(),
    demoUrl: z.string().url(),
    lastModified,
  }),
});

const socialLinkCollection = defineCollection({
  type: "content",
  schema: z.object({
    sort,
    title: z.string(),
    link: z.string().url(),
    altText: z.string(),
    icon: z.string(),
    newTab: z.boolean(),
    lastModified,
  }),
});

const usesCollection = defineCollection({
  type: "content",
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
