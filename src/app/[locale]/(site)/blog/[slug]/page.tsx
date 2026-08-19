import type { Metadata } from "next";
import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { BlogArticle } from "@/components/blog/blog-article";
import { StoryArticleSkeleton } from "@/components/blog/story-skeletons";
import { CallToAction } from "@/components/call-to-action";
import { NotFoundPanel } from "@/components/not-found-panel";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import type { BlogPost } from "@/components/blog/blog.schemas";
import {
  getPublishedStoryBySlug,
  listRelatedStories,
} from "@/lib/stories/queries";

export const dynamic = "force-dynamic";

function StoryJoinCta() {
  return (
    <CallToAction
      eyebrow="From Our People"
      title="Share a Story From Your Family"
      text="Share the stories, memories, photographs, and family history that have shaped your heritage for generations to come."
      buttonText="Write a story"
      href="/blog/write"
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPublishedStoryBySlug(slug);
    if (!post) return { title: "Story | Gujjar Nama" };
    return {
      title: `${post.title} | Gujjar Nama`,
      description: post.excerpt,
    };
  } catch {
    return { title: "Story | Gujjar Nama" };
  }
}

async function BlogArticleBody({ slug }: { slug: string }) {
  let post: BlogPost | undefined;
  let related: BlogPost[] = [];
  try {
    post = await getPublishedStoryBySlug(slug);
    related = post ? await listRelatedStories(post.slug) : [];
  } catch {
    post = undefined;
  }

  if (!post) {
    return (
      <>
        <PageBreadcrumb
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Stories", href: "/blog" },
            { label: "Story" },
          ]}
        />
        <NotFoundPanel
          heading="Story not found"
          text="This story may still be a draft, or it is no longer published."
        />
      </>
    );
  }

  return <BlogArticle post={post} related={related} />;
}

export default async function BlogPostPage({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Suspense fallback={<StoryArticleSkeleton />}>
        <BlogArticleBody slug={slug} />
      </Suspense>
      <StoryJoinCta />
    </>
  );
}
