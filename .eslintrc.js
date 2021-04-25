// .eslintrc.js
module.exports = {
  extends: ['plugin:vue/recommended', 'plugin:prettier-vue/recommended', 'prettier'],

  settings: {
    'prettier-vue': {
      SFCBlocks: {
        template: true,
        script: true,
        style: true,
        customBlocks: {
          docs: { lang: 'markdown' },
          config: { lang: 'json' },
          module: { lang: 'js' },
          comments: false,
        },
      },
      usePrettierrc: true,
      fileInfoOptions: {
        ignorePath: '.testignore',
        withNodeModules: false,
      },
    },
  },

  rules: {
    'prettier-vue/prettier': [
      'error',
      {
        printWidth: 100,
        singleQuote: true,
        semi: true,
        trailingComma: 'es5',
      },
    ],
  },
};
