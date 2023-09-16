import compress from "astro-compress";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import rehypeExternalLinks from "rehype-external-links";

import { defaultLang } from "./src/i18n/ui";
import { remarkModifiedTime } from "./src/lib/remark-modified-time.cjs";
import { remarkReadingTime } from "./src/lib/remark-reading-time.cjs";

// https://astro.build/config
export default defineConfig({
  site: "https://jakubsoboczynski.pl",
  markdown: {
    remarkPlugins: [remarkModifiedTime, remarkReadingTime],
    rehypePlugins: [[rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }]],
  },
  redirects: {
    "/": `/${defaultLang}/`,
  },
  integrations: [
    compress(),
    tailwind(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    sitemap(),
    robotsTxt(),
    mdx(),
  ],
});
