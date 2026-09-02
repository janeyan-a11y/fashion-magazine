"use client";

import { useState } from "react";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { FilterBar, type FilterState } from "@/components/home/FilterBar";
import { CoverGrid } from "@/components/home/CoverGrid";
import { SocialCarousel } from "@/components/home/SocialCarousel";

interface HomeClientProps {
  issues: any[];
  heroIssues: {
    id: string;
    coverUrl: string;
    title: string | null;
    issueDate: string;
    magazine: { name: string; nameZh: string | null };
  }[];
  socialPosts: {
    id: string;
    title: string;
    authorName: string;
    images: string;
    likeCount: number;
    sourceUrl: string;
  }[];
}

export function HomeClient({ issues, heroIssues, socialPosts }: HomeClientProps) {
  const [filters, setFilters] = useState<FilterState>({ country: null, category: null });

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-8">
      <HeroCarousel issues={heroIssues} />

      {/* Sticky filter bar */}
      <div className="sticky top-14 z-40 py-4 bg-[var(--bg)]/90 backdrop-blur-sm">
        <FilterBar onFilterChange={setFilters} />
      </div>

      {/* Cover grid */}
      <section className="mt-8">
        <h2 className="font-serif text-lg tracking-wider mb-6">LATEST ISSUES</h2>
        <CoverGrid issues={issues} filters={filters} />
      </section>

      {/* Social carousel */}
      <SocialCarousel posts={socialPosts} />
    </div>
  );
}