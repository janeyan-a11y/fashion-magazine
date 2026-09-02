"use client";

import Link from "next/link";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { parseJsonField } from "@/lib/utils";

export function SocialClient({ posts }: { posts: any[] }) {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs tracking-wider text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors mb-8"
      >
        ← 返回首页
      </Link>

      <h1 className="font-serif text-3xl font-light mb-2">From Xiaohongshu</h1>
      <p className="text-sm text-[var(--fg-muted)] mb-10">小红书精选 · 时尚杂志相关</p>

      {posts.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-serif text-lg text-[var(--fg-muted)]">暂无内容</p>
        </div>
      ) : (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {posts.map((post) => {
            const images = parseJsonField<string[]>(post.images, []);
            const firstImage = images[0] ?? "";

            return (
              <a
                key={post.id}
                href={post.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block break-inside-avoid mb-4 group"
              >
                <div className="relative rounded-sm overflow-hidden">
                  <ImageWithFallback
                    src={firstImage}
                    alt={post.title}
                    className="w-full"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium line-clamp-2">{post.title}</p>
                  <p className="text-xs text-[var(--fg-muted)] mt-1">
                    {post.authorName}
                    {post.likeCount > 0 && ` · ${post.likeCount} 赞`}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}