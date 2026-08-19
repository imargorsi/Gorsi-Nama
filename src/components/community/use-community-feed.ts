"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { useLocale } from "next-intl";
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
import { communitySliderPostCount } from "@/components/community/community-post-slider";
import type { CommunityPost } from "@/data/community-posts";
import { getPathname, useRouter } from "@/i18n/navigation";

export const communityFeedPageSize = 6;

export function communityPath({
  category,
  tag,
  page,
}: {
  category?: CommunityCategoryId;
  tag?: string;
  page?: number;
}) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (tag) params.set("tag", tag);
  if (page && page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/community?${query}` : "/community";
}

export function useCommunityFeed({
  layout,
  limit,
  showComposer,
  paginate = false,
  initialCategory,
  initialTag,
  initialPage = 1,
}: {
  layout: "feed" | "slider";
  limit?: number;
  showComposer?: boolean;
  paginate?: boolean;
  initialCategory?: CommunityCategoryId;
  initialTag?: string;
  initialPage?: number;
}) {
  const locale = useLocale();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const sessionPosts = useMemberPosts();
  const [editing, setEditing] = useState<CommunityPost>();
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const postLimit =
    layout === "slider" ? (limit ?? communitySliderPostCount) : limit;

  const catalog = useMemo(
    () =>
      visibleCommunityPosts(sessionPosts).filter(
        (post) => post.id !== editing?.id
      ),
    [editing?.id, sessionPosts]
  );

  const counts = useMemo(() => {
    const next = Object.fromEntries(
      communityCategories.map((category) => [category.id, 0])
    ) as Record<CommunityCategoryId, number>;
    for (const post of catalog) {
      next[post.categoryId] += 1;
    }
    return next;
  }, [catalog]);

  const tags = useMemo(() => {
    const tally = new Map<string, number>();
    for (const post of catalog) {
      for (const tag of post.tags) {
        tally.set(tag, (tally.get(tag) ?? 0) + 1);
      }
    }
    return [...tally.entries()]
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
  }, [catalog]);

  const filtered = useMemo(
    () =>
      catalog.filter((post) => {
        if (initialTag && !post.tags.includes(initialTag)) return false;
        if (initialCategory && post.categoryId !== initialCategory) return false;
        return true;
      }),
    [catalog, initialCategory, initialTag]
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / communityFeedPageSize));
  const page = paginate
    ? Math.min(Math.max(initialPage, 1), pageCount)
    : 1;

  const posts = useMemo(() => {
    if (typeof postLimit === "number") return filtered.slice(0, postLimit);
    if (!paginate) return filtered;
    const start = (page - 1) * communityFeedPageSize;
    return filtered.slice(start, start + communityFeedPageSize);
  }, [filtered, page, paginate, postLimit]);

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

  function goTo(next: {
    category?: CommunityCategoryId;
    tag?: string;
    page?: number;
  }) {
    router.replace(
      communityPath({
        category: next.category,
        tag: next.tag,
        page: next.page,
      }),
      { scroll: false }
    );
  }

  const rangeStart = filtered.length === 0 ? 0 : (page - 1) * communityFeedPageSize + 1;
  const rangeEnd = Math.min(page * communityFeedPageSize, filtered.length);

  useEffect(() => {
    if (!paginate || initialPage === page) return;
    router.replace(
      communityPath({
        category: initialCategory,
        tag: initialTag,
        page,
      }),
      { scroll: false }
    );
  }, [paginate, initialPage, page, initialCategory, initialTag, router]);

  return {
    editing,
    setEditing,
    catalog,
    counts,
    tags,
    posts,
    filteredCount: filtered.length,
    page,
    pageCount,
    rangeStart,
    rangeEnd,
    likedIds,
    savedIds,
    isLoaded,
    isSignedIn,
    canCompose: showComposer ?? Boolean(isLoaded && isSignedIn),
    isAuthPending: showComposer === undefined && !isLoaded,
    isFiltered: Boolean(initialCategory || initialTag),
    categoryLabel: initialCategory
      ? communityCategories.find((category) => category.id === initialCategory)
          ?.label
      : "All posts",
    selectCategory(id?: CommunityCategoryId) {
      goTo({ category: id, tag: initialTag });
    },
    selectTag(nextTag?: string) {
      goTo({ category: initialCategory, tag: nextTag });
    },
    selectPage(nextPage: number) {
      goTo({ category: initialCategory, tag: initialTag, page: nextPage });
    },
    toggleLike: (id: string) => toggleEngagement(setLikedIds, id),
    toggleSave: (id: string) => toggleEngagement(setSavedIds, id),
    savePost,
    deletePost,
    sharePost: (post: CommunityPost) => void sharePost(post),
  };
}
