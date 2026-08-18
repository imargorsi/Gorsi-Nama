"use client";

import { ArrowRight, PenLine } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AccentIcon } from "@/components/accent-icon";
import { BlogCard } from "@/components/blog/blog-card";
import {
  publishedStories,
  useMemberStories,
} from "@/components/blog/member-stories";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { surfaceClass } from "@/components/surface";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { SectionLink } from "./section-link";

export function BlogGrid() {
  const [featured, ...rest] = publishedStories(useMemberStories());
  const stacked = rest.slice(0, 2);

  return (
    <section
      id="stories-from-our-people"
      className="relative scroll-mt-28 pt-10 pb-16 sm:scroll-mt-32 sm:pt-12 sm:pb-20"
    >
      <div className="site-shell px-4 sm:px-0">
        <Reveal as="header">
          <SectionHeading
            eyebrow="From Our Community"
            title="Stories From Our People"
            description="Every family carries memories worth preserving. Discover the stories that connect generations."
          >
            <SectionLink href="/blog">View All</SectionLink>
          </SectionHeading>
        </Reveal>

        <Stagger className="mt-8 grid grid-cols-1 gap-4 lg:mt-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-stretch lg:gap-5">
          {featured ? (
            <StaggerItem index={0} isHoverable className="h-full min-h-0">
              <BlogCard post={featured} variant="featured" />
            </StaggerItem>
          ) : null}

          <div className="grid h-full min-h-0 min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2">
            {stacked.map((post, index) => (
              <StaggerItem
                key={post.slug}
                index={index + 1}
                isHoverable
                className="h-full min-h-0"
              >
                <BlogCard post={post} variant="compact" />
              </StaggerItem>
            ))}
          </div>
        </Stagger>

        <Reveal className="mt-10 sm:mt-12">
          <StoryShareBar />
        </Reveal>
      </div>
    </section>
  );
}

function StoryShareBar() {
  return (
    <div className={cn(surfaceClass, "px-5 py-5 sm:px-7 sm:py-6")}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <AccentIcon icon={PenLine} size="lg" />
        <div className="min-w-0 flex-1">
          <p className="font-heading text-xl font-semibold tracking-tight text-espresso">
            Have a story to share?
          </p>
          <p className="mt-1 text-sm text-warm-gray">
            Your memories are a part of our shared heritage.
          </p>
        </div>
        <Link
          href="/blog/write"
          className={cn(
            buttonVariants({
              className: "h-11 w-full gap-2 bg-gold px-5 text-espresso hover:bg-gold/90 sm:w-auto",
            })
          )}
        >
          Share Your Story
          <ArrowRight className="size-4 rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
}
