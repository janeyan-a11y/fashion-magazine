"use client";

import { MagazineCard } from "./MagazineCard";
import type { FilterState } from "./FilterBar";

interface Issue {
  id: string;
  issueDate: string;
  coverUrl: string;
  title: string | null;
  isNew: boolean;
  magazine: {
    name: string;
    slug: string;
    country: string;
    category: string;
    sortOrder: number;
  };
}

export function CoverGrid({
  issues,
  filters,
}: {
  issues: Issue[];
  filters: FilterState;
}) {
  const filtered = issues.filter((issue) => {
    if (filters.country && issue.magazine.country !== filters.country) return false;
    if (filters.category && issue.magazine.category !== filters.category) return false;
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-serif text-lg text-[var(--fg-muted)]">暂无符合筛选条件的内容</p>
      </div>
    );
  }

  // Identify spotlight magazines: Vogue, BAZAAR — they get large cards
  const spotlightSlugs = ["vogue-china", "vogue-us", "bazaar-china", "gq-china"];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
      {filtered.map((issue, index) => (
        <MagazineCard
          key={issue.id}
          id={issue.id}
          coverUrl={issue.coverUrl}
          magazineName={issue.magazine.name}
          magazineSlug={issue.magazine.slug}
          issueDate={issue.issueDate}
          title={issue.title}
          country={issue.magazine.country}
          isNew={issue.isNew}
          isLarge={spotlightSlugs.includes(issue.magazine.slug) && index < 4}
          delay={index * 50}
        />
      ))}
    </div>
  );
}