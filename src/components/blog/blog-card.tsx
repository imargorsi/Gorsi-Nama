import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { getBlogCategory } from "@/components/blog/blog-categories";
import { surfaceClass } from "@/components/surface";
import { readingMinutes, type BlogPost } from "@/data/blog-posts";
import { initialsFromName } from "@/lib/initials";

export function BlogCard({
  post,
  variant = "compact",
  isFeatured = false,
}: {
  post: BlogPost;
  variant?: "featured" | "compact";
  isFeatured?: boolean;
}) {
  const href = `/blog/${post.slug}`;
  const category = getBlogCategory(post.categoryId).label;
  const isHero = variant === "featured";
  const showFeaturedBadge = isFeatured || isHero;

  return (
    <Link
      href={href}
      className={cn(
        surfaceClass,
        "group flex h-full min-w-0 flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:outline-none"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-espresso",
          isHero ? "min-h-48 flex-1" : "aspect-4/3"
        )}
      >
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            sizes={
              isHero
                ? "(min-width: 1024px) 50vw, 100vw"
                : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
            }
            className="object-cover"
          />
        ) : null}
        <span
          className={cn(
            "absolute top-2.5 inset-s-2.5 rounded-md px-2 py-0.5 font-sans text-[0.65rem] font-semibold tracking-[0.16em] uppercase",
            showFeaturedBadge
              ? "bg-gold text-espresso"
              : "bg-espresso/85 text-ivory"
          )}
        >
          {showFeaturedBadge ? "Featured" : category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 px-4 py-3 sm:px-5">
        <h3 className="line-clamp-2 font-heading text-base font-semibold tracking-tight text-espresso sm:text-lg sm:leading-snug">
          {post.title}
        </h3>
        <PostMeta post={post} className="mt-auto" />
      </div>
    </Link>
  );
}

function PostMeta({
  post,
  className,
}: {
  post: BlogPost;
  className?: string;
}) {
  const minutes = readingMinutes(post);

  return (
    <div className={cn("flex min-w-0 items-center gap-3", className)}>
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-espresso ring-1 ring-gold/45">
        <span className="font-heading text-[0.65rem] font-semibold tracking-wide text-ivory">
          {initialsFromName(post.authorName)}
        </span>
      </span>
      <p className="min-w-0 truncate text-xs text-warm-gray">
        By {post.authorName}
        <span className="text-gold/50"> · </span>
        {minutes} min read
      </p>
      <span className="ms-auto inline-flex shrink-0 items-center gap-1.5 text-sm font-medium tracking-wide text-gold">
        <span className="hidden sm:inline">Read More</span>
        <ArrowRight
          className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
          strokeWidth={1.75}
        />
      </span>
    </div>
  );
}
