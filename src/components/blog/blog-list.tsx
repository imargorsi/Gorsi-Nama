"use client";

import { useAuth } from "@clerk/nextjs";
import { PenLine } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { BlogCard } from "@/components/blog/blog-card";
import {
  publishedStories,
  useMemberStories,
} from "@/components/blog/member-stories";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BlogList() {
  const { isSignedIn } = useAuth();
  const posts = publishedStories(useMemberStories());

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="heritage-eyebrow">From Our People</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-espresso sm:text-4xl">
            Stories from our people
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-warm-gray sm:text-base">
            Stories, updates, and heritage articles from the Gorsi community.
          </p>
        </div>
        <Link
          href={isSignedIn ? "/blog/write" : "/auth/login"}
          className={cn(
            buttonVariants({
              className:
                "h-11 shrink-0 gap-2 bg-gold px-5 text-espresso hover:bg-gold/90",
            })
          )}
        >
          <PenLine className="size-4" />
          Write a story
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
