import type { MetadataRoute } from "next";
import { CHORD_SLUGS } from "@/lib/chords/pages";
import { SCALE_SLUGS } from "@/lib/music/scale-pages";

const BASE = "https://guitarchords.info";

/**
 * Last real content changes from git history, not the build date. Bump a route
 * when its page or dependencies change, and bump the shared date when the root
 * layout changes because every route renders it.
 */
const SHARED_LAYOUT_LAST_MODIFIED = "2026-09-05";

const ROUTE_LAST_MODIFIED = {
  "/": "2026-09-03",
  "/chords": "2026-10-11",
  "/scales": "2026-10-11",
  "/tuner": "2026-09-05",
  "/metronome": "2026-09-05",
} as const;

/**
 * The per-chord and per-scale reference pages are generated from the chord
 * and scale data, so they share one date: bump it when that data or the two
 * page templates change.
 */
const REFERENCE_PAGES_LAST_MODIFIED = "2026-10-11";

type Route = keyof typeof ROUTE_LAST_MODIFIED;

function laterOf(date: string): Date {
  return new Date(
    Math.max(Date.parse(date), Date.parse(SHARED_LAYOUT_LAST_MODIFIED)),
  );
}

function lastModified(route: Route): Date {
  return laterOf(ROUTE_LAST_MODIFIED[route]);
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: lastModified("/"), changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/chords`, lastModified: lastModified("/chords"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/scales`, lastModified: lastModified("/scales"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tuner`, lastModified: lastModified("/tuner"), changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/metronome`, lastModified: lastModified("/metronome"), changeFrequency: "yearly", priority: 0.7 },
    ...CHORD_SLUGS.map((slug) => ({
      url: `${BASE}/chords/${slug}`,
      lastModified: laterOf(REFERENCE_PAGES_LAST_MODIFIED),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...SCALE_SLUGS.map((slug) => ({
      url: `${BASE}/scales/${slug}`,
      lastModified: laterOf(REFERENCE_PAGES_LAST_MODIFIED),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
