import Link from "next/link";
import { Fragment } from "react";

// Renders a notes paragraph, turning [text](href) into links. Internal paths
// use next/link; external links open in a new tab.
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

export function NoteText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    parts.push(
      href.startsWith("/") ? (
        <Link key={index} href={href} className="link">
          {label}
        </Link>
      ) : (
        <a key={index} href={href} className="link" target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      ),
    );
    last = index + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <Fragment>{parts}</Fragment>;
}
