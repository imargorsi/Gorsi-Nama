"use client";

import { PenLine } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getBlogCategory } from "@/components/blog/blog-categories";
import { useMemberStories } from "@/components/blog/member-stories";
import { surfaceClass } from "@/components/surface";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProfileStories({ userId }: { userId: string }) {
  const stories = useMemberStories();
  const mine = stories.filter((story) => story.authorId === userId);

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="heritage-eyebrow">Your writing</p>
          <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Your stories
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Drafts stay on this device until the archive backend is live.
          </p>
        </div>
        <Link
          href="/blog/write"
          className={cn(
            buttonVariants({
              className: "h-11 shrink-0 gap-2 bg-gold px-5 text-espresso hover:bg-gold/90",
            })
          )}
        >
          <PenLine className="size-4" />
          Write a story
        </Link>
      </div>

      {mine.length === 0 ? (
        <p className={cn(surfaceClass, "mt-8 px-5 py-10 text-sm text-warm-gray")}>
          You have not written a story yet.
        </p>
      ) : (
        <ul className="mt-8 flex flex-col gap-3">
          {mine.map((story) => (
            <li
              key={story.id}
              className={cn(surfaceClass, "flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center")}
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
                    className="h-11 px-3 text-sm font-medium text-gold hover:underline"
                  >
                    View
                  </Link>
                ) : null}
                <Link
                  href={`/blog/${story.slug}/edit`}
                  className="h-11 px-3 text-sm font-medium text-espresso hover:text-gold"
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
