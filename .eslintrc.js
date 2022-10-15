module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ["next/core-web-vitals", "eslint:recommended", "plugin:prettier/recommended"],
  ignorePatterns: ["node_modules", "dist"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-shadow": "off",
  },
};
