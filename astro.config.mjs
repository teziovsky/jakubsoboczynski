import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import image from "@astrojs/image";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://jakubsoboczynski.pl",
  integrations: [
    compress(),
    tailwind(),
    partytown(),
    sitemap(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    robotsTxt(),
  ],
});
