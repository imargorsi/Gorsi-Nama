import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BlogArticle } from "@/components/blog/blog-article";
import { StoryArticleSkeleton } from "@/components/blog/story-skeletons";
import { CallToAction } from "@/components/call-to-action";
import { NotFoundPanel } from "@/components/not-found-panel";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import type { BlogPost } from "@/components/blog/blog.schemas";
import { pageMetadata } from "@/lib/seo";
import {
  getPublishedStoryBySlug,
  listRelatedStories,
} from "@/lib/stories/queries";

export const dynamic = "force-dynamic";

async function StoryJoinCta() {
  const t = await getTranslations("Stories");
  return (
    <CallToAction
      eyebrow={t("ctaEyebrow")}
      title={t("ctaTitle")}
      text={t("ctaText")}
      buttonText={t("ctaButton")}
      href="/blog/write"
    />
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "Stories" });
  const common = await getTranslations({ locale, namespace: "Common" });
  try {
    const post = await getPublishedStoryBySlug(slug);
    if (!post) {
      return pageMetadata({
        locale,
        href: `/blog/${slug}`,
        title: t("metaFallback"),
        index: false,
      });
    }
    return pageMetadata({
      locale,
      href: `/blog/${post.slug}`,
      title: `${post.title} | ${common("brandName")}`,
      description: post.excerpt,
      type: "article",
      image: post.featuredImage,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.authorName],
    });
  } catch {
    return pageMetadata({
      locale,
      href: `/blog/${slug}`,
      title: t("metaFallback"),
      index: false,
    });
  }
}

async function BlogArticleBody({ slug }: { slug: string }) {
  const t = await getTranslations("Stories");
  const common = await getTranslations("Common");
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
            { label: common("home"), href: "/" },
            { label: t("crumb"), href: "/blog" },
            { label: t("storyCrumb") },
          ]}
        />
        <NotFoundPanel heading={t("notFoundHeading")} text={t("notFoundText")} />
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
