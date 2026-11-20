import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";
import type { NavItem } from "@/lib/site";
import { Breadcrumbs } from "./breadcrumbs";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Trail after Home; the last item is this page. */
  breadcrumbs?: NavItem[];
  /** Buttons or links under the intro. */
  actions?: ReactNode;
  /** Extra content under the actions, such as a facts row. */
  children?: ReactNode;
  className?: string;
};

/**
 * Opening band for inner pages: charcoal with the warm-light treatment fading in
 * from the right, serif H1, and room for the fixed header above.
 */
export function PageHero({ eyebrow, title, intro, breadcrumbs, actions, children, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-charcoal-950 pt-[calc(var(--header-height)+3rem)] pb-16 text-ivory-50 md:pt-[calc(var(--header-height)+4rem)] md:pb-20 lg:pt-[calc(var(--header-height)+5rem)] lg:pb-28",
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-warm-light opacity-70" />
        <div className="absolute inset-0 bg-linear-to-r from-charcoal-950 via-charcoal-950/85 to-charcoal-950/40" />
      </div>

      <Container>
        <div className="flex flex-col gap-8">
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          <div data-reveal="" className="flex max-w-[52rem] flex-col items-start gap-5">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1 className="max-w-[18ch] text-h1 text-ivory-50">{title}</h1>
            {intro && <p className="reading-width text-body-lg text-ivory-50/80">{intro}</p>}
            {actions && <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">{actions}</div>}
          </div>
          {children}
        </div>
      </Container>
    </section>
  );
}
