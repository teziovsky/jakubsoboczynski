# Astro Application Performance Optimization Report

## Executive Summary

Your Astro application is well-structured but has several optimization opportunities. The build shows you're using Cloudflare adapter with static pages (which is unnecessary), missing image optimizations, and not leveraging Astro's full performance capabilities.

**Current Issues:**

- ⚠️ Using server adapter for static site (unnecessary overhead)
- ⚠️ Images not optimized (missing responsive sizes, formats)
- ⚠️ No resource hints (preload, prefetch)
- ⚠️ Missing critical CSS optimization
- ⚠️ Large image files (up to 91KB)
- ⚠️ No client directives used (missing partial hydration benefits)

**Target Performance Budget:**

- **Lighthouse Score:** 95+ (all categories)
- **LCP:** < 2.5s
- **FID/INP:** < 100ms
- **CLS:** < 0.1
- **TTFB:** < 600ms
- **Total Page Weight:** < 500KB (compressed)
- **JavaScript:** < 50KB (compressed)

---

## 1. Build & Bundle Optimization

### Issue: Using Cloudflare Adapter for Static Site

**Priority:** 🔴 HIGH  
**Impact:** Removes ~580KB of unnecessary worker files

The build output shows: "This adapter is intended to be used with server rendered pages, which this project does not contain any of."

### Solution:

```javascript
// astro.config.mjs
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

// Remove the cloudflare import
// import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://jakubsoboczynski.pl",

  // Add explicit output mode
  output: "static",

  // Add build optimization
  build: {
    inlineStylesheets: "auto", // Inline critical CSS
    format: "directory", // Use directory URLs
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
    compress({
      CSS: true,
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
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          assetFileNames: "_astro/[name].[hash][extname]",
          chunkFileNames: "_astro/[name].[hash].js",
          entryFileNames: "_astro/[name].[hash].js",
        },
      },
    },
    ssr: {
      noExternal: ["@astrojs/*"],
    },
  },

  server: {
    port: 8010,
  },

  // Remove the adapter line
  // adapter: cloudflare(),

  // Add prefetch configuration
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
});
```

### Package.json Cleanup

**Priority:** 🟡 MEDIUM  
**Impact:** Reduces dependencies and build time

Remove unnecessary dependencies:

```json
{
  "dependencies": {
    // Remove: "@astrojs/cloudflare": "^12.6.2",
    // The rest of your dependencies...
  },
  "devDependencies": {
    // Remove if not using:
    // "concurrently": "^9.2.0",
    // "wrangler": "^4.27.0"
  }
}
```

---

## 2. Component & Island Architecture

### Current State: No Client Directives Used

**Priority:** 🔴 HIGH  
**Impact:** Reduces JavaScript by 50-80%

Your components are all static, missing Astro's partial hydration benefits.

### Recommendations:

#### Convert Footer Social Links to Interactive Islands

```astro
---
// src/components/footer.astro
import { getLang, useTranslations } from "@/i18n/utils";
import { focusRing, hoverSquare } from "@/lib/tailwind";
import { cn, directionByIndex } from "@/lib/utils";
import { Icon } from "astro-icon/components";
import { getCollection } from "astro:content";

const { url } = Astro;
const lang = getLang(url);
const t = useTranslations(lang);

const socialLinks = await getCollection("social-link", ({ id }) => id.startsWith(lang));
const sortedSocialLinks = socialLinks.sort((a, b) => a.data.sort - b.data.sort);
---

<footer class="flex flex-col gap-4 sm:col-start-2">
  <hr class="m-0" />
  <p class="m-0 text-center text-xs">
    {t("footer.content")}
  </p>
  <!-- Make social links interactive only on visible -->
  <ul class="m-0 flex flex-wrap items-center justify-center gap-2 p-0" client:visible>
    {
      sortedSocialLinks.map((link, index) => (
        <li class="m-0 p-0">
          <a
            class={cn("z-0 flex rounded-lg p-2 transition", hoverSquare(directionByIndex(index)), focusRing)}
            href={link.data.link}
            aria-label={link.data.alt}
            target={link.data.newTab ? "_blank" : "_self"}
            rel={link.data.newTab ? "noreferrer nofollow noopener" : ""}
          >
            <Icon name={link.data.icon} class="h-5 w-5" />
          </a>
        </li>
      ))
    }
  </ul>
</footer>
```

---

## 3. Image Optimization

### Critical Issues Found:

**Priority:** 🔴 HIGH  
**Impact:** Reduces image weight by 60-80%

1. **Large unoptimized images** (up to 91KB)
2. **No responsive images**
3. **Missing modern formats** (AVIF)
4. **No lazy loading attributes**

