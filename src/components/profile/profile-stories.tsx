"use client";

import { PenLine } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { EmptyWell } from "@/components/empty-well";
import { StoryRowActions } from "@/components/blog/story-actions";
import { useMyStories } from "@/components/blog/use-stories";
import { ProfileStoriesSkeleton } from "@/components/blog/story-skeletons";
import { SectionHeading } from "@/components/home/section-heading";
import { Heading, Text } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ProfileStories({
  userId,
  firstName,
}: {
  userId: string;
  firstName?: string;
}) {
  const t = useTranslations("Profile");
  const storiesT = useTranslations("Stories");
  const mine = useMyStories(Boolean(userId));
  const stories = mine.data?.stories ?? [];
  const publishedCount = stories.filter((story) => story.status === "publish").length;
  const draftCount = stories.length - publishedCount;

  return (
    <section id="your-stories">
      <SectionHeading
        eyebrow={t("storiesEyebrow")}
        title={t("storiesTitle")}
        titleVariant="h3"
        description={
          mine.isLoading ? (
            <Skeleton className="mt-0.5 h-4 w-56" />
          ) : stories.length === 0 ? (
            t("storiesEmptyDescription")
          ) : (
            t("storiesCounts", {
              published: publishedCount,
              draftCount,
            })
          )
        }
      >
        <Link
          href="/blog/write"
          className={cn(
            buttonVariants({ className: "shrink-0" })
          )}
        >
          <PenLine className="size-4" />
          {t("writeStory")}
        </Link>
      </SectionHeading>

      {mine.isError ? (
        <EmptyWell
          icon={PenLine}
          className="mt-6 py-8"
          title={t("loadStoriesErrorTitle")}
          text={t("loadStoriesErrorText")}
        />
      ) : mine.isLoading ? (
        <ProfileStoriesSkeleton />
      ) : stories.length === 0 ? (
        <EmptyWell
          icon={PenLine}
          className="mt-6 py-8"
          title={t("noStoriesTitle")}
          text={
            firstName
              ? t("noStoriesNamed", { name: firstName })
              : t("noStoriesUnnamed")
          }
        />
      ) : (
        <ul className="mt-6 flex flex-col gap-3">
          {stories.map((story) => (
            <li
              key={story.id}
              className={cn(
                "surface flex flex-col gap-3 px-5 py-4 transition-shadow duration-300 hover:shadow-lg sm:flex-row sm:items-center"
              )}
            >
              <div className="min-w-0 flex-1">
                <Heading as="p" variant="card">
                  {story.title}
                </Heading>
                <Text variant="meta" className="mt-1 text-sm">
                  {storiesT(`categories.${story.categoryId}`)}
                  <span className="text-gold/50"> · </span>
                  {story.status === "publish" ? t("published") : t("draft")}
                </Text>
              </div>
              <StoryRowActions story={story} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
