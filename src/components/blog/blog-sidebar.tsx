"use client";

import { LayoutGrid, Search, X } from "lucide-react";
import { HeritageCircleMark } from "@/components/heritage-ornaments";
import {
  blogCategories,
  type BlogCategoryId,
} from "@/components/blog/blog-categories";
import { Input } from "@/components/ui/input";
import { surfaceClass } from "@/components/surface";
import { cn } from "@/lib/utils";

export function BlogSidebar({
  query,
  categoryId,
  totalCount,
  counts,
  onQueryChange,
  onCategoryChange,
}: {
  query: string;
  categoryId?: BlogCategoryId;
  totalCount: number;
  counts: Record<BlogCategoryId, number>;
  onQueryChange: (value: string) => void;
  onCategoryChange: (id?: BlogCategoryId) => void;
}) {
  const items = [
    { id: undefined, label: "All Stories", icon: LayoutGrid, count: totalCount },
    ...blogCategories.map((category) => ({
      id: category.id,
      label: category.label,
      icon: category.icon,
      count: counts[category.id],
    })),
  ];

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div className="relative">
        <Search
          className="pointer-events-none absolute inset-s-3.5 top-1/2 size-4 -translate-y-1/2 text-gold"
          strokeWidth={1.75}
          aria-hidden
        />
        <Input
          id="story-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search stories"
          aria-label="Search stories"
          className="h-12 rounded-xl bg-ivory ps-10 pe-10 text-sm shadow-md md:text-sm"
        />
        {query ? (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            className="absolute inset-e-2 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-warm-gray transition-colors hover:text-espresso"
            aria-label="Clear search"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        ) : null}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = categoryId === item.id;
          return (
            <button
              key={item.label}
              type="button"
              aria-pressed={isActive}
              onClick={() => onCategoryChange(item.id)}
              className={cn(
                "inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-3.5 text-sm font-medium whitespace-nowrap shadow-md",
                isActive ? "bg-gold text-espresso" : "bg-ivory text-warm-gray"
              )}
            >
              <Icon className={cn("size-3.5", isActive ? "text-espresso" : "text-gold")} strokeWidth={1.75} />
              {item.label}
              <span className={cn("text-xs", isActive ? "text-espresso/70" : "text-warm-gray")}>
                {item.count}
              </span>
            </button>
          );
        })}
      </div>

      <nav
        aria-label="Story categories"
        className={cn(surfaceClass, "hidden p-5 lg:block")}
      >
        <p className="mb-4 flex items-center gap-2.5">
          <HeritageCircleMark className="size-5" />
          <span className="heritage-eyebrow">Categories</span>
        </p>
        <ul className="flex flex-col gap-0.5">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = categoryId === item.id;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onCategoryChange(item.id)}
                  className={cn(
                    "flex min-h-11 w-full items-center gap-2.5 rounded-lg px-3 text-sm transition-colors",
                    isActive
                      ? "bg-gold/20 font-medium text-espresso"
                      : "text-warm-gray hover:bg-espresso/5 hover:text-espresso"
                  )}
                >
                  <Icon
                    className={cn("size-3.5 shrink-0", isActive ? "text-espresso" : "text-gold")}
                    strokeWidth={1.75}
                  />
                  <span className="min-w-0 flex-1 truncate text-start">{item.label}</span>
                  <span className="font-heading text-sm font-light text-gold">
                    {item.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
