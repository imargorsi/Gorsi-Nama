import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { BlogCard } from "@/components/blog/blog-card";
import { blogPosts } from "@/data/blog-posts";
import { SectionHeading } from "./section-heading";

export function BlogGrid() {
  const [featured, ...rest] = blogPosts;
  const compactPosts = rest.slice(0, 3);

  return (
    <section className="site-shell px-4 py-16 sm:px-0">
      <SectionHeading
        title="Stories From Our People"
        description="Every family carries memories worth preserving. Discover the stories that connect generations."
      />
      <Separator className="mt-6 mb-8" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {featured && <BlogCard post={featured} variant="featured" />}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-1">
          {compactPosts.map((post) => (
            <BlogCard key={post.slug} post={post} variant="compact" />
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          Explore All Stories
          <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/auth/signup"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          Have a story worth preserving? Share Your Story
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
