import astroEslintParser from "astro-eslint-parser";

import eslintPluginTypeScript from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";
import eslintPluginAstro from "eslint-plugin-astro";

const commonRules = {
  "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
};

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["*.js"],
    rules: commonRules,
  },
  {
    files: ["*.astro"],
    languageOptions: {
      parser: astroEslintParser,
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
    rules: {
      ...commonRules,
      "astro/no-set-html-directive": "warn",
    },
  },
  {
    files: ["*.ts"],
    languageOptions: {
      parser: typescriptEslintParser,
    },
    plugins: {
      "@typescript-eslint": eslintPluginTypeScript,
    },
    rules: {
      ...commonRules,
      ...eslintPluginTypeScript.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
    },
  },
];
