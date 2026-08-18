import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb, pageBanner } from "@/components/page-breadcrumb";
import { BlogArticle } from "@/components/blog/blog-article";
import { getBlogPostBySlug, blogPosts } from "@/data/blog-posts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Story | Gorsi Nama" };
  return {
    title: `${post.title} | Gorsi Nama`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const seed = getBlogPostBySlug(slug);

  return (
    <>
      <PageBreadcrumb
        image={seed?.featuredImage || pageBanner.stories}
        eyebrow="Stories"
        title={seed?.title ?? "Story"}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Stories", href: "/blog" },
          { label: seed?.title ?? "Story" },
        ]}
        description={seed?.excerpt}
      />
      <BlogArticle slug={slug} seed={seed} />
    </>
  );
}
