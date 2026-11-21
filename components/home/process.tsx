import { IconBadge } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { revealIndex } from "@/lib/motion";
import { processSteps } from "@/lib/process";

/**
 * Six steps. Below 1024px: vertical timeline with the line on the left.
 * From 1024px: one row joined by a horizontal line.
 */
export function Process() {
  return (
    <Section tone="dark-alt" aria-labelledby="process-title">
      <div className="grid gap-12 xl:grid-cols-12 xl:items-center xl:gap-16">
        <SectionHeading
          tone="dark"
          eyebrow="Our process"
          id="process-title"
          title="A clear path from idea to launch."
          className="xl:col-span-4"
        />

        <ol className="grid gap-8 lg:grid-cols-6 lg:gap-4 xl:col-span-8">
          {processSteps.map((step, index) => (
            <li
              key={step.name}
              data-reveal="" suppressHydrationWarning
              style={revealIndex(index)}
              className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-3 lg:text-center"
            >
              {index < processSteps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-14 -bottom-6 left-6 w-px bg-gold-500/30 lg:top-6 lg:right-[calc(-50%+1.75rem)] lg:bottom-auto lg:left-[calc(50%+1.75rem)] lg:h-px lg:w-auto"
                />
              )}
              <IconBadge name={step.icon} />
              <div className="flex flex-col gap-1 pt-1 lg:pt-0">
                <span aria-hidden="true" className="text-caption font-medium tracking-[0.18em] text-gold-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-sans text-body font-medium text-ivory-50">{step.name}</h3>
                <p className="text-small text-stone-300">{step.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
