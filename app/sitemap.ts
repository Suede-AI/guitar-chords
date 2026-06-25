import type { MetadataRoute } from "next";

const BASE = "https://guitarchords.info";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date('2026-06-01'), changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/chords`, lastModified: new Date('2026-06-01'), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/scales`, lastModified: new Date('2026-06-01'), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tuner`, lastModified: new Date('2026-06-01'), changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/metronome`, lastModified: new Date('2026-06-01'), changeFrequency: "yearly", priority: 0.7 },
  ];
}
