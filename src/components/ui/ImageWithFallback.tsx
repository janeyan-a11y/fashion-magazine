"use client";

import Image from "next/image";
import { useState } from "react";

export function ImageWithFallback({
  src,
  alt,
  fill,
  className,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`bg-[var(--border)] flex items-center justify-center ${className}`}>
        <span className="text-[var(--fg-muted)] text-xs font-serif">NO COVER</span>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className ?? ""}`}
        sizes={sizes ?? "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"}
        onError={() => setError(true)}
        unoptimized
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={560}
      className={`object-cover ${className ?? ""}`}
      onError={() => setError(true)}
      unoptimized
      priority={priority}
    />
  );
}