import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BlogShareLinks } from "@/components/blog/blog-share-links";
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
  if (!post) return {};
  return {
    title: `${post.title} | Gorsi Nama`,
    description: post.desc,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <Image src={post.image} alt={post.title} fill className="object-cover" />
      </div>

      <h1 className="font-heading mt-8 text-3xl font-semibold sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">By {post.author}</p>

      <div className="mt-6 flex flex-col gap-4 text-muted-foreground">
        <p>{post.firstParagraph}</p>
        {post.secondParagraph && <p>{post.secondParagraph}</p>}
      </div>

      <div className="mt-10 border-t pt-6">
        <BlogShareLinks title={post.title} />
      </div>
    </article>
  );
}
