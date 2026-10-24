import type { MetadataRoute } from "next";
import { CHORD_SLUGS } from "@/lib/chords/pages";
import { SCALE_SLUGS } from "@/lib/music/scale-pages";

const BASE = "https://guitarchords.info";

/**
 * Last real content changes from git history, not the build date. Bump a route
 * when its page or dependencies change, and bump the shared date when the root
 * layout changes because every route renders it.
 */
const SHARED_LAYOUT_LAST_MODIFIED = "2026-10-24";

const ROUTE_LAST_MODIFIED = {
  "/": "2026-10-18",
  "/chords": "2026-10-12",
  "/scales": "2026-10-12",
  "/tuner": "2026-10-12",
  "/metronome": "2026-10-12",
  "/ai-instructions": "2026-10-12",
} as const;

/**
 * The per-chord and per-scale reference pages are generated from the chord
 * and scale data, so they share one date: bump it when that data or the two
 * page templates change.
 */
const REFERENCE_PAGES_LAST_MODIFIED = "2026-10-12";

/** The chord template gained its chord-change section on 2026-10-18. */
const CHORD_PAGES_LAST_MODIFIED = "2026-10-18";

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
    // The home page is listed in the form links and browsers use for an
    // origin, with the trailing slash, so the sitemap and the canonical agree.
    { url: `${BASE}/`, lastModified: lastModified("/"), changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/chords`, lastModified: lastModified("/chords"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/scales`, lastModified: lastModified("/scales"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tuner`, lastModified: lastModified("/tuner"), changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/metronome`, lastModified: lastModified("/metronome"), changeFrequency: "yearly", priority: 0.7 },
    // The static source and citation guide (public/ai-instructions.html,
    // served at /ai-instructions by the vercel.json rewrite).
    { url: `${BASE}/ai-instructions`, lastModified: new Date(ROUTE_LAST_MODIFIED["/ai-instructions"]), changeFrequency: "yearly", priority: 0.3 },
    ...CHORD_SLUGS.map((slug) => ({
      url: `${BASE}/chords/${slug}`,
      lastModified: laterOf(CHORD_PAGES_LAST_MODIFIED),
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
