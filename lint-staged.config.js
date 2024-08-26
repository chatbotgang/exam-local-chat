const config = {
  "**/*": [
    "eslint --report-unused-disable-directives --fix --max-warnings=0 --no-error-on-unmatched-pattern --no-warn-ignored",
    "prettier --ignore-unknown --write",
    "cspell lint --no-must-find-files",
  ],
  "packages/app/**/*.{ts,tsx}": () => "pnpm exec tsc -p packages/app",
  "packages/build/**/*.ts": () => "pnpm exec tsc -p packages/build",
};

export default config;
