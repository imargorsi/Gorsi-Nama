"use client";

import { useAuth } from "@clerk/nextjs";
import { BookOpen, PenLine } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AccentIcon } from "@/components/accent-icon";
import { BlogCard } from "@/components/blog/blog-card";
import {
  publishedStories,
  useMemberStories,
} from "@/components/blog/member-stories";
import { Stagger, StaggerItem } from "@/components/reveal";
import { surfaceClass } from "@/components/surface";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BlogWriteButton() {
  const { isSignedIn } = useAuth();

  return (
    <Link
      href={isSignedIn ? "/blog/write" : "/auth/login"}
      className={cn(
        buttonVariants({
          className:
            "h-11 w-full shrink-0 gap-2 bg-gold px-5 text-espresso hover:bg-gold/90 sm:w-auto",
        })
      )}
    >
      <PenLine className="size-4" />
      Write a story
    </Link>
  );
}

export function BlogList() {
  const posts = publishedStories(useMemberStories());

  if (posts.length === 0) {
    return (
      <div
        className={cn(
          surfaceClass,
          "flex flex-col items-center gap-3 px-5 py-14 text-center"
        )}
      >
        <AccentIcon icon={BookOpen} size="lg" />
        <p className="font-heading text-lg font-semibold text-espresso">
          No published stories yet
        </p>
        <p className="max-w-sm text-sm leading-relaxed text-warm-gray">
          The first published story from the community will appear here.
        </p>
      </div>
    );
  }

  return (
    <Stagger
      mode="load"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {posts.map((post, index) => (
        <StaggerItem key={post.id} index={index} isHoverable className="h-full">
          <BlogCard post={post} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
