export default {
  extends: ["@commitlint/config-conventional"],
  defaultIgnores: true,
  ignores: [(commit) => commit.includes("Merge")],
};
