"use client";

import { Clock, User } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import { getBlogCategory } from "@/components/blog/blog-categories";
import { StoryActions } from "@/components/blog/story-actions";
import { BlogShareLinks } from "@/components/blog/blog-share-links";
import {
  findStoryBySlug,
  isStoryDeleted,
  publishedStories,
  useMemberStories,
} from "@/components/blog/member-stories";
import { SectionHeading } from "@/components/home/section-heading";
import { NotFoundPanel } from "@/components/not-found-panel";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { readingMinutes, type BlogPost } from "@/data/blog-posts";
import { formatTag } from "@/lib/parse-tags";
import { useIsHydrated } from "@/lib/use-is-hydrated";

export function BlogArticle({
  slug,
  seed,
}: {
  slug: string;
  seed?: BlogPost;
}) {
  const memberStories = useMemberStories();
  const isHydrated = useIsHydrated();
  const memberStory = findStoryBySlug(memberStories, slug);
  const seedStory = seed && !isStoryDeleted(seed.id) ? seed : undefined;
  const post = memberStory
    ? memberStory.status === "publish"
      ? memberStory
      : undefined
    : seedStory;

  if (!post) {
    if (!isHydrated) {
      return (
        <p className="site-shell px-4 py-16 text-sm text-warm-gray sm:px-0">
          Loading this story…
        </p>
      );
    }

    return (
      <NotFoundPanel
        heading="Story not found"
        text="This story may still be a draft, or it was only saved in this browser session."
      />
    );
  }

  const related = publishedStories(memberStories)
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);
  const minutes = readingMinutes(post);
  const paragraphs = post.content.split(/\n\s*\n/).filter(Boolean);
  const category = getBlogCategory(post.categoryId);

  return (
    <>
      <article className="site-shell px-4 py-12 sm:px-0 sm:py-16">
        <Reveal mode="load">
        <p className="heritage-eyebrow">{category.label}</p>
        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-warm-gray">
          <span className="inline-flex items-center gap-1.5">
            <User className="size-3.5 text-gold" strokeWidth={1.75} aria-hidden />
            By {post.authorName}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5 text-gold" strokeWidth={1.75} aria-hidden />
            {minutes} min read
          </span>
        </p>

        <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-warm-gray">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={index === 0 ? "text-lg text-espresso/90" : undefined}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {post.tags.length > 0 ? (
          <ul className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-espresso/8 px-3 py-1 text-sm text-espresso"
              >
                {formatTag(tag)}
              </li>
            ))}
          </ul>
        ) : null}

        <StoryActions story={post} />

        <div className="mt-10 border-t border-gold/20 pt-6">
          <p className="heritage-eyebrow mb-4">Share</p>
          <BlogShareLinks title={post.title} />
        </div>
        </Reveal>
      </article>

      {related.length > 0 ? (
        <div className="site-shell px-4 pb-16 sm:px-0 sm:pb-20">
          <Reveal>
            <SectionHeading
              eyebrow="More stories"
              title="Continue reading"
            />
          </Reveal>
          <Stagger className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <StaggerItem
                key={item.id}
                index={index}
                isHoverable
                className="h-full"
              >
                <BlogCard post={item} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      ) : null}
    </>
  );
}
