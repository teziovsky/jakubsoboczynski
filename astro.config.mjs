import compress from "astro-compress";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";
import rehypeExternalLinks from "rehype-external-links";

import { remarkModifiedTime } from "./src/lib/remark-modified-time.mjs";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://jakubsoboczynski.pl",
  i18n: {
    locales: ["en", "pl"],
    defaultLocale: "en",
  },
  markdown: {
    remarkPlugins: [remarkModifiedTime, remarkReadingTime],
    rehypePlugins: [[rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }]],
  },
  integrations: [
    compress(),
    icon(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    sitemap(),
    robotsTxt(),
    mdx(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 8010,
  },
});
