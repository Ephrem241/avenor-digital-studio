import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { ContentBlock, InlineText } from "@/lib/content-blocks";

const linkClass =
  "text-charcoal-950 underline decoration-gold-700/60 underline-offset-4 transition-colors hover:text-gold-700 hover:decoration-gold-700";

function renderInline(text: InlineText): ReactNode {
  if (typeof text === "string") return text;
  return text.map((part, index) => {
    if (typeof part === "string") return part;
    if ("placeholder" in part) {
      return (
        <mark key={index} className="rounded-sm bg-gold-500/20 px-1 text-charcoal-950">
          [{part.placeholder}]
        </mark>
      );
    }
    const external = /^https?:\/\//.test(part.href);
    if (external || part.href.startsWith("mailto:")) {
      return (
        <a
          key={index}
          href={part.href}
          className={linkClass}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {part.text}
          {external && <span className="sr-only"> (opens in a new tab)</span>}
        </a>
      );
    }
    return (
      <Link key={index} href={part.href} className={linkClass}>
        {part.text}
      </Link>
    );
  });
}

type RichTextProps = {
  blocks: ContentBlock[];
  /** `article` uses the large body size; `legal` the standard one. */
  size?: "article" | "legal";
  className?: string;
};

/** Long-form text on ivory at reading width. Typed blocks in, React elements out. */
export function RichText({ blocks, size = "article", className }: RichTextProps) {
  const body = size === "article" ? "text-body-lg" : "text-body";

  return (
    <div className={cn("reading-width flex flex-col gap-5 text-charcoal-950/85", body, className)}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={index} className="mt-8 text-h3 text-charcoal-950 first:mt-0">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={index} className="mt-4 text-h4 text-charcoal-950">
                {block.text}
              </h3>
            );
          case "ul":
          case "ol": {
            const List = block.type;
            return (
              <List
                key={index}
                className={cn(
                  "flex flex-col gap-2 pl-6 marker:text-gold-700",
                  block.type === "ul" ? "list-disc" : "list-decimal",
                )}
              >
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="pl-1">
                    {renderInline(item)}
                  </li>
                ))}
              </List>
            );
          }
          case "note":
            return (
              <p key={index} className="border-l-2 border-gold-500 bg-ivory-100 px-5 py-4 text-body">
                {renderInline(block.text)}
              </p>
            );
          default:
            return <p key={index}>{renderInline(block.text)}</p>;
        }
      })}
    </div>
  );
}
