"use client";

import Link from "next/link";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { ArticleCard } from "@/components/issue/ArticleCard";
import { formatIssueDate, getCountryFlag } from "@/lib/utils";

interface IssueDetailProps {
  issue: any;
  prevIssues: { id: string; issueDate: string; coverUrl: string; title: string | null }[];
}

export function IssueDetail({ issue, prevIssues }: IssueDetailProps) {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors mb-8"
      >
        ← 返回首页
      </Link>

      {/* Cover + Info */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-16">
        {/* Cover */}
        <div className="flex-shrink-0 w-full md:w-[320px]">
          <div className="aspect-[3/4] relative rounded-sm overflow-hidden shadow-2xl">
            <ImageWithFallback
              src={issue.coverUrl}
              alt={issue.title ?? issue.magazine.name}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              priority
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 pt-4">
          <p className="text-[10px] tracking-[0.2em] text-[var(--fg-muted)] font-medium uppercase mb-2">
            {getCountryFlag(issue.magazine.country)} {issue.magazine.name}
            {issue.magazine.nameZh && (
              <span className="ml-1 text-[var(--fg-muted)]/60">· {issue.magazine.nameZh}</span>
            )}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-light mb-3">
            {issue.title ?? formatIssueDate(issue.issueDate)}
          </h1>
          <p className="text-sm text-[var(--fg-muted)] mb-2">
            {formatIssueDate(issue.issueDate)}
          </p>
          {issue.description && (
            <p className="text-sm text-[var(--fg-muted)]/80 leading-relaxed mt-4 max-w-lg">
              {issue.description}
            </p>
          )}
          <Link
            href={`/magazine/${issue.magazine.slug}`}
            className="inline-block mt-6 text-xs tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            查看往期 →
          </Link>
        </div>
      </div>

      {/* Articles */}
      {issue.articles.length > 0 && (
        <section>
          <div className="border-t border-[var(--border)] pt-8 mb-6">
            <h2 className="font-serif text-lg tracking-wider">本期内容</h2>
          </div>
          <div className="space-y-px">
            {issue.articles.map((article: any) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Previous issues */}
      {prevIssues.length > 0 && (
        <section className="mt-16">
          <div className="border-t border-[var(--border)] pt-8 mb-6">
            <h2 className="font-serif text-lg tracking-wider">往期封面</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto scroll-container pb-4">
            {prevIssues.map((pi) => (
              <Link
                key={pi.id}
                href={`/issue/${pi.id}`}
                className="flex-shrink-0 w-[100px] group"
              >
                <div className="aspect-[3/4] relative rounded-sm overflow-hidden magazine-card">
                  <ImageWithFallback
                    src={pi.coverUrl}
                    alt={pi.title ?? pi.issueDate}
                    fill
                    sizes="100px"
                  />
                </div>
                <p className="text-[10px] text-[var(--fg-muted)] mt-1.5 text-center truncate">
                  {formatIssueDate(pi.issueDate)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}