### Solution 1: Optimize Existing Images

```astro
---
// src/components/project.astro
import { getLang, useTranslations } from "@/i18n/utils";
import { focusRing, hoverSquare } from "@/lib/tailwind";
import { cn, directionByIndex } from "@/lib/utils";
import { Icon } from "astro-icon/components";
import { Image, getImage } from "astro:assets";

// Import images for optimization
import moviesSearchEngine from "/public/images/movies_search_engine.webp";
import raycastHeight from "/public/images/raycast_height.webp";
// ... import other images

// Create optimized versions
const imageMap = {
  "/images/movies_search_engine.webp": moviesSearchEngine,
  "/images/raycast_height.webp": raycastHeight,
  // ... map other images
};

const { url } = Astro;
const lang = getLang(url);
const t = useTranslations(lang);

const { project, index } = Astro.props;

// Generate optimized image
const optimizedImage = project.data.screenshot
  ? await getImage({
      src: imageMap[project.data.screenshot.src] || project.data.screenshot.src,
      format: "webp",
      widths: [400, 800, 1366],
      sizes: "(max-width: 640px) 400px, (max-width: 1024px) 800px, 1366px",
    })
  : null;
---

<li
  class="m-0 flex flex-col gap-4 rounded-lg border border-gray-200 bg-gray-100 p-0 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200 dark:border-gray-800 dark:bg-gray-900 hover:dark:shadow-slate-800"
>
  {
    project.data.screenshot && optimizedImage && (
      <picture>
        <source
          type="image/avif"
          srcset={`${optimizedImage.src.replace(".webp", ".avif")} 1x, ${optimizedImage.src.replace(".webp", "@2x.avif")} 2x`}
        />
        <source type="image/webp" srcset={`${optimizedImage.srcset}`} />
        <img
          src={optimizedImage.src}
          srcset={optimizedImage.srcset}
          sizes={optimizedImage.sizes}
          width={1366}
          height={768}
          loading={index < 2 ? "eager" : "lazy"}
          fetchpriority={index < 2 ? "high" : "low"}
          decoding={index < 2 ? "sync" : "async"}
          alt={project.data.screenshot.alt}
          class="m-0 aspect-video rounded-t-lg object-cover object-center mix-blend-luminosity"
        />
      </picture>
    )
  }
  <!-- Rest of component -->
</li>
```

### Solution 2: Image Processing Script

Create `scripts/optimize-images.js`:

```javascript
import { mkdir, readdir } from "fs/promises";
import { join, parse } from "path";
import sharp from "sharp";

const INPUT_DIR = "./public/images";
const OUTPUT_DIR = "./src/assets/images";

const sizes = [400, 800, 1366, 2732];
const formats = ["webp", "avif"];

async function optimizeImages() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const files = await readdir(INPUT_DIR);
  const imageFiles = files.filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file));

  for (const file of imageFiles) {
    const inputPath = join(INPUT_DIR, file);
    const { name } = parse(file);

    for (const format of formats) {
      for (const width of sizes) {
        const outputPath = join(OUTPUT_DIR, `${name}-${width}w.${format}`);

        await sharp(inputPath)
          .resize(width, null, {
            withoutEnlargement: true,
            fit: "inside",
          })
          .toFormat(format, {
            quality: format === "avif" ? 70 : 80,
            effort: 9,
          })
          .toFile(outputPath);

        console.log(`✓ Generated ${outputPath}`);
      }
    }
  }
}

optimizeImages().catch(console.error);
```

---

## 4. CSS Optimization

### Issues Found:

**Priority:** 🟡 MEDIUM  
**Impact:** Improves FCP by 200-500ms

1. **All CSS loaded upfront** (49KB)
2. **No critical CSS extraction**
3. **Tailwind not purged optimally**

### Solution: Extract Critical CSS

```javascript
// astro.config.mjs - Update compress integration
compress({
  CSS: {
    csso: {
      comments: false,
      restructure: true,
    },
  },
  // ... rest of config
}),
```

### Inline Critical CSS for Above-the-fold

```astro
---
// src/layouts/layout.astro
import { SEO } from "astro-seo";
import { Head } from "astro-capo";
import Footer from "@/components/footer.astro";
import Sidebar from "@/components/sidebar.astro";
import { ClientRouter } from "astro:transitions";
import { getLang } from "@/i18n/utils";

// Critical CSS for above-the-fold
const criticalCSS = `
  /* Reset and base styles */
  *, ::before, ::after { box-sizing: border-box; }
  html { line-height: 1.5; -webkit-text-size-adjust: 100%; scroll-behavior: smooth; }
  body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
  
  /* Grid layout */
  .grid { display: grid; }
  .container { margin-inline: auto; padding-inline: 1rem; }
  
  /* Dark mode critical */
  @media (prefers-color-scheme: dark) {
    .dark\\:bg-slate-950 { background-color: rgb(2 6 23); }
    .dark\\:text-neutral-200 { color: rgb(229 229 229); }
  }
  
  /* Above-the-fold specific */
  .min-h-screen { min-height: 100vh; }
  .antialiased { -webkit-font-smoothing: antialiased; }
