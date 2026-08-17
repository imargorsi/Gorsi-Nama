import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { HeritageDiamond } from "@/components/heritage-ornaments";
import {
  authorInitials,
  readingMinutes,
  type BlogPost,
} from "@/data/blog-posts";

export function BlogCard({
  post,
  variant = "compact",
}: {
  post: BlogPost;
  variant?: "featured" | "compact";
}) {
  const href = `/blog/${post.slug}`;

  if (variant === "featured") {
    return (
      <Link
        href={href}
        className="group flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-xl border border-gold/70 bg-ivory shadow-md transition-shadow duration-300 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:outline-none"
      >
        <div className="relative min-h-48 flex-1 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-espresso/88 via-espresso/25 to-espresso/10" />
          <span className="absolute top-3 start-3 rounded-md bg-gold px-2 py-0.5 font-sans text-[0.65rem] font-semibold tracking-[0.18em] text-espresso uppercase">
            Featured
          </span>
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <h3 className="line-clamp-3 font-heading text-lg font-semibold tracking-tight text-ivory sm:text-xl sm:leading-snug">
              {post.title}
            </h3>
            <div className="mt-2.5 flex items-center gap-3" aria-hidden>
              <span className="h-px w-8 bg-gold/50" />
              <HeritageDiamond className="size-1.5 bg-gold" />
              <span className="h-px w-8 bg-gold/50" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 px-4 py-3 sm:px-5">
          <p className="line-clamp-2 text-sm leading-snug text-warm-gray">{post.desc}</p>
          <PostMeta post={post} cta="Read Full Story" />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
        className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-gold/70 bg-ivory shadow-md transition-shadow duration-300 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:outline-none"
      >
        <div className="relative min-h-28 flex-1 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {post.category ? (
          <span className="absolute top-2.5 start-2.5 rounded-md bg-espresso/85 px-2 py-0.5 font-sans text-[0.65rem] font-semibold tracking-[0.16em] text-ivory uppercase">
            {post.category}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 px-4 py-3">
        <h3 className="line-clamp-2 font-heading text-base font-semibold tracking-tight text-espresso sm:text-lg sm:leading-snug">
          {post.title}
        </h3>
        <PostMeta post={post} cta="Read More" className="mt-auto" />
      </div>
    </Link>
  );
}

function PostMeta({
  post,
  cta,
  className,
}: {
  post: BlogPost;
  cta: string;
  className?: string;
}) {
  const minutes = readingMinutes(post);

  return (
    <div className={cn("flex min-w-0 items-center gap-3", className)}>
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-espresso ring-1 ring-gold/45">
        <span className="font-heading text-[0.65rem] font-semibold tracking-wide text-ivory">
          {authorInitials(post.author)}
        </span>
      </span>
      <p className="min-w-0 truncate text-xs text-warm-gray">
        By {post.author}
        <span className="text-gold/50"> · </span>
        {minutes} min read
      </p>
      <span className="ms-auto inline-flex shrink-0 items-center gap-1.5 text-sm font-medium tracking-wide text-gold">
        <span className="hidden sm:inline">{cta}</span>
        <ArrowRight
          className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
          strokeWidth={1.75}
        />
      </span>
    </div>
  );
}
