import typescriptEslintParser from "@typescript-eslint/parser";
import eslintPluginAstro from "eslint-plugin-astro";

/**
 * ESLint covers what oxlint does not:
 * - `astro/*` template rules
 * - `no-mixed-spaces-and-tabs` (no oxlint equivalent)
 * TypeScript recommended rules are in `.oxlintrc.json`.
 */
export default [
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    rules: {
      "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptEslintParser,
    },
    rules: {
      "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    },
  },
  {
    files: ["*.astro", "**/*.astro"],
    languageOptions: {
      parserOptions: {
        parser: typescriptEslintParser,
        extraFileExtensions: [".astro"],
      },
    },
    rules: {
      "astro/no-set-html-directive": "warn",
      "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    },
  },
];
