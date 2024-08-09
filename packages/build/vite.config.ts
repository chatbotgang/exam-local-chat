/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  test: {
    include: ["**/*.test.{js,ts,jsx,tsx}"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./setupTests.ts"],
  },
});
