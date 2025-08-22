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

// Removed cloudflare adapter - not needed for static site

// https://astro.build/config
export default defineConfig({
  site: "https://jakubsoboczynski.pl",
  
  // Explicit static output mode
  output: 'static',
  
  // Build optimizations
  build: {
    inlineStylesheets: 'auto', // Inline critical CSS automatically
    format: 'directory', // Use directory URLs for better SEO
  },

  i18n: {
    locales: ["en", "pl"],
    defaultLocale: "en",
  },

  markdown: {
    remarkPlugins: [remarkModifiedTime, remarkReadingTime],
    rehypePlugins: [[rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }]],
  },

  integrations: [
    // Enhanced compression settings
    compress({
      CSS: {
        csso: {
          comments: false,
          restructure: true,
        },
      },
      HTML: {
        caseSensitive: true,
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        decodeEntities: true,
        html5: true,
        keepClosingSlash: false,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        preventAttributesEscaping: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true,
      },
      Image: {
        jpeg: { quality: 80 },
        png: { quality: 80 },
        webp: { quality: 80 },
        avif: { quality: 70 },
      },
      JavaScript: true,
      SVG: true,
    }),
    icon({
      include: {
        lucide: ["external-link"],
        tabler: ["brand-github", "brand-linkedin", "mail", "rss"],
      },
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
        // Optimize Partytown for better performance
        lib: "/_partytown/",
        debug: false,
      },
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    robotsTxt({
      sitemap: true,
      policy: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/api/', '/_astro/'],
        },
      ],
    }),
    mdx(),
  ],

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          assetFileNames: '_astro/[name].[hash][extname]',
          chunkFileNames: '_astro/[name].[hash].js',
          entryFileNames: '_astro/[name].[hash].js',
          manualChunks: {
            // Split vendor chunks for better caching
            'vendor-ui': ['clsx', 'tailwind-merge'],
            'vendor-date': ['date-fns'],
            'vendor-content': ['mdast-util-to-string', 'reading-time'],
          },
        },
      },
      // Optimize chunk size
      chunkSizeWarningLimit: 1000,
    },
    ssr: {
      noExternal: ['@astrojs/*'],
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['clsx', 'tailwind-merge', 'date-fns'],
    },
  },

  server: {
    port: 8010,
  },
  
  // Enable prefetching for faster navigation
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport', // Prefetch when link enters viewport
  },
  
  // Experimental features for better performance
  experimental: {
    directRenderScript: true,
  },
});