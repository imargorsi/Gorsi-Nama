"use client";

import { useSyncExternalStore } from "react";
import type { BlogPost } from "@/data/blog-posts";
import { blogPosts } from "@/data/blog-posts";

const emptyStories: BlogPost[] = [];
let memberStories: BlogPost[] = emptyStories;
const deletedStoryIds = new Set<string>();
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useMemberStories() {
  return useSyncExternalStore(subscribe, () => memberStories, () => emptyStories);
}

export function findStoryBySlug(stories: BlogPost[], slug: string) {
  return stories.find((story) => story.slug === slug);
}

export function isStoryDeleted(id: string) {
  return deletedStoryIds.has(id);
}

export function publishedStories(sessionStories: BlogPost[]) {
  const overriddenIds = new Set(sessionStories.map((story) => story.id));
  const overriddenSlugs = new Set(sessionStories.map((story) => story.slug));

  return [
    ...sessionStories.filter(
      (story) => story.status === "publish" && !deletedStoryIds.has(story.id)
    ),
    ...blogPosts.filter(
      (post) =>
        !deletedStoryIds.has(post.id) &&
        !overriddenIds.has(post.id) &&
        !overriddenSlugs.has(post.slug)
    ),
  ];
}

export function takenStorySlugs(exceptId?: string) {
  return [
    ...blogPosts
      .filter((post) => post.id !== exceptId)
      .map((post) => post.slug),
    ...memberStories
      .filter((story) => story.id !== exceptId)
      .map((story) => story.slug),
  ];
}

export function upsertMemberStory(story: BlogPost) {
  deletedStoryIds.delete(story.id);
  const exists = memberStories.some((item) => item.id === story.id);
  memberStories = exists
    ? memberStories.map((item) => (item.id === story.id ? story : item))
    : [story, ...memberStories];
  emit();
  return story;
}

export function deleteMemberStory(id: string) {
  memberStories = memberStories.filter((story) => story.id !== id);
  deletedStoryIds.add(id);
  emit();
}

export function clearMemberStories() {
  memberStories = emptyStories;
  deletedStoryIds.clear();
  emit();
}
