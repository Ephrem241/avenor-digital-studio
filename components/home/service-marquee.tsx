import { marqueeKeywords } from "@/lib/site";

const COPIES = 4;

function KeywordList({ copy }: { copy: number }) {
  const hidden = copy > 0;
  return (
    <ul
      aria-label={hidden ? undefined : "Our services"}
      aria-hidden={hidden || undefined}
      data-marquee-copy={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {marqueeKeywords.map((word) => (
        <li key={word} className="flex items-center whitespace-nowrap">
          <span className="px-6 font-serif text-h3 text-ivory-50 md:px-10">{word}</span>
          <span aria-hidden="true" className="text-h4 text-gold-500">
            ·
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Continuous service ticker. Four identical copies move by one copy width per loop,
 * so there is no seam on wide screens. Only the first copy is exposed to assistive tech.
 * Pauses on hover and focus; static under reduced motion (see globals.css).
 */
export function ServiceMarquee() {
  return (
    <div className="marquee overflow-hidden border-y border-ivory-50/10 bg-charcoal-900 py-6 md:py-8">
      <div className="marquee-track flex w-max">
        {Array.from({ length: COPIES }, (_, copy) => (
          <KeywordList key={copy} copy={copy} />
        ))}
      </div>
    </div>
  );
}
