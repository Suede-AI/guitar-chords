// Tailwind v4 reads its theme primarily from globals.css via @theme.
// This file exists for editor/tooling that still looks for a config object
// and to declare the content glob for stable IntelliSense.
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
};

export default config;
