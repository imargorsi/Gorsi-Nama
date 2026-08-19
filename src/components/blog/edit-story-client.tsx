"use client";

import { AlertCircle } from "lucide-react";
import { StoryEditor } from "@/components/blog/story-editor";
import { StoryEditorSkeleton } from "@/components/blog/story-skeletons";
import { useStory } from "@/components/blog/use-stories";
import { useCanManageContent } from "@/components/auth/use-can-manage-content";
import { EmptyWell } from "@/components/empty-well";
import { NotFoundPanel } from "@/components/not-found-panel";

function isMissingStoryError(error: unknown) {
  return error instanceof Error && /not found/i.test(error.message);
}

export function EditStoryClient({ slug }: { slug: string }) {
  const storyQuery = useStory(slug);
  const story = storyQuery.data;
  const { isLoaded, canManage } = useCanManageContent(story?.authorId);

  if (storyQuery.isLoading || !isLoaded) {
    return <StoryEditorSkeleton />;
  }

  if (storyQuery.isError && !isMissingStoryError(storyQuery.error)) {
    return (
      <EmptyWell
        icon={AlertCircle}
        title="Could Not Load This Story"
        text="Refresh the page to try again."
      />
    );
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
