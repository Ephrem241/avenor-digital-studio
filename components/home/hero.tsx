import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { primaryCta, secondaryCta, serviceKeywords, site } from "@/lib/site";

/**
 * Homepage hero. The backdrop is a CSS placeholder until real photography is supplied:
 * drop a `next/image` with `fill priority sizes="100vw"` into the media layer.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-svh overflow-hidden bg-charcoal-950">
      {/* Media layer (placeholder) */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_78%_38%,rgb(185_154_105/0.45),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_90%_85%,rgb(128_103_68/0.35),transparent_70%)]" />
        <div className="absolute top-1/2 left-[62%] hidden size-[min(44vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/20 md:block" />
        {/* Readability overlay, strongest behind the copy */}
        <div className="absolute inset-0 bg-linear-to-r from-charcoal-950 via-charcoal-950/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-charcoal-950 to-transparent" />
      </div>

      <Container className="flex flex-col justify-end pt-[calc(var(--header-height)+3rem)] pb-14 md:justify-center md:pb-20">
        <div className="flex max-w-[44rem] flex-col items-start gap-6 md:gap-8">
          <Eyebrow pill>Digital Growth Studio</Eyebrow>

          <h1 id="hero-title" className="max-w-[13ch] text-display md:max-w-[16ch] text-ivory-50">
            Your business deserves a better digital experience.
          </h1>

          <p className="max-w-[34rem] text-body-lg text-ivory-50/85">{site.description}</p>

          <div className="flex w-full flex-col gap-3 min-[25rem]:w-auto min-[25rem]:flex-row min-[25rem]:items-center min-[25rem]:gap-4">
            <ButtonLink href={primaryCta.href} size="lg" arrow>
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href={secondaryCta.href} size="lg" variant="outline-light">
              {secondaryCta.label}
            </ButtonLink>
          </div>

          <ul
            aria-label="What we build"
            className="mt-2 flex w-full items-center justify-between text-[0.6875rem] font-medium tracking-[0.12em] text-ivory-50/75 uppercase sm:w-auto sm:justify-start sm:gap-x-3 sm:text-caption sm:tracking-[0.2em]"
          >
            {serviceKeywords.map((word, index) => (
              <li key={word} className="flex items-center gap-3">
                {index > 0 && (
                  <span aria-hidden="true" className="hidden text-gold-500 sm:inline">
                    ·
                  </span>
                )}
                {word}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
