import { z, defineCollection } from "astro:content";

const aboutMeCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
  }),
});

const socialLinkCollection = defineCollection({
  type: "content",
  schema: z.object({
    sort: z.number().int().min(1),
    title: z.string(),
    link: z.string().url(),
    altText: z.string(),
    icon: z.string(),
    newTab: z.boolean(),
  }),
});

export const collections = {
  "about-me": aboutMeCollection,
  "social-link": socialLinkCollection,
};
