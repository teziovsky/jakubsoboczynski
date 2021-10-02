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
          {
            name: 'blog',
            typeName: 'BlogPost',
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
  templates: {
    BlogPost: '/blog/:id',
  },
  chainWebpack(config) {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type));
    });
  },
};
