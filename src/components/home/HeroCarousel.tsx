"use client";

import { useState, useEffect, useCallback } from "react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import Link from "next/link";

interface HeroIssue {
  id: string;
  coverUrl: string;
  title: string | null;
  issueDate: string;
  magazine: {
    name: string;
    nameZh: string | null;
  };
}

export function HeroCarousel({ issues }: { issues: HeroIssue[] }) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning]
  );

  useEffect(() => {
    if (issues.length <= 1) return;
    const timer = setInterval(() => {
      goTo((current + 1) % issues.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [current, issues.length, goTo]);

  if (issues.length === 0) return null;

  const issue = issues[current];
  const dateStr = issue.issueDate.replace("-", "年") + "月号";

  return (
    <div className="relative overflow-hidden mb-16">
      <div className="flex items-center gap-8 md:gap-12 lg:gap-16 min-h-[50vh] md:min-h-[60vh]">
        {/* Cover image */}
        <Link
          href={`/issue/${issue.id}`}
          className="flex-shrink-0 w-[200px] md:w-[280px] lg:w-[320px] relative"
        >
          <div className="aspect-[3/4] relative shadow-2xl">
            <ImageWithFallback
              src={issue.coverUrl}
              alt={issue.title ?? issue.magazine.name}
              fill
              sizes="(max-width: 768px) 200px, 320px"
              priority
            />
          </div>
        </Link>

        {/* Text content */}
        <div className="flex-1">
          <p className="text-[10px] md:text-xs tracking-[0.2em] text-[var(--fg-muted)] font-medium uppercase mb-3">
            {issue.magazine.name}
            {issue.magazine.nameZh && (
              <span className="ml-2 text-[var(--fg-muted)]/60">· {issue.magazine.nameZh}</span>
            )}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light leading-none mb-4">
            NEW ARRIVALS
          </h2>
          <p className="text-sm md:text-base text-[var(--fg-muted)] mb-2">{dateStr}</p>
          {issue.title && (
            <p className="text-lg md:text-xl font-serif italic text-[var(--fg-muted)]">
              {issue.title}
            </p>
          )}
        </div>
      </div>

      {/* Controls */}
      {issues.length > 1 && (
        <div className="flex gap-3 mt-6">
          {issues.slice(0, 5).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-px transition-all duration-500 ${
                i === current ? "w-12 bg-[var(--fg)]" : "w-6 bg-[var(--border)]"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}