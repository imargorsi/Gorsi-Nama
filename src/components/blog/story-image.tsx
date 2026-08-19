"use client";

import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * R2 (and blob) photos skip `next/image`. The optimizer fetches the public
 * URL server-side and R2 often answers 404, which shows as a broken icon.
 * Community posts already render the same way (`CommunityPhoto` post variant).
 */
export function StoryImage({
  src,
  alt = "",
  variant = "feature",
  className,
}: {
  src: string;
  alt?: string;
  variant?: "feature" | "card";
  className?: string;
}) {
  return (
    <StoryImageInner
      key={src}
      src={src}
      alt={alt}
      variant={variant}
      className={className}
    />
  );
}

function StoryImageInner({
  src,
  alt,
  variant,
  className,
}: {
  src: string;
  alt: string;
  variant: "feature" | "card";
  className?: string;
}) {
  const [isReady, setIsReady] = useState(false);

  function bindImage(node: HTMLImageElement | null) {
    if (node?.complete && node.naturalWidth > 0) setIsReady(true);
  }

  if (variant === "card") {
    return (
      <>
        {isReady ? null : (
          <Skeleton className="absolute inset-0 rounded-none bg-espresso/20" />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={bindImage}
          src={src}
          alt={alt}
          onLoad={() => setIsReady(true)}
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-300",
            isReady ? "opacity-100" : "opacity-0",
            className
          )}
        />
      </>
    );
  }

  return (
    <figure
      className={cn("relative overflow-hidden rounded-lg bg-espresso/8", className)}
    >
      {isReady ? null : (
        <Skeleton className="aspect-16/9 w-full rounded-none" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={bindImage}
        src={src}
        alt={alt}
        onLoad={() => setIsReady(true)}
        className={cn(
          "block h-auto w-full",
          isReady
            ? "relative"
            : "absolute inset-0 size-full object-cover opacity-0"
        )}
      />
    </figure>
  );
}
