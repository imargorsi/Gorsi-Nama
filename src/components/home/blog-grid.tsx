import { Separator } from "@/components/ui/separator";
import { BlogCard } from "@/components/blog/blog-card";
import { blogPosts } from "@/data/blog-posts";

export function BlogGrid() {
  const [featured, ...rest] = blogPosts;
  const compactPosts = rest.slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
        Latest Articles and Writings
      </h2>
      <Separator className="mt-4 mb-8" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {featured && <BlogCard post={featured} variant="featured" />}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-1">
          {compactPosts.map((post) => (
            <BlogCard key={post.slug} post={post} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
