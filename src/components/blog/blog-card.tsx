import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/data/blog-posts";

export function BlogCard({
  post,
  variant = "featured",
}: {
  post: BlogPost;
  variant?: "featured" | "compact";
}) {
  const isCompact = variant === "compact";

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden py-0 gap-0 transition-shadow hover:shadow-md">
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-t-xl",
            isCompact ? "aspect-16/10" : "aspect-16/9"
          )}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="flex flex-col gap-2 py-4">
          <h3
            className={cn(
              "font-heading font-semibold leading-snug text-foreground",
              isCompact ? "text-base" : "text-xl"
            )}
          >
            {post.title}
          </h3>
          {!isCompact && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {post.desc}
            </p>
          )}
          <p className="text-xs text-muted-foreground">By {post.author}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
