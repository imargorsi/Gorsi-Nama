"use client";

import { motion } from "motion/react";
import { ArrowRight, PenLine } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { BlogCard } from "@/components/blog/blog-card";
import {
  publishedStories,
  useMemberStories,
} from "@/components/blog/member-stories";
import { surfaceClass } from "@/components/surface";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { SectionLink } from "./section-link";

const ease = [0.22, 1, 0.36, 1] as const;

export function BlogGrid() {
  const [featured, ...rest] = publishedStories(useMemberStories());
  const stacked = rest.slice(0, 2);

  return (
    <section
      id="stories-from-our-people"
      className="relative scroll-mt-28 pt-10 pb-16 sm:scroll-mt-32 sm:pt-12 sm:pb-20"
    >
      <div className="site-shell px-4 sm:px-0">
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease }}
        >
          <SectionHeading
            eyebrow="From Our Community"
            title="Stories From Our People"
            description="Every family carries memories worth preserving. Discover the stories that connect generations."
          >
            <SectionLink href="/blog">View All</SectionLink>
          </SectionHeading>
        </motion.header>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
          }}
          className="mt-8 grid grid-cols-1 gap-4 lg:mt-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-stretch lg:gap-5"
        >
          {featured ? (
            <motion.div
              className="h-full min-h-0 min-w-0"
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
              }}
            >
              <BlogCard post={featured} variant="featured" />
            </motion.div>
          ) : null}

          <div className="grid h-full min-h-0 min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2">
            {stacked.map((post) => (
              <motion.div
                key={post.slug}
                className="h-full min-h-0 min-w-0"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
                }}
              >
                <BlogCard post={post} variant="compact" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <StoryShareBar />
      </div>
    </section>
  );
}

function StoryShareBar() {
  return (
    <div className={cn(surfaceClass, "relative mt-10 overflow-hidden px-5 py-5 sm:mt-12 sm:px-7 sm:py-6")}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-[url('/card-pattern.png')] bg-repeat-y bg-right bg-size-[auto_48%] opacity-20 mask-[linear-gradient(to_left,black_30%,transparent)] sm:w-56"
      />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold ring-1 ring-gold/40">
          <PenLine className="size-5" strokeWidth={1.75} />
        </span>
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
