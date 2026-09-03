import type { MetadataRoute } from "next";

const BASE = "https://guitarchords.info";

/**
 * Last real content change per route, from the git history of the files that
 * render it (the page plus the components and lib it pulls in) — not the build
 * date, which would claim every page changed on every deploy.
 *
 * Bump the entry for a route when you change what that route says.
 */
const LAST_MODIFIED: Record<string, string> = {
  "/": "2026-08-31",
  "/chords": "2026-07-16",
  "/scales": "2026-07-16",
  "/tuner": "2026-07-16",
  "/metronome": "2026-07-16",
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(LAST_MODIFIED["/"]), changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/chords`, lastModified: new Date(LAST_MODIFIED["/chords"]), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/scales`, lastModified: new Date(LAST_MODIFIED["/scales"]), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tuner`, lastModified: new Date(LAST_MODIFIED["/tuner"]), changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/metronome`, lastModified: new Date(LAST_MODIFIED["/metronome"]), changeFrequency: "yearly", priority: 0.7 },
  ];
}
