import { Check } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { Section, type SectionTone } from "@/components/ui/section";
import type { Service } from "@/lib/services";

type ServiceDetailProps = {
  service: Service;
  index: number;
  tone?: SectionTone;
};

/** One service on /services. The section id is the service slug, so /services#<slug> lands here. */
export function ServiceDetail({ service, index, tone = "light" }: ServiceDetailProps) {
  const titleId = `${service.slug}-title`;

  return (
    <Section id={service.slug} tone={tone} aria-labelledby={titleId}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div data-reveal="" className="flex flex-col items-start gap-5 lg:col-span-5">
          <div className="flex items-center gap-4">
            <Icon name={service.icon} className="size-9 text-gold-700" />
            <span aria-hidden="true" className="text-caption font-medium tracking-[0.18em] text-gold-700">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <h2 id={titleId} className="max-w-[16ch] text-h2 text-charcoal-950">
            {service.name}
          </h2>
          <p className="text-body-lg text-stone-500">{service.description}</p>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-6 lg:col-start-7 lg:pt-14">
          <div className="flex flex-col gap-4">
            <h3 className="font-sans text-small font-medium tracking-[0.18em] text-charcoal-950 uppercase">
              What&apos;s included
            </h3>
            <ul className="flex flex-col border-t border-ivory-200">
              {service.deliverables.map((item) => (
                <li key={item} className="flex gap-3 border-b border-ivory-200 py-4 text-body text-charcoal-950">
                  <Check aria-hidden="true" strokeWidth={1.6} className="mt-1 size-4 shrink-0 text-gold-700" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2 border-l-2 border-gold-500 pl-5">
            <h3 className="font-sans text-small font-medium tracking-[0.18em] text-charcoal-950 uppercase">
              What it changes
            </h3>
            <p className="text-body text-stone-500">{service.value}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
