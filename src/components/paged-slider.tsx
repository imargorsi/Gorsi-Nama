"use client";

import type { ReactNode } from "react";
import { useSyncExternalStore } from "react";
import { useLocale } from "next-intl";
import { motion } from "motion/react";
import { useSliderAutoplay } from "@/components/use-slider-autoplay";
import { cn } from "@/lib/utils";

/** Desktop page size (`lg+`). Phone shows 1; `sm` shows 2. */
export const pagedSliderPageSize = 4;

const smQuery = "(min-width: 640px)";
const lgQuery = "(min-width: 1024px)";

function pagedSliderPageSizeFromViewport() {
  if (window.matchMedia(lgQuery).matches) return 4;
  if (window.matchMedia(smQuery).matches) return 2;
  return 1;
}

function subscribePagedSliderPageSize(onStoreChange: () => void) {
  const sm = window.matchMedia(smQuery);
  const lg = window.matchMedia(lgQuery);
  sm.addEventListener("change", onStoreChange);
  lg.addEventListener("change", onStoreChange);
  return () => {
    sm.removeEventListener("change", onStoreChange);
    lg.removeEventListener("change", onStoreChange);
  };
}

export function usePagedSliderPageSize() {
  return useSyncExternalStore(
    subscribePagedSliderPageSize,
    pagedSliderPageSizeFromViewport,
    () => 1
  );
}

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
          className="mt-5 flex items-center justify-center gap-1 sm:gap-0"
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
              className="group flex h-11 w-3.5 items-center justify-center sm:size-11 sm:w-11"
            >
              <span
                className={cn(
                  "rounded-full transition-all",
                  page === index
                    ? "h-2 w-2 bg-gold sm:h-2.5 sm:w-8"
                    : "h-1.5 w-1.5 bg-espresso/25 sm:h-2.5 sm:w-2.5 group-hover:bg-espresso/40"
                )}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
