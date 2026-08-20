"use client";

import { AlertCircle } from "lucide-react";
import { StoryEditor } from "@/components/blog/story-editor";
import { useTranslations } from "next-intl";
import { StoryEditorSkeleton } from "@/components/blog/story-skeletons";
import { useStory } from "@/components/blog/use-stories";
import { useCanManageContent } from "@/components/auth/use-can-manage-content";
import { EmptyWell } from "@/components/empty-well";
import { NotFoundPanel } from "@/components/not-found-panel";

function isMissingStoryError(error: unknown) {
  return error instanceof Error && /not found/i.test(error.message);
}

export function EditStoryClient({ slug }: { slug: string }) {
  const t = useTranslations("Stories");
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
        title={t("editLoadErrorTitle")}
        text={t("editLoadErrorText")}
      />
    );
  }

  if (!story || !canManage) {
    return (
      <NotFoundPanel
        heading={t("editForbiddenHeading")}
        text={t("editForbiddenText")}
      />
    );
  }

  return <StoryEditor story={story} />;
}
