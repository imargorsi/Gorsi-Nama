"use client";

import { useSyncExternalStore } from "react";
import { communityPosts, type CommunityPost } from "@/data/community-posts";

const emptyPosts: CommunityPost[] = [];
let memberPosts: CommunityPost[] = emptyPosts;
const deletedPostIds = new Set<string>();
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useMemberPosts() {
  return useSyncExternalStore(subscribe, () => memberPosts, () => emptyPosts);
}

export function visibleCommunityPosts(sessionPosts: CommunityPost[]) {
  const overriddenIds = new Set(sessionPosts.map((post) => post.id));

  return [
    ...sessionPosts.filter((post) => !deletedPostIds.has(post.id)),
    ...communityPosts.filter(
      (post) => !deletedPostIds.has(post.id) && !overriddenIds.has(post.id)
    ),
  ];
}

export function upsertMemberPost(post: CommunityPost) {
  deletedPostIds.delete(post.id);
  const exists = memberPosts.some((item) => item.id === post.id);
  memberPosts = exists
    ? memberPosts.map((item) => (item.id === post.id ? post : item))
    : [post, ...memberPosts];
  emit();
  return post;
}

export function deleteMemberPost(id: string) {
  memberPosts = memberPosts.filter((post) => post.id !== id);
  deletedPostIds.add(id);
  emit();
}

export function clearMemberPosts() {
  memberPosts = emptyPosts;
  deletedPostIds.clear();
  emit();
}
