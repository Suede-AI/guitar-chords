// Page titles and the per-page WebPage node, shared by every route.
//
// Titles lead with the page's own keyword (the chord or scale name, or the
// tool) and carry the " | guitarchords.info" brand only when the whole title
// still fits in TITLE_MAX characters, so search results show it untruncated.
// Pages pass the result as `title: { absolute }` so the layout template cannot
// append the brand a second time.

import { SITE_ORIGIN, crumbUrl } from "./breadcrumbs";

export { SITE_ORIGIN };

export const BRAND_SUFFIX = " | guitarchords.info";
export const TITLE_MAX = 65;

export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
export const APP_ID = `${SITE_ORIGIN}/#app`;
export const SUEDE_ORG_ID = "https://suedeai.ai/#organization";
export const JASON_PERSON_ID = "https://suedeai.ai/founder#person";

/** The keyword-first title, with the brand appended when it fits. */
export function pageTitle(primary: string): string {
  const branded = `${primary}${BRAND_SUFFIX}`;
  return branded.length <= TITLE_MAX ? branded : primary;
}

/** "minor pentatonic" -> "Minor Pentatonic"; "C# minor" -> "C# Minor". */
export function titleCase(text: string): string {
  return text.replace(/(^|\s)([a-z])/g, (_, space: string, letter: string) => `${space}${letter.toUpperCase()}`);
}

type WebPageType = "WebPage" | "CollectionPage";

/**
 * One WebPage (or CollectionPage) node for the route, tied to the shared
 * WebSite, Organization and Person nodes by @id. It restates nothing about
 * those entities; the root layout and suedeai.ai own them.
 */
export function webPageJsonLd({
  path,
  name,
  description,
  type = "WebPage",
}: {
  path: string;
  name: string;
  description: string;
  type?: WebPageType;
}) {
  // The home page is canonical with its trailing slash, the form a browser
  // and the sitemap both use for an origin.
  const url = path === "/" ? `${SITE_ORIGIN}/` : crumbUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": SUEDE_ORG_ID },
    author: { "@id": JASON_PERSON_ID },
    image: `${SITE_ORIGIN}/opengraph-image`,
  };
}
