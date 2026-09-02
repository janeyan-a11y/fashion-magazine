"use client";

import Link from "next/link";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { formatIssueDate, getCountryFlag } from "@/lib/utils";

export function Timeline({ magazine }: { magazine: any }) {
  // Group issues by year
  const grouped: Record<string, any[]> = {};
  for (const issue of magazine.issues) {
    const year = issue.issueDate.split("-")[0];
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(issue);
  }

  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors mb-8"
      >
        ← 返回首页
      </Link>

      <div className="mb-12">
        <p className="text-[10px] tracking-[0.2em] text-[var(--fg-muted)] font-medium uppercase mb-2">
          {getCountryFlag(magazine.country)} {magazine.language.toUpperCase()}
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-light mb-2">{magazine.name}</h1>
        {magazine.nameZh && (
          <p className="text-lg text-[var(--fg-muted)] font-serif">{magazine.nameZh}</p>
        )}
        <p className="text-sm text-[var(--fg-muted)] mt-4">
          共 {magazine.issues.length} 期
          {years.length > 0 && ` · ${years[years.length - 1]} — ${years[0]}`}
        </p>
      </div>

      {years.map((year) => (
        <div key={year} className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-serif text-2xl font-light">{year}</span>
            <span className="flex-1 h-px bg-[var(--border)]" />
          </div>
          <div className="flex gap-3 overflow-x-auto scroll-container pb-4">
            {grouped[year].map((issue) => (
              <Link
                key={issue.id}
                href={`/issue/${issue.id}`}
                className="flex-shrink-0 w-[120px] group"
              >
                <div className="aspect-[3/4] relative rounded-sm overflow-hidden magazine-card">
                  <ImageWithFallback
                    src={issue.coverUrl}
                    alt={issue.title ?? issue.issueDate}
                    fill
                    sizes="120px"
                  />
                  {issue.isNew && (
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-white text-black text-[9px] font-bold uppercase rounded-sm">
                      NEW
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--fg-muted)] mt-1.5 text-center">
                  {formatIssueDate(issue.issueDate)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {magazine.websiteUrl && (
        <div className="text-center mt-12 pt-8 border-t border-[var(--border)]">
          <a
            href={magazine.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            访问官网 →
          </a>
        </div>
      )}
    </div>
  );
}