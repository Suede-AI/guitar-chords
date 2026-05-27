import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin Turbopack's workspace root to this project so it doesn't walk up to a
  // stray lockfile in the home directory.
  turbopack: {
    root: path.resolve("."),
  },
};

export default nextConfig;
