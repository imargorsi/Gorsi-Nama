"use client";

import { StoryEditor } from "@/components/blog/story-editor";
import {
  findStoryBySlug,
  isStoryDeleted,
  useMemberStories,
} from "@/components/blog/member-stories";
import { useCanManageContent } from "@/components/auth/use-can-manage-content";
import { NotFoundPanel } from "@/components/not-found-panel";
import { getBlogPostBySlug } from "@/data/blog-posts";
import { useIsHydrated } from "@/lib/use-is-hydrated";

export function EditStoryClient({ slug }: { slug: string }) {
  const sessionStory = findStoryBySlug(useMemberStories(), slug);
  const seed = getBlogPostBySlug(slug);
  const story =
    sessionStory ?? (seed && !isStoryDeleted(seed.id) ? seed : undefined);
  const { isLoaded, canManage } = useCanManageContent(story?.authorId);
  const isHydrated = useIsHydrated();

  if (!isLoaded || !isHydrated) {
    return <p className="text-sm text-warm-gray">Loading this story…</p>;
  }

  if (!story || !canManage) {
    return (
      <NotFoundPanel
        heading="You cannot edit this story"
        text="Only the author or a super admin can edit a story."
      />
    );
  }

  return <StoryEditor story={story} />;
}
