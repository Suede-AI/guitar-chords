/**
 * One source of truth for every breadcrumb trail on the site.
 *
 * The four tool pages each shipped a BreadcrumbList JSON-LD with two ListItems
 * while no page rendered a breadcrumb anywhere in its markup, so the structured
 * data described a navigation the visible page did not carry. Both the schema
 * and the visible <nav aria-label="Breadcrumb"> now read the same trail from
 * here, which is what keeps them from drifting apart again.
 */

export const SITE_ORIGIN = "https://guitarchords.info";

export type Crumb = {
  /** Visible label, and the `name` on the matching ListItem. */
  name: string;
  /** Route-relative href for the visible link, e.g. "/" or "/chords". */
  path: string;
};

/** Absolute URL used by the JSON-LD `item` field. */
export function crumbUrl(path: string): string {
  return path === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${path}`;
}

/** A trail from the home page down to the page being rendered. */
export function trailFor(name: string, path: string): Crumb[] {
  return [
    { name: "Home", path: "/" },
    { name, path },
  ];
}

export function breadcrumbJsonLd(trail: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumbUrl(crumb.path),
    })),
  };
}
