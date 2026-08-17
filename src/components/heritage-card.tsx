import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { HeritageDiamond, HeritageDiamondBand } from "@/components/heritage-ornaments";

export interface HeritageCardProps {
  index?: number | string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  href?: string;
  cta?: string;
  className?: string;
}

function formatIndex(index: number | string) {
  if (typeof index === "number") return String(index).padStart(2, "0");
  return index;
}

export function HeritageCard({
  index,
  category,
  title,
  description,
  image,
  imageAlt,
  href,
  cta,
  className,
}: HeritageCardProps) {
  const classes = cn(
    "group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-gold/35 bg-ivory shadow-md transition-shadow duration-300 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:outline-none",
    className
  );

  const body = (
    <>
      <div className="relative aspect-3/2 overflow-hidden">
        <Image
          src={image}
          alt={imageAlt || title}
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 640px) 40vw, 90vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col px-4 pt-3 pb-3 sm:px-5">
        <div>
          {index != null ? (
            <p className="font-heading text-xl leading-none font-light tracking-[0.08em] text-gold">
              {formatIndex(index)}
            </p>
          ) : null}
          <p className="heritage-eyebrow mt-1">{category}</p>
        </div>

        <div className="my-2.5 flex items-center justify-center gap-3" aria-hidden>
          <span className="h-px w-8 bg-gold/30" />
          <HeritageDiamond className="size-1.5" />
          <span className="h-px w-8 bg-gold/30" />
        </div>

        <h3 className="font-heading text-lg font-semibold tracking-tight text-espresso sm:text-xl">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-snug text-warm-gray">{description}</p>

        {href && cta ? (
          <span className="mt-auto inline-flex items-center gap-2 border-t border-gold/20 pt-3 text-sm font-medium tracking-wide text-gold">
            {cta}
            <ArrowRight
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
              strokeWidth={1.75}
            />
          </span>
        ) : null}
      </div>

      <HeritageDiamondBand />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {body}
      </Link>
    );
  }

  return <article className={classes}>{body}</article>;
}

export function HeritageCardGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8 xl:grid-cols-4", className)}>
      {children}
    </div>
  );
}
