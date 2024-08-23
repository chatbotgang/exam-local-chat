module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
  ],
  ignorePatterns: ["dist"],
  parser: "@typescript-eslint/parser",
  plugins: ["simple-import-sort", "eslint-plugin-tsdoc", "react-refresh"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "tsdoc/syntax": "warn",
  },
};