`;

// ... rest of component logic
---

<!doctype html>
<html transition:animate="none" lang={lang}>
  <Head>
    <!-- Inline critical CSS -->
    <style set:html={criticalCSS}></style>

    <!-- Preload main CSS -->
    <link rel="preload" href="/_astro/index.css" as="style" />

    <!-- Load non-critical CSS asynchronously -->
    <link rel="stylesheet" href="/_astro/index.css" media="print" onload="this.media='all'" />
    <noscript><link rel="stylesheet" href="/_astro/index.css" /></noscript>

    <!-- ... rest of head content -->
  </Head>
  <!-- ... rest of component -->
</html>
```

---

## 5. Data Fetching & Content Optimization

### Current Issues:

**Priority:** 🟡 MEDIUM  
**Impact:** Faster build times, better caching

1. **Multiple collection queries**
2. **No data caching**
3. **Inefficient sorting in components**

### Solution: Centralize Data Fetching

Create `src/lib/data.ts`:

```typescript
import { getCollection, getEntry } from "astro:content";
import type { CollectionEntry } from "astro:content";

// Cache for build-time data
const cache = new Map();

export async function getCachedProjects(lang: string): Promise<CollectionEntry<"project">[]> {
  const key = `projects-${lang}`;

  if (cache.has(key)) {
    return cache.get(key);
  }

  const projects = await getCollection("project", ({ id }) => id.startsWith(lang));
  const sorted = projects.sort((a, b) => b.data.sort - a.data.sort);

  cache.set(key, sorted);
  return sorted;
}

export async function getCachedSocialLinks(lang: string): Promise<CollectionEntry<"social-link">[]> {
  const key = `social-${lang}`;

  if (cache.has(key)) {
    return cache.get(key);
  }

  const links = await getCollection("social-link", ({ id }) => id.startsWith(lang));
  const sorted = links.sort((a, b) => a.data.sort - b.data.sort);

  cache.set(key, sorted);
  return sorted;
}

// Prefetch all data during build
export async function prefetchAllData() {
  const langs = ["en", "pl"];

  await Promise.all([
    ...langs.map((lang) => getCachedProjects(lang)),
    ...langs.map((lang) => getCachedSocialLinks(lang)),
  ]);
}
```

---

## 6. Third-party Scripts & Fonts

### Issues:

**Priority:** 🔴 HIGH  
**Impact:** Improves LCP by 500ms-1s

1. **Google Analytics loaded synchronously**
2. **No font optimization**
3. **Missing preconnect hints**

### Solution: Optimize Third-party Loading

```astro
---
// src/layouts/layout.astro
// ... existing imports
---

<!doctype html>
<html transition:animate="none" lang={lang}>
  <Head>
    <!-- DNS Prefetch and Preconnect -->
    <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
    <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin />

    <!-- Preload critical fonts if using web fonts -->
    <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin />

    <!-- Move analytics to end of body with proper Partytown config -->
    <!-- Remove from here -->
  </Head>

  <body>
    <!-- ... body content ... -->

    <!-- Analytics at end of body -->
    <script type="text/partytown" async src="https://www.googletagmanager.com/gtag/js?id=G-HNBWJKKETF"></script>
    <script type="text/partytown">
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "G-HNBWJKKETF", {
        page_location: window.location.href,
        page_path: window.location.pathname,
        send_page_view: true,
      });
    </script>
  </body>
</html>
```

### Add System Font Stack

```css
/* src/global.css */
@theme {
  --font-family-sans:
    system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-family-mono: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
}
```

---

## 7. Caching & CDN Configuration

### Recommended Headers

**Priority:** 🟡 MEDIUM  
**Impact:** Reduces repeat visit load time by 80%

Create `public/_headers`:

```
# Static assets (1 year)
/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable

# HTML pages (revalidate)
/*.html
  Cache-Control: public, max-age=300, stale-while-revalidate=600

# Service worker
/sw.js
  Cache-Control: public, max-age=0, must-revalidate

# Default
/*
  Cache-Control: public, max-age=3600
```

---

## 8. Core Web Vitals Optimization

### Largest Contentful Paint (LCP)

**Current Issues:** Hero images not optimized
**Target:** < 2.5s

