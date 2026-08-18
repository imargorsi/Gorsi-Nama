"use client";

import type { ReactNode } from "react";
import { useLocale } from "next-intl";
import { motion } from "motion/react";
import { useSliderAutoplay } from "@/components/use-slider-autoplay";
import { cn } from "@/lib/utils";

export const pagedSliderPageSize = 4;

export function chunkPages<T>(items: T[], size: number) {
  const pages: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    pages.push(items.slice(index, index + size));
  }
  return pages;
}

export function PagedSlider({
  pages,
  pageClassName,
  tablistLabel,
  getPageLabel,
}: {
  pages: { key: string; content: ReactNode }[];
  pageClassName?: string;
  tablistLabel: string;
  getPageLabel: (index: number) => string;
}) {
  const locale = useLocale();
  const isRtl = locale === "ur";
  const pageCount = pages.length;
  const { page, goTo, hoverProps } = useSliderAutoplay(pageCount);

  if (pageCount === 0) return null;

  return (
    <div className="relative" {...hoverProps}>
      <div className="overflow-hidden">
        <motion.div
          className="flex w-full"
          animate={{ x: `${(isRtl ? page : -page) * 100}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {pages.map((item) => (
            <div
              key={item.key}
              className={cn("grid w-full shrink-0 basis-full", pageClassName)}
            >
              {item.content}
            </div>
          ))}
        </motion.div>
      </div>

      {pageCount > 1 ? (
        <div
          className="mt-5 flex items-center justify-center"
          role="tablist"
          aria-label={tablistLabel}
        >
          {pages.map((item, index) => (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-label={getPageLabel(index)}
              aria-selected={page === index}
              onClick={() => goTo(index)}
              className="group flex size-11 items-center justify-center"
            >
              <span
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  page === index
                    ? "w-9 bg-gold"
                    : "w-3 bg-espresso/20 group-hover:bg-espresso/35"
                )}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
