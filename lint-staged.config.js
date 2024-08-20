const config = {
  "**/*": ["prettier --ignore-unknown --write"],
  "packages/app/**/*.{ts,tsx,js,jsx,cjs}": "eslint --fix",
  "packages/app/**/*.{ts,tsx}": () => "pnpm exec tsc -p packages/app",
};

export default config;