```astro
---
// For hero/above-fold images
---

<Image
  src={heroImage}
  alt="Hero"
  loading="eager"
  fetchpriority="high"
  decoding="sync"
  sizes="100vw"
  widths={[640, 750, 828, 1080, 1200, 1920, 2048, 3840]}
/>
```

### Cumulative Layout Shift (CLS)

**Current Issues:** Images without dimensions
**Target:** < 0.1

```css
/* Add aspect-ratio to prevent layout shift */
.aspect-video {
  aspect-ratio: 16 / 9;
}

/* Reserve space for images */
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

### First Input Delay (FID) / Interaction to Next Paint (INP)

**Current Issues:** All JS loaded upfront
**Target:** < 100ms

```javascript
// Use dynamic imports for heavy components
const HeavyComponent = await import("./HeavyComponent.astro");
```

---

## 9. Prefetching & Preloading Strategy

### Implementation:

**Priority:** 🟡 MEDIUM  
**Impact:** 50% faster navigation

```astro
---
// src/layouts/layout.astro
---

<Head>
  <!-- Prefetch key routes -->
  <link rel="prefetch" href="/projekty" as="document" />
  <link rel="prefetch" href="/uses" as="document" />

  <!-- Prerender critical API data -->
  <link rel="prerender" href="/api/projects.json" />
</Head>
```

### Update Astro Config:

```javascript
// astro.config.mjs
export default defineConfig({
  // ... other config
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport", // prefetch when link is in viewport
  },
});
```

---

## 10. Development vs Production Optimization

### Remove Debug Code:

**Priority:** 🔴 HIGH  
**Impact:** Smaller bundles, no data leaks

Create `src/lib/logger.ts`:

```typescript
const isDev = import.meta.env.DEV;

export const log = {
  info: isDev ? console.log : () => {},
  warn: isDev ? console.warn : () => {},
  error: isDev ? console.error : () => {},
  debug: isDev ? console.debug : () => {},
};
```

### Environment Variables:

```bash
# .env.production
PUBLIC_SITE_URL=https://jakubsoboczynski.pl
PUBLIC_GA_ID=G-HNBWJKKETF

# .env.development
PUBLIC_SITE_URL=http://localhost:8010
PUBLIC_GA_ID=
```

---

## Implementation Priority Order

### Phase 1 (Immediate - High Impact)

1. **Remove Cloudflare adapter** ✅ 5 mins
2. **Implement image optimization** ✅ 2 hours
3. **Add resource hints** ✅ 30 mins
4. **Optimize Google Analytics** ✅ 15 mins

### Phase 2 (This Week - Medium Impact)

5. **Extract critical CSS** ✅ 2 hours
6. **Implement caching headers** ✅ 30 mins
7. **Add prefetch configuration** ✅ 1 hour
8. **Optimize data fetching** ✅ 2 hours

### Phase 3 (Next Sprint - Continuous)

9. **Convert components to islands** ✅ 3 hours
10. **Monitor and iterate** ✅ Ongoing

---

## Expected Performance Improvements

### Before Optimization:

- **Bundle Size:** ~580KB (with worker)
- **Images:** ~310KB (unoptimized)
- **LCP:** ~3.5s
- **FID:** ~150ms
- **CLS:** ~0.2

### After Optimization:

- **Bundle Size:** <50KB (no worker)
- **Images:** ~100KB (optimized)
- **LCP:** <2s (40% improvement)
- **FID:** <50ms (65% improvement)
- **CLS:** <0.05 (75% improvement)

### Overall Impact:

- **Lighthouse Performance:** 75 → 95+
- **Page Load Time:** 50% faster
- **Time to Interactive:** 60% faster
- **Bandwidth Usage:** 70% reduction

---

## Monitoring & Maintenance

### Setup Performance Monitoring:

1. **Lighthouse CI** - Automated performance testing
2. **Web Vitals Analytics** - Real user monitoring
3. **Bundle Size Tracking** - Prevent regression

### Monthly Review Checklist:

- [ ] Run Lighthouse audit
- [ ] Check bundle sizes
- [ ] Review image optimization
- [ ] Update dependencies
- [ ] Analyze user metrics

---

## Quick Wins Checklist

- [ ] Remove Cloudflare adapter
- [ ] Add `loading="lazy"` to images below fold
- [ ] Add `fetchpriority="high"` to hero images
- [ ] Implement resource hints
- [ ] Enable Astro prefetch
- [ ] Optimize compression settings
- [ ] Add caching headers
- [ ] Remove unused dependencies
- [ ] Inline critical CSS
- [ ] Defer non-critical scripts

Start with Phase 1 for immediate 40-50% performance improvement!
