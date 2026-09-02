export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-[var(--border)] rounded ${className}`} />
  );
}

export function MagazineCardSkeleton() {
  return (
    <div className="aspect-[3/4] bg-[var(--border)] rounded-sm">
      <Skeleton className="w-full h-full" />
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12">
      {/* Hero skeleton */}
      <div className="flex gap-12 mb-16">
        <Skeleton className="w-[300px] h-[400px] rounded-sm flex-shrink-0" />
        <div className="flex-1 space-y-4 pt-20">
          <Skeleton className="w-48 h-8" />
          <Skeleton className="w-64 h-12" />
          <Skeleton className="w-32 h-6" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <MagazineCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}