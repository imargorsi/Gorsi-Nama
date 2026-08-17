"use client";

import { motion } from "motion/react";
import { ArrowRight, PenLine } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { BlogCard } from "@/components/blog/blog-card";
import { HeritageDiamond } from "@/components/heritage-ornaments";
import { buttonVariants } from "@/components/ui/button";
import { blogPosts } from "@/data/blog-posts";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const softBrownButton =
  "h-11 gap-2 rounded-lg border-transparent bg-[color-mix(in_srgb,var(--gorsi-gold)_52%,var(--gorsi-ivory))] px-5 text-sm font-semibold text-espresso shadow-none hover:bg-[color-mix(in_srgb,var(--gorsi-gold)_64%,var(--gorsi-ivory))]";

export function BlogGrid() {
  const [featured, ...rest] = blogPosts;
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
          className="flex flex-row items-center justify-between gap-4 sm:gap-8"
        >
          <div className="min-w-0">
            <p className="heritage-eyebrow">From Our Community</p>
            <div className="mt-3 flex items-center gap-3" aria-hidden>
              <span className="h-px w-8 bg-gold/35" />
              <HeritageDiamond />
              <span className="h-px w-8 bg-gold/35" />
            </div>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-espresso sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Stories From Our People
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-warm-gray sm:text-base">
              Every family carries memories worth preserving. Discover the stories that connect
              generations.
            </p>
          </div>

          <Link
            href="/blog"
            className={cn(buttonVariants({ className: cn(softBrownButton, "w-fit shrink-0") }))}
          >
            View All
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
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
    <div className="relative mt-10 overflow-hidden rounded-xl border border-gold/70 bg-transparent px-5 py-5 sm:mt-12 sm:px-7 sm:py-6">
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
          href="/auth/signup"
          className={cn(
            buttonVariants({ className: cn(softBrownButton, "w-full sm:w-auto") })
          )}
        >
          Share Your Story
          <ArrowRight className="size-4 rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
}
