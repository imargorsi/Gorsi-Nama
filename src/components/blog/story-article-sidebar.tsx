"use client";

import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { getBlogCategory } from "@/components/blog/blog-categories";
import { StoryActions } from "@/components/blog/story-actions";
import { BlogShareLinks } from "@/components/blog/blog-share-links";
import { surfaceClass } from "@/components/surface";
import type { BlogPost } from "@/components/blog/blog.schemas";
import { readingMinutes } from "@/lib/stories/format";
import { formatTag } from "@/lib/parse-tags";
import { initialsFromName } from "@/lib/initials";
import { Text } from "@/components/typography";
import { cn } from "@/lib/utils";

function formatPublishedDate(iso?: string) {
  if (!iso) return undefined;
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function MetaRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Text variant="label">{label}</Text>
      <Text as="div" variant="small">{children}</Text>
    </div>
  );
}

export function StoryArticleSidebar({ post }: { post: BlogPost }) {
  const category = getBlogCategory(post.categoryId);
  const published = formatPublishedDate(post.publishedAt ?? post.updatedAt);
  const minutes = readingMinutes(post);

  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
      <section className={cn(surfaceClass, "flex flex-col gap-5 p-5")}>
        <p className="heritage-eyebrow">Details</p>

        <MetaRow label="Author">
          <span className="flex items-center gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-espresso ring-1 ring-gold/45">
              <span className="font-heading text-[0.7rem] font-semibold text-ivory">
                {initialsFromName(post.authorName)}
              </span>
            </span>
            {post.authorName}
          </span>
        </MetaRow>

        <MetaRow label="Category">
          <Link
            href={`/blog?category=${post.categoryId}`}
            className="text-espresso transition-colors hover:text-gold"
          >
            {category.label}
          </Link>
        </MetaRow>

        {published ? <MetaRow label="Published">{published}</MetaRow> : null}

        <MetaRow label="Length">{minutes} min read</MetaRow>

        <StoryActions story={post} />
      </section>

      {post.tags.length > 0 ? (
        <section className={cn(surfaceClass, "p-5")}>
          <p className="heritage-eyebrow">Tags</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-espresso/8 px-2.5 py-1 text-xs font-medium text-espresso"
              >
                {formatTag(tag)}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className={cn(surfaceClass, "p-5")}>
        <p className="heritage-eyebrow">Share</p>
        <div className="mt-4">
          <BlogShareLinks title={post.title} />
        </div>
      </section>
    </aside>
  );
}
