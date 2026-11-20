import type { Metadata } from "next";
import { ArticleCard } from "@/components/insights/article-card";
import { PageHero } from "@/components/layout/page-hero";
import { CtaSection } from "@/components/shared/cta-section";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { getVisibleArticles } from "@/lib/insights";
import { revealIndex } from "@/lib/motion";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description:
    "Practical advice for hotels, guesthouses, salons and barbershops on websites, bookings and handling customer enquiries.",
  path: "/insights",
});

export default function InsightsPage() {
  const articles = getVisibleArticles();

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Notes for hospitality and beauty businesses."
        intro="Practical advice on websites, bookings and enquiries, drawn from the projects we work on."
        breadcrumbs={[{ label: "Insights", href: "/insights" }]}
      />

      <Section tone="light-alt" aria-label="Articles">
        {articles.length > 0 ? (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <li key={article.slug} data-reveal="" style={revealIndex(index)}>
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>
        ) : (
          <div data-reveal="" className="flex max-w-[40rem] flex-col items-start gap-5">
            <p className="text-h4 font-serif text-charcoal-950">
              Articles for hospitality and beauty businesses are on the way.
            </p>
            <p className="text-body-lg text-stone-500">
              In the meantime, you can read about what we build or look at our recent projects.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <ButtonLink href="/services" variant="text-dark" arrow>
                View Services
              </ButtonLink>
              <ButtonLink href="/work" variant="text-dark" arrow>
                Explore Our Work
              </ButtonLink>
            </div>
          </div>
        )}
      </Section>

      <CtaSection title="Have a question about your own website?" secondary={null} />
    </>
  );
}
