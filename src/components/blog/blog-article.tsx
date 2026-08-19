import { BlogCard } from "@/components/blog/blog-card";
import { getBlogCategory } from "@/components/blog/blog-categories";
import type { BlogPost } from "@/components/blog/blog.schemas";
import { StoryArticleSidebar } from "@/components/blog/story-article-sidebar";
import { StoryImage } from "@/components/blog/story-image";
import { SectionHeading } from "@/components/home/section-heading";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { surfaceClass } from "@/components/surface";
import { Heading, Text } from "@/components/typography";
import { cn } from "@/lib/utils";

function StoryBreadcrumb({ title }: { title: string }) {
  return (
    <PageBreadcrumb
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Stories", href: "/blog" },
        { label: title },
      ]}
    />
  );
}

export function BlogArticle({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  const paragraphs = post.content.split(/\n\s*\n/).filter(Boolean);
  const category = getBlogCategory(post.categoryId);

  return (
    <>
      <StoryBreadcrumb title={post.title} />
      <article className="site-shell px-4 pt-8 pb-16 sm:px-0 sm:pt-10 sm:pb-20">
        <Reveal mode="load">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_19.5rem] lg:items-start">
            <div className={cn(surfaceClass, "overflow-hidden")}>
              <div className="px-5 py-6 sm:px-8 sm:py-8">
                <p className="heritage-eyebrow">{category.label}</p>
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
            <SectionHeading eyebrow="More stories" title="Continue Reading" />
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
