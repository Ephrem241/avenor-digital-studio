import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { primaryCta, secondaryCta, type NavItem } from "@/lib/site";

type CtaSectionProps = {
  id?: string;
  title?: string;
  body?: string;
  primary?: NavItem;
  secondary?: NavItem | null;
};

/**
 * Full-bleed closing call to action. The backdrop is the shared warm-light stand-in;
 * a `next/image` with `fill sizes="100vw"` can replace it in the media layer.
 */
export function CtaSection({
  id = "cta-title",
  title = "Ready to improve your digital presence?",
  body = "Tell us where your business is today and where you want it to go. We'll help you plan the next step.",
  primary = primaryCta,
  secondary = secondaryCta,
}: CtaSectionProps) {
  return (
    <section aria-labelledby={id} className="section-spacing relative isolate overflow-hidden bg-charcoal-950">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-warm-light" />
        <div className="absolute inset-0 bg-linear-to-r from-charcoal-950 via-charcoal-950/70 to-charcoal-950/10" />
      </div>

      <Container>
        <div data-reveal="" suppressHydrationWarning className="flex max-w-[40rem] flex-col items-start gap-6">
          <h2 id={id} className="max-w-[16ch] text-h2 text-ivory-50">
            {title}
          </h2>
          <p className="text-body-lg text-ivory-50/85">{body}</p>
          <div className="mt-2 flex w-full flex-col gap-3 min-[25rem]:w-auto min-[25rem]:flex-row min-[25rem]:items-center min-[25rem]:gap-6">
            <ButtonLink href={primary.href} size="lg" arrow>
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} variant="text-light" className="self-center min-[25rem]:self-auto">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
