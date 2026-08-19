"use client";

import { PenLine } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AccentIcon } from "@/components/accent-icon";
import { getBlogCategory } from "@/components/blog/blog-categories";
import { useMemberStories } from "@/components/blog/member-stories";
import { SectionHeading } from "@/components/home/section-heading";
import { surfaceClass } from "@/components/surface";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProfileStories({
  userId,
  firstName,
}: {
  userId: string;
  firstName?: string;
}) {
  const stories = useMemberStories();
  const mine = stories.filter((story) => story.authorId === userId);
  const publishedCount = mine.filter((story) => story.status === "publish").length;
  const draftCount = mine.length - publishedCount;

  return (
    <section id="your-stories">
      <SectionHeading
        eyebrow="Your writing"
        title="Your Stories"
        className="[&_h2]:text-2xl sm:[&_h2]:text-3xl lg:[&_h2]:text-3xl"
        description={
          mine.length === 0
            ? "Drafts and published stories you write will live here."
            : `${publishedCount} published · ${draftCount} ${draftCount === 1 ? "draft" : "drafts"}`
        }
      >
        <Link
          href="/blog/write"
          className={cn(
            buttonVariants({
              className:
                "h-11 shrink-0 gap-2 bg-espresso px-5 text-ivory hover:bg-espresso/90",
            })
          )}
        >
          <PenLine className="size-4" />
          Write a story
        </Link>
      </SectionHeading>

      {mine.length === 0 ? (
        <div
          className={cn(
            surfaceClass,
            "mt-6 flex flex-col items-center gap-3 px-5 py-8 text-center"
          )}
        >
          <AccentIcon icon={PenLine} size="lg" />
          <p className="font-heading text-lg font-semibold text-espresso">
            No Stories Yet
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-warm-gray">
            {firstName ? `${firstName}, you` : "You"} have not written a story
            yet. Title, excerpt, and a photograph — then publish to Stories.
          </p>
        </div>
      ) : (
        <ul className="mt-6 flex flex-col gap-3">
          {mine.map((story) => (
            <li
              key={story.id}
              className={cn(
                surfaceClass,
                "flex flex-col gap-3 px-5 py-4 transition-shadow duration-300 hover:shadow-lg sm:flex-row sm:items-center"
              )}
            >
              <div className="min-w-0 flex-1">
                <p className="font-heading text-lg font-semibold text-espresso">
                  {story.title}
                </p>
                <p className="mt-1 text-sm text-warm-gray">
                  {getBlogCategory(story.categoryId).label}
                  <span className="text-gold/50"> · </span>
                  {story.status === "publish" ? "Published" : "Draft"}
                </p>
              </div>
              <div className="flex gap-2">
                {story.status === "publish" ? (
                  <Link
                    href={`/blog/${story.slug}`}
                    className="inline-flex h-11 items-center px-3 text-sm font-medium text-gold hover:underline"
                  >
                    View
                  </Link>
                ) : null}
                <Link
                  href={`/blog/${story.slug}/edit`}
                  className="inline-flex h-11 items-center px-3 text-sm font-medium text-espresso hover:text-gold"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
