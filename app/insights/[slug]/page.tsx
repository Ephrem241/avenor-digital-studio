import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DraftPill } from "@/components/content/draft-pill";
import { RichText } from "@/components/content/rich-text";
import { PageHero } from "@/components/layout/page-hero";
import { CtaSection } from "@/components/shared/cta-section";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import {
  articleIndustryLabels,
  articleReadingMinutes,
  articles,
  formatArticleDate,
  getVisibleArticle,
} from "@/lib/insights";
import { getServices } from "@/lib/services";

/**
 * Every slug is listed, drafts included: with Cache Components an empty list is a build
 * error. Drafts that aren't visible on this deployment render the 404 page.
 */
export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getVisibleArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    // Second safeguard: drafts shown on preview deployments are never indexed.
    ...(article.published ? {} : { robots: { index: false, follow: false } }),
  };
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = getVisibleArticle(slug);
  if (!article) notFound();

  const services = getServices(article.serviceSlugs);

  return (
    <>
      <PageHero
        eyebrow={articleIndustryLabels[article.industry]}
        title={article.title}
        intro={article.description}
        breadcrumbs={[
          { label: "Insights", href: "/insights" },
          { label: article.title, href: `/insights/${article.slug}` },
        ]}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-small text-stone-300">
          <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{articleReadingMinutes(article)} min read</span>
          {!article.published && <DraftPill label="Draft: not visible in production" />}
        </div>
      </PageHero>

      <Section tone="light">
        <article>
          <RichText blocks={article.blocks} />
        </article>
      </Section>

      {services.length > 0 && (
        <Section tone="light-alt" aria-labelledby="related-services-title" className="py-12! md:py-16!">
          <div className="flex flex-col gap-4">
            <h2 id="related-services-title" className="font-sans text-small font-medium tracking-[0.18em] text-gold-700 uppercase">
              Related services
            </h2>
            <ul className="flex flex-wrap gap-x-8 gap-y-1">
              {services.map((service) => (
                <li key={service.slug}>
                  <ButtonLink href={`/services#${service.slug}`} variant="text-dark" arrow>
                    {service.name}
                  </ButtonLink>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      <CtaSection title="Want help with your own website?" />
    </>
  );
}
