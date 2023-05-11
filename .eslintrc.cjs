module.exports = {
  extends: ["plugin:astro/recommended", "plugin:astro/jsx-a11y-strict"],
  plugins: ["prettier"],
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        "astro/no-set-html-directive": "error",
        "prettier/prettier": ["error", {}, { usePrettierrc: true }],
      },
    },
  ],
};
