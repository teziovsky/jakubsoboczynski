export default {
  target: "static",
  components: [
    { path: "~/components", extensions: ["vue"] },
    { path: "~/views", extensions: ["vue"] },
  ],
  generate: {
    fallback: true,
  },
  env: {
    url: process.env.NODE_ENV === "production" ? process.env.URL : "http://localhost:3000",
    lang: "pl-PL",
  },
  head: {
    htmlAttrs: {
      lang: "pl-PL",
    },
    titleTemplate: "%s | Jakub Soboczyński",
    meta: [
      { charset: "UTF-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "My own website.",
      },
      {
        name: "og:description",
        content: "My own website.",
      },
      {
        name: "twitter:description",
        content: "My own website.",
      },
      {
        name: "keywords",
        content: "Jakub Soboczyński, Portfolio, Front-End Developer,Frontend Developer, Front-End, Frontend, Developer",
      },
      {
        name: "og:title",
        content: "Hello! | Jakub Soboczyński",
      },
      {
        name: "og:url",
        content: "https://www.jakubsoboczynski.pl",
      },
      {
        name: "og:locale",
        content: "pl_PL",
      },
      {
        name: "og:type",
        content: "website",
      },
      {
        name: "twitter:title",
        content: "Hello! | Jakub Soboczyński",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:creator",
        content: "@teziovsky",
      },
      {
        name: "robots",
        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
    __dangerouslyDisableSanitizers: ["noscript"],
  },
  css: ["@/assets/scss/main.scss"],
  plugins: [],
  buildModules: ["@nuxtjs/color-mode", "@nuxtjs/svg"],
  modules: ["@nuxt/content", "@nuxtjs/gtm"],
  build: {
    extractCSS: true,
    optimization: {
      minimize: true,
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.(scss|css|vue)$/,
            chunks: "all",
            enforce: true,
          },
        },
      },
    },
    transpile: ["gsap"],
    extend(config, ctx) {},
  },
  content: {
    dir: "content",
  },
  gtm: {
    id: "GTM-58GTFS3",
  },
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "dark",
    componentName: "ColorScheme",
    cookie: {
      options: {
        sameSite: "lax",
      },
    },
  },
};
