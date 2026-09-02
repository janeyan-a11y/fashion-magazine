"use client";

import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { parseJsonField } from "@/lib/utils";

export function ArticleCard({ article }: { article: any }) {
  const images = parseJsonField<string[]>(article.imageUrls, []);
  const firstImage = images[0] ?? "";

  return (
    <div className="flex gap-4 py-4 group hover:bg-[var(--border)]/30 px-3 -mx-3 rounded-sm transition-colors">
      {/* Thumbnail */}
      {firstImage && (
        <div className="flex-shrink-0 w-[100px] h-[130px] relative rounded-sm overflow-hidden">
          <ImageWithFallback src={firstImage} alt={article.title} fill sizes="100px" />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-serif text-base md:text-lg leading-snug group-hover:translate-x-1 transition-transform">
          {article.title}
        </h3>
        {article.author && (
          <p className="text-xs text-[var(--fg-muted)] mt-1">{article.author}</p>
        )}
        {article.summary && (
          <p className="text-sm text-[var(--fg-muted)] mt-2 line-clamp-2">{article.summary}</p>
        )}
        {article.sourceUrl && (
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-[10px] tracking-wider text-[var(--fg-muted)]/60 hover:text-[var(--fg)] transition-colors"
          >
            查看原文 →
          </a>
        )}
      </div>
    </div>
  );
}