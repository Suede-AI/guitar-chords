import type { MetadataRoute } from "next";

const BASE = "https://guitarchords.info";

/**
 * Last real content changes from git history, not the build date. Bump a route
 * when its page or dependencies change, and bump the shared date when the root
 * layout changes because every route renders it.
 */
const SHARED_LAYOUT_LAST_MODIFIED = "2026-09-03";

const ROUTE_LAST_MODIFIED = {
  "/": "2026-09-03",
  "/chords": "2026-09-03",
  "/scales": "2026-09-03",
  "/tuner": "2026-09-03",
  "/metronome": "2026-09-03",
} as const;

type Route = keyof typeof ROUTE_LAST_MODIFIED;

function lastModified(route: Route): Date {
  return new Date(
    Math.max(
      Date.parse(ROUTE_LAST_MODIFIED[route]),
      Date.parse(SHARED_LAYOUT_LAST_MODIFIED),
    ),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: lastModified("/"), changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/chords`, lastModified: lastModified("/chords"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/scales`, lastModified: lastModified("/scales"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tuner`, lastModified: lastModified("/tuner"), changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/metronome`, lastModified: lastModified("/metronome"), changeFrequency: "yearly", priority: 0.7 },
  ];
}
