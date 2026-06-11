import type { MetadataRoute } from "next";

const BASE = "https://guitarchords.info";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/chords`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/scales`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tuner`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/metronome`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/fender-stratocaster-lawsuit`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
