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
};
