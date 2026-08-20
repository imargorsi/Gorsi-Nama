import { BlogCard } from "@/components/blog/blog-card";
import type { BlogPost } from "@/components/blog/blog.schemas";
import { StoryArticleSidebar } from "@/components/blog/story-article-sidebar";
import { StoryImage } from "@/components/blog/story-image";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/home/section-heading";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { surfaceClass } from "@/components/surface";
import { Heading, Text } from "@/components/typography";
import { articleJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";

export async function BlogArticle({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  const t = await getTranslations("Stories");
  const common = await getTranslations("Common");
  const locale = await getLocale();
  const paragraphs = post.content.split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          locale,
          slug: post.slug,
          title: post.title,
          description: post.excerpt,
          image: post.featuredImage,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          authorName: post.authorName,
          publisherName: common("brandName"),
        })}
      />
      <PageBreadcrumb
        crumbs={[
          { label: common("home"), href: "/" },
          { label: t("crumb"), href: "/blog" },
          { label: post.title },
        ]}
      />
      <article className="site-shell px-4 pt-8 pb-16 sm:px-0 sm:pt-10 sm:pb-20">
        <Reveal mode="load">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_19.5rem] lg:items-start">
            <div className={cn(surfaceClass, "overflow-hidden")}>
              <div className="px-5 py-6 sm:px-8 sm:py-8">
                <p className="heritage-eyebrow">
                  {t(`categories.${post.categoryId}`)}
                </p>
                <Heading as="h1" variant="h1" className="mt-3">
                  {post.title}
                </Heading>
                {post.excerpt ? (
                  <Text variant="lead" className="mt-4">
                    {post.excerpt}
                  </Text>
                ) : null}

                {post.featuredImage ? (
                  <StoryImage
                    src={post.featuredImage}
                    alt={post.title}
                    className="mt-6"
                  />
                ) : null}

                <div className="mt-6 space-y-5 border-t border-espresso/10 pt-6">
                  {paragraphs.map((paragraph, index) => (
                    <Text key={index} variant="muted">
                      {paragraph}
                    </Text>
                  ))}
                </div>
              </div>
            </div>

            <StoryArticleSidebar post={post} />
          </div>
        </Reveal>
      </article>

      {related.length > 0 ? (
        <div className="site-shell px-4 pb-16 sm:px-0 sm:pb-8">
          <Reveal>
            <SectionHeading
              eyebrow={t("relatedEyebrow")}
              title={t("relatedTitle")}
            />
          </Reveal>
          <Stagger className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {related.map((item, index) => (
              <StaggerItem
                key={item.id}
                index={index}
                isHoverable
                className="h-full min-w-0"
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
