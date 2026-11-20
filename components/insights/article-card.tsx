import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DraftPill } from "@/components/content/draft-pill";
import { cn } from "@/lib/cn";
import {
  articleIndustryLabels,
  articleReadingMinutes,
  formatArticleDate,
  type Article,
} from "@/lib/insights";

export function ArticleCard({ article, className }: { article: Article; className?: string }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className={cn(
        "group flex h-full flex-col gap-4 rounded-card border border-ivory-200 bg-white p-6 text-charcoal-950 transition-[border-color] duration-200 ease-standard hover:border-gold-500/60 md:p-7",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-caption font-medium tracking-[0.18em] text-gold-700 uppercase">
          {articleIndustryLabels[article.industry]}
        </span>
        {!article.published && <DraftPill tone="light" />}
      </div>
      <h2 className="font-serif text-h4 transition-[translate] duration-[550ms] ease-standard group-hover:translate-x-0.5">
        {article.title}
      </h2>
      <p className="text-small text-stone-500">{article.description}</p>
      <div className="mt-auto flex items-center justify-between gap-4 pt-2 text-caption text-stone-500">
        <span>
          <time dateTime={article.date}>{formatArticleDate(article.date)}</time> · {articleReadingMinutes(article)} min
          read
        </span>
        <ArrowRight
          aria-hidden="true"
          className="size-5 shrink-0 text-gold-700 transition-transform duration-200 ease-standard group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}
