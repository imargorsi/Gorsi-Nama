"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, MessagesSquare, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { AccentIcon } from "@/components/accent-icon";
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
import { FeedItem, motionEase } from "@/components/reveal";
import { surfaceClass } from "@/components/surface";
import { cn } from "@/lib/utils";

export function CommunityFeed({
  layout = "feed",
  limit,
  showComposer,
  showFilters = false,
  initialCategory,
}: {
  layout?: "feed" | "slider";
  showComposer?: boolean;
  showFilters?: boolean;
  limit?: number;
  initialCategory?: CommunityCategoryId;
}) {
  const locale = useLocale();
  const { isLoaded, isSignedIn } = useAuth();
  const sessionPosts = useMemberPosts();
  const [editing, setEditing] = useState<CommunityPost>();
  const [activeTag, setActiveTag] = useState<string>();
  const [activeCategory, setActiveCategory] = useState<
    CommunityCategoryId | undefined
  >(initialCategory);
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
        <LayoutGroup id="community-filters">
          <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
            <FilterChip
              label="All"
              icon={LayoutGrid}
              isActive={!activeCategory}
              onClick={() => setActiveCategory(undefined)}
            />
            {communityCategories.map((category) => (
              <FilterChip
                key={category.id}
                label={category.label}
                icon={category.icon}
                isActive={activeCategory === category.id}
                onClick={() =>
                  setActiveCategory((current) =>
                    current === category.id ? undefined : category.id
                  )
                }
              />
            ))}
          </div>
        </LayoutGroup>
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
        <div
          className={cn(
            surfaceClass,
            "flex flex-col items-center gap-3 px-5 py-14 text-center"
          )}
        >
          <AccentIcon icon={MessagesSquare} size="lg" />
          <p className="font-heading text-lg font-semibold text-espresso">
            No posts in this filter yet
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-warm-gray">
            Try another category, or be the first to share a photograph or a
            link with the community.
          </p>
        </div>
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
          <AnimatePresence initial={false}>
            {posts.map((post, index) => (
              <FeedItem key={post.id} index={index}>
                <CommunityPostCard
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
              </FeedItem>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  icon: Icon,
  isActive,
  onClick,
}: {
  label: string;
  icon?: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      whileTap={{ scale: 0.98 }}
      className="relative h-11 shrink-0 overflow-hidden rounded-full px-3.5 text-sm font-medium whitespace-nowrap shadow-md"
    >
      <span className="absolute inset-0 bg-ivory" />
      {isActive ? (
        <motion.span
          layoutId="community-filter"
          className="absolute inset-0 bg-gold"
          transition={{ duration: 0.28, ease: motionEase }}
        />
      ) : null}
      <span
        className={cn(
          "relative z-10 inline-flex items-center gap-1.5 transition-colors",
          isActive ? "text-espresso" : "text-warm-gray hover:text-espresso"
        )}
      >
        {Icon ? (
          <Icon
            className={cn("size-3.5", isActive ? "text-espresso" : "text-gold")}
            strokeWidth={1.75}
          />
        ) : null}
        {label}
      </span>
    </motion.button>
  );
}
