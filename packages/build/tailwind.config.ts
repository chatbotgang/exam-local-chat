import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "../app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
