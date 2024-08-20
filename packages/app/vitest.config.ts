import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    include: ["**/*.test.{js,ts,jsx,tsx}"],
    globals: true,
  },
});
