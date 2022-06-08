const path = require("path");

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/assets/scss/main.scss")],
    });
}

module.exports = {
  siteName: "Jakub Soboczyński",
  titleTemplate: "%s | Jakub Soboczyński",
  siteUrl: "https://www.jakubsoboczynski.pl",
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/social_links/*.md",
        typeName: "SocialLinks",
        remark: {},
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/about_me/*.md",
        typeName: "AboutMe",
        remark: {},
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/projects/*.md",
        typeName: "Projects",
        remark: {},
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/contact/*.md",
        typeName: "Contact",
        remark: {},
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "blog/posts/**/*.md",
        typeName: "BlogPost",
        remark: {},
      },
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`,
        modulePath: `src/admin/index.js`,
      },
    },
    {
      use: "gridsome-plugin-sass-resources-loader",
      options: {
        resources: "@/assets/scss/main.scss",
      },
    },
    {
      use: "gridsome-plugin-gtm",
      options: {
        id: "GTM-58GTFS3",
        enabled: true,
        debug: false,
      },
    },
  ],
  transformers: {
    remark: {
      plugins: [
        [
          "gridsome-plugin-remark-prismjs-all",
          {
            showLineNumbers: true,
            aliases: {
              vue: "html",
              cmd: "bash",
              dos: "bash",
            },
          },
        ],
      ],
    },
  },
  templates: {
    BlogPost: "/blog/:slug",
  },
  chainWebpack(config) {
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach((type) => {
      addStyleResource(config.module.rule("scss").oneOf(type));
    });
  },
};
