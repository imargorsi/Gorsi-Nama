"use client";

import Image from "next/image";
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
import { NotFoundPanel } from "@/components/not-found-panel";
import { surfaceClass } from "@/components/surface";
import { readingMinutes, type BlogPost } from "@/data/blog-posts";
import { formatTag } from "@/lib/parse-tags";
import { useIsHydrated } from "@/lib/use-is-hydrated";
import { cn } from "@/lib/utils";

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
      return <p className="text-sm text-warm-gray">Loading this story…</p>;
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

  return (
    <>
      <article className="site-shell px-4 py-12 sm:px-0 sm:py-16">
        {post.featuredImage ? (
          <div
            className={cn(
              surfaceClass,
              "relative aspect-video w-full overflow-hidden"
            )}
          >
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        ) : null}

        <p className="heritage-eyebrow mt-8">
          {getBlogCategory(post.categoryId).label}
        </p>
        <h2 className="mt-3 max-w-3xl font-heading text-3xl font-semibold tracking-tight text-espresso sm:text-4xl">
          {post.title}
        </h2>
        <p className="mt-2 text-sm text-warm-gray">
          By {post.authorName}
          <span className="text-gold/50"> · </span>
          {minutes} min read
        </p>

        <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-warm-gray">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
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
          <p className="mb-3 text-sm font-medium text-espresso">Share this story</p>
          <BlogShareLinks title={post.title} />
        </div>
      </article>

      {related.length > 0 ? (
        <div className="site-shell px-4 pb-16 sm:px-0 sm:pb-20">
          <p className="heritage-eyebrow">More stories</p>
          <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-espresso sm:text-3xl">
            Continue reading
          </h3>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <BlogCard key={item.id} post={item} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
