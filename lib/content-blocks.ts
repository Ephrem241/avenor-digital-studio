/**
 * Typed long-form content used by Insights articles and the legal pages.
 * Rendered by components/content/rich-text.tsx as React elements only (no raw HTML).
 */

/** A piece of inline text: plain, a link, or a visible marker for a missing fact. */
export type Inline = string | { text: string; href: string } | { placeholder: string };

/** One paragraph or list item. */
export type InlineText = string | Inline[];

export type ContentBlock =
  | { type: "p"; text: InlineText }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: InlineText[] }
  | { type: "ol"; items: InlineText[] }
  | { type: "note"; text: InlineText };

function inlineWords(text: InlineText): string {
  if (typeof text === "string") return text;
  return text
    .map((part) => (typeof part === "string" ? part : "text" in part ? part.text : part.placeholder))
    .join("");
}

/** Plain text of a block list, for word counts and descriptions. */
export function blocksToText(blocks: ContentBlock[]): string {
  return blocks
    .map((block) => ("items" in block ? block.items.map(inlineWords).join(" ") : inlineWords(block.text)))
    .join(" ");
}

/** Reading time at roughly 200 words a minute, at least one minute. */
export function readingMinutes(blocks: ContentBlock[]): number {
  const words = blocksToText(blocks).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** "21 November 2026" from an ISO date, fixed to UTC so server and build agree. */
export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
