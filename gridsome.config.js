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
  plugins: [
    {
      use: '@gridsome/source-airtable',
      options: {
        apiKey: process.env.AIRTABLE_KEY,
        baseId: process.env.AIRTABLE_BASE,
        tables: [
          {
            name: 'links',
            typeName: 'links',
            select: {},
            links: [],
          },
          {
            name: 'about_me',
            typeName: 'about_me',
            select: {},
            links: [],
          },
          {
            name: 'projects',
            typeName: 'projects',
            select: {},
            links: [],
          },
          {
            name: 'contact',
            typeName: 'contact',
            select: {},
            links: [],
          },
          {
            name: 'blog',
            typeName: 'blog',
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
  chainWebpack(config) {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type));
    });
  },
};
