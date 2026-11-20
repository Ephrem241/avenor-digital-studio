import { ogContentType, ogSize, renderOgCard } from "@/lib/og";
import { articleIndustryLabels, articles } from "@/lib/insights";
import { site } from "@/lib/site";

export const alt = `${site.name} insights article`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

/** Uses the full article list so drafts on preview deployments still get a card. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  return renderOgCard({
    eyebrow: article ? `Insights · ${articleIndustryLabels[article.industry]}` : "Insights",
    title: article?.title ?? site.name,
  });
}
