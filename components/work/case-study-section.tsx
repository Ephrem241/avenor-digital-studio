import type { ReactNode } from "react";

type CaseStudySectionProps = {
  label: string;
  children: ReactNode;
};

/** Editorial row: label on the left, text on the right; stacked on small screens. */
export function CaseStudySection({ label, children }: CaseStudySectionProps) {
  return (
    <div data-reveal="" className="grid gap-4 border-t border-ivory-200 py-10 md:grid-cols-12 md:gap-8 lg:py-14">
      <h2 className="font-sans text-small font-medium tracking-[0.18em] text-gold-700 uppercase md:col-span-4 lg:col-span-3">
        {label}
      </h2>
      <div className="flex flex-col gap-4 text-body-lg text-charcoal-950 md:col-span-8 lg:col-span-7">{children}</div>
    </div>
  );
}
