"use client";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-14 glass border-b border-[var(--border)]">
      <div className="max-w-[1440px] mx-auto h-full px-6 flex items-center justify-between">
        <Link href="/" className="font-serif text-lg tracking-[0.2em] text-[var(--fg)]">
          THE ARCHIVE
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/social"
            className="text-xs font-medium tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            XIAOHONGSHU
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}