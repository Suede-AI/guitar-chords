import Link from "next/link";
import type { Crumb } from "@/lib/breadcrumbs";

/**
 * The visible half of a page's BreadcrumbList. Both halves are built from the
 * same `trail`, so a crumb cannot appear in the structured data without also
 * appearing on the page.
 */
export function Breadcrumb({
  trail,
  widthClassName,
}: {
  trail: Crumb[];
  widthClassName: string;
}) {
  return (
    <div
      className={`mx-auto ${widthClassName} px-6`}
      style={{ paddingTop: "var(--space-section)" }}
    >
      <nav
        aria-label="Breadcrumb"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-mono-eyebrow)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--color-text-muted)",
        }}
      >
        <ol
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "0.5rem",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {trail.map((crumb, index) => {
            const isCurrent = index === trail.length - 1;
            return (
              <li
                key={crumb.path}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                {isCurrent ? (
                  <span aria-current="page" style={{ color: "var(--color-text)" }}>
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={crumb.path}
                      className="link"
                      style={{ textDecoration: "none" }}
                    >
                      {crumb.name}
                    </Link>
                    <span aria-hidden="true" style={{ color: "var(--color-rule)" }}>
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
