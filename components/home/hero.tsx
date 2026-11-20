import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { heroDelay } from "@/lib/motion";
import { primaryCta, secondaryCta, serviceKeywords, site } from "@/lib/site";

/**
 * Homepage hero. The backdrop is a CSS placeholder until real photography is supplied:
 * drop a `next/image` with `fill priority sizes="100vw"` into the `.hero-media` layer.
 *
 * Entrance (globals.css, ≈1.6s): media → overlay → eyebrow → headline lines → copy → CTAs → keywords + header.
 */
export function Hero() {
  return (
    <section
      data-hero
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh overflow-hidden bg-charcoal-950"
    >
      {/* Media layer (placeholder) */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="hero-media absolute inset-0">
          <div className="absolute inset-0 bg-warm-light" />
          <div className="absolute top-1/2 left-[62%] hidden size-[min(44vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/20 md:block" />
        </div>
        {/* Readability overlay, strongest behind the copy */}
        <div className="hero-overlay absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-r from-charcoal-950 via-charcoal-950/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-charcoal-950 to-transparent" />
        </div>
      </div>

      <Container className="flex flex-col justify-end pt-[calc(var(--header-height)+3rem)] pb-14 md:justify-center md:pb-20">
        <div className="flex max-w-[44rem] flex-col items-start gap-6 md:gap-8">
          <div className="hero-rise" style={heroDelay(300)}>
            <Eyebrow pill>Digital Growth Studio</Eyebrow>
          </div>

          <h1 id="hero-title" className="max-w-[13ch] text-display md:max-w-[16ch] text-ivory-50">
            {/* Each line rises out of its own mask; the heading text is unchanged. */}
            <span className="hero-line">
              <span style={heroDelay(420)}>Your business deserves </span>
            </span>
            <span className="hero-line">
              <span style={heroDelay(540)}>a better digital experience.</span>
            </span>
          </h1>

          <p className="hero-rise max-w-[34rem] text-body-lg text-ivory-50/85" style={heroDelay(800)}>
            {site.description}
          </p>

          <div
            className="hero-rise flex w-full flex-col gap-3 min-[30rem]:w-auto min-[30rem]:flex-row min-[30rem]:items-center min-[30rem]:gap-4"
            style={heroDelay(950)}
          >
            <ButtonLink href={primaryCta.href} size="lg" arrow>
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href={secondaryCta.href} size="lg" variant="outline-light">
              {secondaryCta.label}
            </ButtonLink>
          </div>

          <ul
            aria-label="What we build"
            style={heroDelay(1100)}
            className="hero-fade mt-2 flex w-full items-center justify-between text-[0.6875rem] font-medium tracking-[0.12em] text-ivory-50/75 uppercase sm:w-auto sm:justify-start sm:gap-x-3 sm:text-caption sm:tracking-[0.2em]"
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
