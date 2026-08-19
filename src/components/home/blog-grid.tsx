"use client";

import { ArrowRight, BookOpen, PenLine } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AccentIcon } from "@/components/accent-icon";
import { BlogCard } from "@/components/blog/blog-card";
import { useHomeStories } from "@/components/blog/use-stories";
import { StoryHomeSkeleton } from "@/components/blog/story-skeletons";
import { EmptyWell } from "@/components/empty-well";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { HeritagePatternBand } from "@/components/heritage-ornaments";
import { Heading, Text } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { SectionLink } from "./section-link";

export function BlogGrid() {
  const home = useHomeStories();
  const stories = home.data?.stories ?? [];
  const [featured, ...rest] = stories;
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
            description={
              <>
                Every family carries memories worth preserving.
                <br />
                Discover the stories that connect generations.
              </>
            }
          >
            <SectionLink href="/blog">View All</SectionLink>
          </SectionHeading>
        </Reveal>

        {home.isError ? (
          <EmptyWell
            className="mt-8"
            icon={BookOpen}
            title="Could Not Load Stories"
            text="Refresh the page to try again."
          />
        ) : home.isLoading ? (
          <StoryHomeSkeleton />
        ) : !featured ? (
          <EmptyWell
            className="mt-8"
            icon={BookOpen}
            title="No Published Stories Yet"
            text="The first published story from the community will appear here."
          />
        ) : (
          <Stagger className="mt-8 grid grid-cols-1 gap-4 lg:mt-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-stretch lg:gap-5">
            <StaggerItem
              index={0}
              isHoverable
              className="flex h-full min-h-0 flex-col"
            >
              <BlogCard post={featured} variant="featured" />
            </StaggerItem>

            <div className="grid h-full min-h-0 min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2">
              {stacked.map((post, index) => (
                <StaggerItem
                  key={post.id}
                  index={index + 1}
                  isHoverable
                  className="flex h-full min-h-0 flex-col"
                >
                  <BlogCard
                    post={post}
                    variant="compact"
                    className="[&_[data-slot=media]]:aspect-auto [&_[data-slot=media]]:h-36 lg:[&_[data-slot=media]]:h-40"
                  />
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        )}

        <Reveal className="mt-10 sm:mt-12">
          <StoryShareBar />
        </Reveal>
      </div>
    </section>
  );
}

function StoryShareBar() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-espresso px-5 py-8 sm:px-8 sm:py-10">
      <HeritagePatternBand />
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <AccentIcon icon={PenLine} size="lg" tone="on-dark" />
        <div className="min-w-0 flex-1">
          <Heading as="p" variant="h4" tone="onDark">
            Have a Story to Share?
          </Heading>
          <Text as="p" variant="small" className="mt-1 text-ivory/70">
            Your memories are a part of our shared heritage.
          </Text>
        </div>
        <Link
          href="/blog/write"
          className={cn(
            buttonVariants({
              variant: "light",
              className: "w-full sm:w-auto",
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
