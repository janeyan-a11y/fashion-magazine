import Link from "next/link";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

interface SocialPost {
  id: string;
  title: string;
  authorName: string;
  images: string;
  likeCount: number;
  sourceUrl: string;
}

export function SocialCarousel({ posts }: { posts: SocialPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-20 mb-16">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-serif text-xl tracking-wider">FROM XIAOHONGSHU</h2>
        <span className="text-[10px] tracking-[0.15em] text-[var(--fg-muted)]">小红书精选</span>
      </div>

      <div className="flex gap-4 overflow-x-auto scroll-container pb-4">
        {posts.map((post) => {
          const images = JSON.parse(post.images || "[]") as string[];
          const firstImage = images[0] ?? "";

          return (
            <a
              key={post.id}
              href={post.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-[260px] group"
            >
              <div className="aspect-[4/5] relative rounded-sm overflow-hidden bg-[var(--bg-card)] mb-3">
                <ImageWithFallback src={firstImage} alt={post.title} fill sizes="260px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm font-medium line-clamp-2 group-hover:text-[var(--fg)] transition-colors">
                {post.title}
              </p>
              <p className="text-xs text-[var(--fg-muted)] mt-1">
                {post.authorName} · {post.likeCount > 0 ? `${post.likeCount} 赞` : ""}
              </p>
            </a>
          );
        })}
        <Link
          href="/social"
          className="flex-shrink-0 w-[80px] flex items-center justify-center"
        >
          <span className="text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors tracking-wider">
            全部 →
          </span>
        </Link>
      </div>
    </section>
  );
}