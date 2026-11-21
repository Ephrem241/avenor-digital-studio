import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { principles } from "@/lib/about";
import { revealIndex } from "@/lib/motion";

export function Principles() {
  return (
    <Section tone="light-alt" aria-labelledby="principles-title">
      <div className="flex flex-col gap-12 lg:gap-16">
        <SectionHeading eyebrow="How we work" id="principles-title" title="What you can expect from us." />

        <ol className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, index) => (
            <li
              key={principle.title}
              data-reveal="" suppressHydrationWarning
              style={revealIndex(index)}
              className="flex flex-col gap-3 border-t border-ivory-200 pt-6"
            >
              <span aria-hidden="true" className="text-caption font-medium tracking-[0.18em] text-gold-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h4 text-charcoal-950">{principle.title}</h3>
              <p className="text-body text-stone-500">{principle.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
