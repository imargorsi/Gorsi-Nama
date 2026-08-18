import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function CommunityPhoto({
  src,
  sizes = "(min-width: 768px) 40vw, 100vw",
  variant = "post",
  className,
  children,
}: {
  src: string;
  sizes?: string;
  variant?: "composer" | "post" | "compact" | "tile";
  className?: string;
  children?: ReactNode;
}) {
  const isLocalPreview = src.startsWith("data:") || src.startsWith("blob:");

  if (variant === "tile" || variant === "compact") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-lg bg-espresso/8",
          variant === "tile" ? "aspect-square" : "aspect-4/3",
          className
        )}
      >
        {isLocalPreview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <Image
            src={src}
            alt=""
            fill
            sizes={sizes}
            className="object-cover"
          />
        )}
        {children}
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="block h-auto w-full rounded-lg" />
      {children}
    </div>
  );
}
