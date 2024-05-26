import eslintPluginAstro from "eslint-plugin-astro";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["*.js"],
    rules: {
      "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    },
  },
  {
    files: ["*.astro"],
    parser: "astro-eslint-parser",
    parserOptions: {
      parser: "@typescript-eslint/parser",
      extraFileExtensions: [".astro"],
    },
    rules: {
      "astro/no-set-html-directive": "warn",
      "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    },
  },
  {
    files: ["*.ts"],
    parser: "@typescript-eslint/parser",
    extends: ["plugin:@typescript-eslint/recommended"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" }],
    },
  },
];
