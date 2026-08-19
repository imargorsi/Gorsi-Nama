"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { BookOpen, PenLine, Search } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { EmptyWell } from "@/components/empty-well";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import {
  blogCategories,
  getBlogCategory,
  type BlogCategoryId,
} from "@/components/blog/blog-categories";
import {
  publishedStories,
  useMemberStories,
} from "@/components/blog/member-stories";
import { Stagger, StaggerItem } from "@/components/reveal";
import { Text } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import type { BlogPost } from "@/data/blog-posts";
import { cn } from "@/lib/utils";

export function BlogWriteButton() {
  const { isSignedIn } = useAuth();

  return (
    <Link
      href={isSignedIn ? "/blog/write" : "/auth/login"}
      className={cn(buttonVariants({ className: "w-full shrink-0 sm:w-auto" }))}
    >
      <PenLine className="size-4" />
      Write a story
    </Link>
  );
}

function matchesQuery(post: BlogPost, query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;

  return [
    post.title,
    post.excerpt,
    post.content,
    post.authorName,
    getBlogCategory(post.categoryId).label,
    ...post.tags,
  ].some((value) => value.toLowerCase().includes(needle));
}

export function BlogList({
  initialCategory,
}: {
  initialCategory?: BlogCategoryId;
}) {
  const router = useRouter();
  const posts = publishedStories(useMemberStories());
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState(initialCategory);

  useEffect(() => {
    setCategoryId(initialCategory);
  }, [initialCategory]);

  const counts = useMemo(() => {
    const next = Object.fromEntries(
      blogCategories.map((category) => [category.id, 0])
    ) as Record<BlogCategoryId, number>;
    for (const post of posts) next[post.categoryId] += 1;
    return next;
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const inCategory = categoryId ? post.categoryId === categoryId : true;
      return inCategory && matchesQuery(post, query);
    });
  }, [categoryId, posts, query]);

  const categoryLabel = categoryId
    ? getBlogCategory(categoryId).label
    : "All stories";

  function selectCategory(id?: BlogCategoryId) {
    setCategoryId(id);
    router.replace(id ? `/blog?category=${id}` : "/blog", { scroll: false });
  }

  return (
    <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-10 xl:gap-14">
      <aside className="lg:col-span-3">
        <div className="lg:sticky lg:top-32">
          <BlogSidebar
            query={query}
            categoryId={categoryId}
            totalCount={posts.length}
            counts={counts}
            onQueryChange={setQuery}
            onCategoryChange={selectCategory}
          />
        </div>
      </aside>

      <div className="mt-8 min-w-0 lg:col-span-9 lg:mt-0">
        <Text variant="small" className="mb-6">
          {query.trim() ? (
            <>
              {filtered.length} {filtered.length === 1 ? "story" : "stories"} matching
              “{query.trim()}”
              {categoryId ? ` in ${categoryLabel}` : ""}
            </>
          ) : (
            <>
              {categoryLabel}
              <span className="text-gold/50"> · </span>
              {filtered.length} {filtered.length === 1 ? "story" : "stories"}
            </>
          )}
        </Text>

        {posts.length === 0 ? (
          <EmptyWell
            icon={BookOpen}
            title="No Published Stories Yet"
            text="The first published story from the community will appear here."
          />
        ) : filtered.length === 0 ? (
          <EmptyWell
            icon={Search}
            title="No Matching Stories"
            text="Try a different search, or choose another category."
          />
        ) : (
          <Stagger
            mode="load"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {filtered.map((post, index) => (
              <StaggerItem
                key={post.id}
                index={index}
                isHoverable
                className="h-full min-w-0"
              >
                <BlogCard
                  post={post}
                  isFeatured={!query.trim() && !categoryId && index === 0}
                />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </div>
  );
}
