"use client";

import { useState } from "react";
import { COUNTRY_LABELS, CATEGORY_LABELS } from "@/lib/constants";

export type FilterState = {
  country: string | null;
  category: string | null;
};

export function FilterBar({
  onFilterChange,
}: {
  onFilterChange: (filters: FilterState) => void;
}) {
  const [country, setCountry] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const updateCountry = (c: string | null) => {
    const next = c === country ? null : c;
    setCountry(next);
    onFilterChange({ country: next, category });
  };

  const updateCategory = (c: string | null) => {
    const next = c === category ? null : c;
    setCategory(next);
    onFilterChange({ country, category: next });
  };

  return (
    <div className="overflow-x-auto scroll-container">
      <div className="flex gap-2 pb-2 min-w-max">
        <button
          onClick={() => {
            setCountry(null);
            setCategory(null);
            onFilterChange({ country: null, category: null });
          }}
          className={`filter-pill px-4 py-1.5 rounded-full text-xs font-medium tracking-wider border border-[var(--border)] ${
            !country && !category ? "active" : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
          }`}
        >
          All
        </button>
        {Object.entries(COUNTRY_LABELS).map(([code, label]) => (
          <button
            key={code}
            onClick={() => updateCountry(code)}
            className={`filter-pill px-4 py-1.5 rounded-full text-xs font-medium tracking-wider border border-[var(--border)] ${
              country === code ? "active" : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
            }`}
          >
            {label}
          </button>
        ))}
        <span className="w-px bg-[var(--border)] mx-1" />
        {Object.entries(CATEGORY_LABELS).map(([code, label]) => (
          <button
            key={code}
            onClick={() => updateCategory(code)}
            className={`filter-pill px-4 py-1.5 rounded-full text-xs font-medium tracking-wider border border-[var(--border)] ${
              category === code ? "active" : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}