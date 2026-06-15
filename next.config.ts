import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin Turbopack's workspace root to this project so it doesn't walk up to a
  // stray lockfile in the home directory.
  turbopack: {
    root: path.resolve("."),
  },
  // Editorial lives on the hub (guitarhub.org), tools live here. The Fender
  // explainer moved to GuitarHub; 301 the old path so we never run duplicate
  // content across the two sites.
  async redirects() {
    return [
      {
        source: "/fender-stratocaster-lawsuit",
        destination: "https://guitarhub.org/fender-stratocaster-lawsuit",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
