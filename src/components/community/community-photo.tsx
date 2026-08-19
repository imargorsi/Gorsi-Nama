import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

function isPublicAsset(src: string) {
  return src.startsWith("/") && !src.startsWith("//");
}

export function CommunityPhoto({
  src,
  sizes = "(min-width: 768px) 40vw, 100vw",
  variant = "post",
  className,
  children,
  isBusy,
}: {
  src: string;
  sizes?: string;
  variant?: "composer" | "post" | "compact" | "fill";
  className?: string;
  children?: ReactNode;
  isBusy?: boolean;
}) {
  const useNextImage = isPublicAsset(src);
  const isFramed = variant === "compact" || variant === "fill";

  if (isFramed) {
    return (
      <div
        aria-busy={isBusy}
        className={cn(
          "relative overflow-hidden bg-espresso/8",
          variant === "compact" && "aspect-4/3 rounded-lg",
          variant === "fill" && "size-full min-h-0",
          className
        )}
      >
        {useNextImage ? (
          <Image
            src={src}
            alt=""
            fill
            sizes={sizes}
            className="object-cover"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
        )}
        {children}
      </div>
    );
  }

  return (
    <div
      aria-busy={isBusy}
      className={cn("relative overflow-hidden rounded-lg bg-espresso/8", className)}
    >
      {useNextImage ? (
        <Image
          src={src}
          alt=""
          width={1200}
          height={800}
          sizes={sizes}
          className="block max-h-72 w-full object-cover object-center sm:max-h-80"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          className="block max-h-72 w-full object-cover object-center sm:max-h-80"
        />
      )}
      {children}
    </div>
  );
}
