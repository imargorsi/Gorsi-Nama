"use client";

import { useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";
import { motion } from "motion/react";
import { CommunityPostCard } from "@/components/community/community-post-card";
import type { CommunityPost } from "@/data/community-posts";
import { cn } from "@/lib/utils";

export const communitySliderPageSize = 4;
export const communitySliderPostCount = 12;

function chunkPosts(posts: CommunityPost[], size: number) {
  const pages: CommunityPost[][] = [];
  for (let index = 0; index < posts.length; index += size) {
    pages.push(posts.slice(index, index + size));
  }
  return pages;
}

export function CommunityPostSlider({
  posts,
  isLiked,
  isSaved,
  onLike,
  onSave,
  onShare,
  onTagClick,
}: {
  posts: CommunityPost[];
  isLiked: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  onLike: (id: string) => void;
  onSave: (id: string) => void;
  onShare: (post: CommunityPost) => void;
  onTagClick: (tag: string) => void;
}) {
  const locale = useLocale();
  const isRtl = locale === "ur";
  const pages = chunkPosts(posts, communitySliderPageSize);
  const pageCount = pages.length;
  const [page, setPage] = useState(0);

  if (posts.length === 0) return null;

  function goTo(next: number) {
    setPage(Math.max(0, Math.min(pageCount - 1, next)));
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div
          className="flex w-full"
          animate={{ x: `${(isRtl ? page : -page) * 100}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {pages.map((pagePosts, pageIndex) => (
            <div
              key={pagePosts[0]?.id ?? pageIndex}
              className="grid w-full shrink-0 basis-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {pagePosts.map((post) => (
                <div key={post.id} className="h-full min-w-0">
                  <CommunityPostCard
                    post={post}
                    compact
                    isLiked={isLiked(post.id)}
                    isSaved={isSaved(post.id)}
                    onLike={() => onLike(post.id)}
                    onSave={() => onSave(post.id)}
                    onShare={() => onShare(post)}
                    onTagClick={onTagClick}
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {pageCount > 1 ? (
        <div className="mt-5 flex items-center justify-center gap-3">
          <SliderButton
            label="Previous posts"
            onClick={() => goTo(page - 1)}
            isDisabled={page === 0}
          >
            <ChevronLeft className="size-4 rtl:rotate-180" />
          </SliderButton>
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Post pages">
            {pages.map((pagePosts, index) => (
              <button
                key={pagePosts[0]?.id ?? index}
                type="button"
                role="tab"
                aria-label={`Posts ${index * communitySliderPageSize + 1} to ${Math.min((index + 1) * communitySliderPageSize, posts.length)}`}
                aria-selected={page === index}
                onClick={() => goTo(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  page === index ? "w-6 bg-gold" : "w-2 bg-espresso/20 hover:bg-espresso/35"
                )}
              />
            ))}
          </div>
          <SliderButton
            label="Next posts"
            onClick={() => goTo(page + 1)}
            isDisabled={page === pageCount - 1}
          >
            <ChevronRight className="size-4 rtl:rotate-180" />
          </SliderButton>
        </div>
      ) : null}
    </div>
  );
}

function SliderButton({
  label,
  onClick,
  isDisabled,
  children,
}: {
  label: string;
  onClick: () => void;
  isDisabled: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={isDisabled}
      className="inline-flex size-11 items-center justify-center rounded-full bg-ivory text-espresso shadow-sm transition-colors hover:bg-espresso/5 disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </button>
  );
}
