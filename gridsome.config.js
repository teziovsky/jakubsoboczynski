const path = require('path');

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/scss/main.scss'),
      ],
    });
}

module.exports = {
  siteName: 'Jakub Soboczyński',
  titleTemplate: '%s | Jakub Soboczyński',
  siteUrl: 'https://www.jakubsoboczynski.pl',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'blog/posts/**/*.md',
        typeName: 'BlogPost',
        remark: {},
      },
    },
    {
      use: '@gridsome/source-airtable',
      options: {
        apiKey: process.env.AIRTABLE_KEY,
        baseId: process.env.AIRTABLE_BASE,
        tables: [
          {
            name: 'links',
            typeName: 'Links',
            select: {},
            links: [],
          },
          {
            name: 'about_me',
            typeName: 'AboutMe',
            select: {},
            links: [],
          },
          {
            name: 'projects',
            typeName: 'Projects',
            select: {},
            links: [],
          },
          {
            name: 'contact',
            typeName: 'Contact',
            select: {},
            links: [],
          },
        ],
      },
    },
    {
      use: 'gridsome-plugin-sass-resources-loader',
      options: {
        resources: '@/assets/scss/main.scss',
      },
    },
  ],
  transformers: {
    remark: {
      plugins: [
        [
          'remark-autolink-headings',
          {
            behavior: 'wrap',
            linkProperties: {
              ariaHidden: 'true',
              tabIndex: -1,
            },
          },
        ],
        [
          'gridsome-plugin-remark-prismjs-all',
          {
            showLineNumbers: true,
            aliases: {
              vue: 'html',
              cmd: 'bash',
              dos: 'bash',
            },
          },
        ],
      ],
    },
  },
  templates: {
    BlogPost: '/blog/:slug',
  },
  chainWebpack(config) {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type));
    });
  },
};
