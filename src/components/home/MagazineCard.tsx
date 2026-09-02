import Link from "next/link";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { getCountryFlag, formatIssueDate } from "@/lib/utils";

interface MagazineCardProps {
  id: string;
  coverUrl: string;
  magazineName: string;
  magazineSlug: string;
  issueDate: string;
  title?: string | null;
  country: string;
  isNew?: boolean;
  isLarge?: boolean;
  delay?: number;
}

export function MagazineCard({
  id,
  coverUrl,
  magazineName,
  magazineSlug,
  issueDate,
  title,
  country,
  isNew,
  isLarge,
  delay = 0,
}: MagazineCardProps) {
  return (
    <Link
      href={`/issue/${id}`}
      className={`stagger-item magazine-card block relative group rounded-sm overflow-hidden bg-[var(--bg-card)] ${
        isLarge ? "col-span-2 row-span-2" : ""
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="aspect-[3/4] relative">
        <ImageWithFallback
          src={coverUrl}
          alt={title ?? `${magazineName} ${issueDate}`}
          fill
          sizes={isLarge ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white/80 text-[10px] tracking-[0.15em] font-medium uppercase">
            {getCountryFlag(country)} {magazineName}
          </p>
          <p className="text-white text-sm font-serif mt-0.5">
            {title ?? formatIssueDate(issueDate)}
          </p>
        </div>

        {/* New badge */}
        {isNew && (
          <span className="absolute top-3 right-3 px-2 py-0.5 bg-white text-black text-[10px] font-bold tracking-wider uppercase rounded-sm">
            NEW
          </span>
        )}
      </div>
    </Link>
  );
}