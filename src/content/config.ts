import { z, defineCollection } from "astro:content";

const sort = z.number().int().min(1);

const aboutMeCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
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
    technologies: z.string(),
    githubUrl: z.string().url(),
    demoUrl: z.string().url(),
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
  }),
});

const usesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  "about-me": aboutMeCollection,
  project: projectCollection,
  "social-link": socialLinkCollection,
  uses: usesCollection,
};
