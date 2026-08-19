"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CommunityPagination({
  page,
  pageCount,
  onPageChange,
}: {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Community pages"
      className="mt-10 flex flex-wrap items-center justify-center gap-1 border-t border-espresso/10 pt-6"
    >
      <Button
        type="button"
        variant="outline"
        size="icon-lg"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4 rtl:rotate-180" strokeWidth={1.75} />
      </Button>
      {pages.map((item) => {
        const isActive = item === page;
        return (
          <button
            key={item}
            type="button"
            aria-current={isActive ? "page" : undefined}
            onClick={() => onPageChange(item)}
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-lg text-sm transition-colors",
              isActive
                ? "bg-gold font-medium text-espresso"
                : "text-warm-gray hover:bg-espresso/5 hover:text-espresso"
            )}
          >
            {item}
          </button>
        );
      })}
      <Button
        type="button"
        variant="outline"
        size="icon-lg"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight className="size-4 rtl:rotate-180" strokeWidth={1.75} />
      </Button>
    </nav>
  );
}
