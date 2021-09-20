module.exports = {
  siteName: 'Jakub Soboczyński',
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
  ],
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
};
