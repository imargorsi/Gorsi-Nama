"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import { CommunityComposer } from "@/components/community/community-composer";
import { CommunityPostCard } from "@/components/community/community-post-card";
import {
  CommunityPostSlider,
  communitySliderPostCount,
} from "@/components/community/community-post-slider";
import {
  communityCategories,
  type CommunityCategoryId,
} from "@/components/community/community-categories";
import {
  deleteMemberPost,
  upsertMemberPost,
  useMemberPosts,
  visibleCommunityPosts,
} from "@/components/community/member-posts";
import type { CommunityPost } from "@/data/community-posts";
import { getPathname } from "@/i18n/navigation";
import { formatTag } from "@/lib/parse-tags";
import { surfaceClass } from "@/components/surface";
import { cn } from "@/lib/utils";

export function CommunityFeed({
  layout = "feed",
  limit,
  showComposer,
  showFilters = false,
}: {
  layout?: "feed" | "slider";
  showComposer?: boolean;
  showFilters?: boolean;
  limit?: number;
}) {
  const locale = useLocale();
  const { isLoaded, isSignedIn } = useAuth();
  const sessionPosts = useMemberPosts();
  const [editing, setEditing] = useState<CommunityPost>();
  const [activeTag, setActiveTag] = useState<string>();
  const [activeCategory, setActiveCategory] = useState<
    CommunityCategoryId | undefined
  >();
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const canCompose = showComposer ?? Boolean(isLoaded && isSignedIn);
  const isAuthPending = showComposer === undefined && !isLoaded;
  const isFeedLayout = layout === "feed";
  const isSliderLayout = layout === "slider";
  const postLimit = isSliderLayout
    ? (limit ?? communitySliderPostCount)
    : limit;

  const posts = useMemo(() => {
    const merged = visibleCommunityPosts(sessionPosts).filter(
      (post) => post.id !== editing?.id
    );
    const tagged = activeTag
      ? merged.filter((post) => post.tags.includes(activeTag))
      : merged;
    const categorized = activeCategory
      ? tagged.filter((post) => post.categoryId === activeCategory)
      : tagged;
    return typeof postLimit === "number"
      ? categorized.slice(0, postLimit)
      : categorized;
  }, [activeCategory, activeTag, editing?.id, postLimit, sessionPosts]);

  function toggleId(setter: typeof setLikedIds, id: string) {
    setter((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleEngagement(setter: typeof setLikedIds, id: string) {
    if (!isSignedIn) {
      toast.message("Sign in to like and save posts.");
      return;
    }
    toggleId(setter, id);
  }

  function savePost(post: CommunityPost) {
    upsertMemberPost(post);
    setEditing(undefined);
  }

  function deletePost(post: CommunityPost) {
    if (!window.confirm("Delete this post? This cannot be undone on this device.")) {
      return;
    }
    deleteMemberPost(post.id);
    if (editing?.id === post.id) setEditing(undefined);
    toast.success("Post deleted.");
  }

  async function sharePost(post: CommunityPost) {
    const path = getPathname({
      href: "/community",
      locale: locale === "ur" ? "ur" : "en",
    });
    const url = `${window.location.origin}${path}#${post.id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Gorsi Nama",
          text: post.body.slice(0, 120),
          url,
        });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success("Link copied.");
    } catch {
      toast.error("Could not share this post.");
    }
  }

  return (
    <div
      className={cn(
        "flex w-full min-w-0 flex-col gap-6",
        isFeedLayout && "mx-auto max-w-3xl"
      )}
    >
      {isAuthPending ? (
        <div className={cn(surfaceClass, "min-h-14")} aria-hidden />
      ) : editing ? (
        <CommunityComposer
          post={editing}
          onSave={savePost}
          onCancel={() => setEditing(undefined)}
        />
      ) : canCompose ? (
        <CommunityComposer onSave={savePost} />
      ) : null}

      {showFilters ? (
        <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
          <FilterChip
            label="All"
            isActive={!activeCategory}
            onClick={() => setActiveCategory(undefined)}
          />
          {communityCategories.map((category) => (
            <FilterChip
              key={category.id}
              label={category.label}
              isActive={activeCategory === category.id}
              onClick={() =>
                setActiveCategory((current) =>
                  current === category.id ? undefined : category.id
                )
              }
            />
          ))}
        </div>
      ) : null}

      {activeTag ? (
        <div className="flex flex-wrap items-center gap-2 text-sm text-warm-gray">
          <span>Showing {formatTag(activeTag)}</span>
          <button
            type="button"
            className="h-11 px-2 text-gold hover:underline"
            onClick={() => setActiveTag(undefined)}
          >
            Clear
          </button>
        </div>
      ) : null}

      {posts.length === 0 ? (
        <p
          className={cn(
            surfaceClass,
            "px-5 py-10 text-center text-sm text-warm-gray"
          )}
        >
          No posts in this filter yet.
        </p>
      ) : isSliderLayout ? (
        <CommunityPostSlider
          posts={posts}
          isLiked={(id) => likedIds.has(id)}
          isSaved={(id) => savedIds.has(id)}
          onLike={(id) => toggleEngagement(setLikedIds, id)}
          onSave={(id) => toggleEngagement(setSavedIds, id)}
          onShare={(post) => void sharePost(post)}
          onTagClick={setActiveTag}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <CommunityPostCard
              key={post.id}
              post={post}
              isLiked={likedIds.has(post.id)}
              isSaved={savedIds.has(post.id)}
              onLike={() => toggleEngagement(setLikedIds, post.id)}
              onSave={() => toggleEngagement(setSavedIds, post.id)}
              onShare={() => void sharePost(post)}
              onTagClick={setActiveTag}
              onEdit={() => setEditing(post)}
              onDelete={() => deletePost(post)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "h-11 shrink-0 rounded-full px-3.5 text-sm font-medium whitespace-nowrap transition-colors",
        isActive
          ? "bg-gold text-espresso"
          : "bg-transparent text-warm-gray ring-1 ring-espresso/40 hover:text-espresso"
      )}
    >
      {label}
    </button>
  );
}
