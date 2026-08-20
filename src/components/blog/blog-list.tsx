"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { BookOpen, PenLine, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { EmptyWell } from "@/components/empty-well";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import {
  blogCategories,
  type BlogCategoryId,
} from "@/components/blog/blog-categories";
import {
  emptyStoryCounts,
  type BlogPost,
  type StoryCategoryCounts,
} from "@/components/blog/blog.schemas";
import { usePublishedStories } from "@/components/blog/use-stories";
import { StoryListSkeleton } from "@/components/blog/story-skeletons";
import { SplitReveal, Stagger, StaggerItem } from "@/components/reveal";
import { Text } from "@/components/typography";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function BlogWriteButton() {
  const { isSignedIn } = useAuth();
  const t = useTranslations("Stories");

  return (
    <Link
      href={isSignedIn ? "/blog/write" : "/auth/login"}
      className={cn(buttonVariants({ className: "w-full shrink-0 sm:w-auto" }))}
    >
      <PenLine className="size-4" />
      {t("writeCta")}
    </Link>
  );
}

function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id);
  }, [delay, value]);

  return debounced;
}

export function BlogList({
  initialCategory,
}: {
  initialCategory?: BlogCategoryId;
}) {
  const t = useTranslations("Stories");
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState(initialCategory);
  const debouncedQuery = useDebouncedValue(query);

  useEffect(() => {
    setCategoryId(initialCategory);
  }, [initialCategory]);

  const list = usePublishedStories({
    category: categoryId,
    q: debouncedQuery.trim() || undefined,
  });

  const pages = list.data?.pages ?? [];
  const posts = useMemo(
    () => pages.flatMap((page) => page.stories),
    [pages]
  );
  const total = pages[0]?.total ?? 0;
  const counts: StoryCategoryCounts = pages[0]?.counts ?? emptyStoryCounts();
  const sidebarCounts = useMemo(() => {
    const next = Object.fromEntries(
      blogCategories.map((category) => [category.id, 0])
    ) as Record<BlogCategoryId, number>;
    for (const category of blogCategories) {
      next[category.id] = counts[category.id];
    }
    return next;
  }, [counts]);

  const categoryLabel = categoryId
    ? t(`categories.${categoryId}`)
    : t("allStories");

  function selectCategory(id?: BlogCategoryId) {
    setCategoryId(id);
    router.replace(id ? `/blog?category=${id}` : "/blog", { scroll: false });
  }

  const isFiltered = Boolean(query.trim() || categoryId);
  const isEmptyCatalog = !list.isLoading && !list.isError && total === 0 && !isFiltered;
  const isEmptyFilter = !list.isLoading && !list.isError && posts.length === 0 && isFiltered;

  return (
    <SplitReveal
      sidebar={
        <div className="lg:sticky lg:top-32">
          <BlogSidebar
            query={query}
            categoryId={categoryId}
            totalCount={Object.values(sidebarCounts).reduce(
              (sum, value) => sum + value,
              0
            )}
            counts={sidebarCounts}
            onQueryChange={setQuery}
            onCategoryChange={selectCategory}
          />
        </div>
      }
    >
      <Text variant="small" className="mb-6">
          {query.trim() ? (
            <>
              {list.isLoading ? (
                <Skeleton className="inline-block h-4 w-28 align-middle" />
              ) : (
                `${t("storyCountMatching", { count: total })}`
              )}
              {" “"}
              {query.trim()}
              {"”"}
              {categoryId ? ` ${t("inCategory", { category: categoryLabel })}` : ""}
            </>
          ) : (
            <>
              {categoryLabel}
              <span className="text-gold/50"> · </span>
              {list.isLoading ? (
                <Skeleton className="inline-block h-4 w-24 align-middle" />
              ) : (
                `${t("storyCount", { count: total })}`
              )}
            </>
          )}
        </Text>

        {list.isError ? (
          <EmptyWell
            icon={BookOpen}
            title={t("loadErrorTitle")}
            text={t("loadErrorText")}
          />
        ) : isEmptyCatalog ? (
          <EmptyWell
            icon={BookOpen}
            title={t("emptyTitle")}
            text={t("emptyText")}
          />
        ) : isEmptyFilter ? (
          <EmptyWell
            icon={Search}
            title={t("noMatchTitle")}
            text={t("noMatchText")}
          />
        ) : list.isLoading ? (
          <StoryListSkeleton />
        ) : (
          <>
            <StoryGrid
              posts={posts}
              isFeatured={!query.trim() && !categoryId}
            />
            {list.isFetchingNextPage ? (
              <div className="mt-4">
                <StoryListSkeleton count={2} />
              </div>
            ) : null}
            {list.hasNextPage && !list.isFetchingNextPage ? (
              <div className="mt-8 flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => void list.fetchNextPage()}
                >
                  {t("showMore")}
                </Button>
              </div>
            ) : null}
          </>
        )}
    </SplitReveal>
  );
}

function StoryGrid({
  posts,
  isFeatured,
}: {
  posts: BlogPost[];
  isFeatured: boolean;
}) {
  return (
    <Stagger mode="load" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {posts.map((post, index) => (
        <StaggerItem
          key={post.id}
          index={index}
          isHoverable
          className="h-full min-w-0"
        >
          <BlogCard post={post} isFeatured={isFeatured && index === 0} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
