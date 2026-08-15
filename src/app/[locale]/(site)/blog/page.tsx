import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { BlogCard } from "@/components/blog/blog-card";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog | Gorsi Nama",
  description: "Stories, updates, and heritage articles from the Gorsi community.",
};

export default async function BlogPage({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold">Blog</h1>
      <p className="mt-2 text-muted-foreground">
        Stories, updates, and heritage articles from the Gorsi community.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} post={post} variant="featured" />
        ))}
      </div>
    </div>
  );
}
