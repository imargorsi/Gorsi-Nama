import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
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
      <PageBreadcrumb title="Stories" />
      <BlogArticle slug={slug} seed={seed} />
    </>
  );
}
