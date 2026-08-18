"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Feather } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HeritageDiamond, HeritageKnot } from "@/components/heritage-ornaments";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function Banner() {
  return (
    <section id="your-story-belongs-here" className="relative isolate">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/fortimage.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-espresso/96 via-espresso/84 to-espresso/50" />
        <div className="absolute inset-0 bg-gold/8" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-espresso to-transparent" />
      </div>

      <div className="site-shell px-4 pt-16 pb-14 sm:px-0 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.4, ease }}
        >
          <p className="flex items-center gap-2.5">
            <HeritageKnot />
            <span className="heritage-eyebrow">Be Part of Our Journey</span>
          </p>

          <h2 className="mt-5 max-w-3xl font-heading text-3xl font-semibold tracking-tight text-ivory sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Help Write the Next
            <br />
            Chapter of Our Heritage
          </h2>

          <div className="mt-6 flex max-w-xs items-center gap-3" aria-hidden>
            <span className="h-px flex-1 bg-gold/40" />
            <HeritageDiamond />
            <span className="h-px flex-1 bg-gold/40" />
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ivory/80 sm:text-base">
            Gorsi Nama is more than a collection of stories — it&apos;s a living
            legacy. Share your memories and knowledge so the next generation
            inherits more than a name.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/blog/write"
              className={cn(
                buttonVariants({
                  className:
                    "h-12 w-full gap-2.5 bg-gold px-6 text-base font-semibold text-espresso hover:bg-gold/90 sm:h-14 sm:w-auto sm:px-7",
                })
              )}
            >
              <Feather className="size-5" strokeWidth={1.75} />
              Share Your Story
              <ArrowRight className="size-5 rtl:rotate-180" />
            </Link>
            <Link
              href="/auth/signup"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  className:
                    "h-12 w-full gap-2.5 border-ivory/40 bg-transparent px-6 text-base font-semibold text-ivory hover:bg-ivory/10 hover:text-ivory sm:h-14 sm:w-auto sm:px-7",
                })
              )}
            >
              Join Community
              <ArrowRight className="size-5 rtl:rotate-180" />
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="relative border-t border-gold/20 bg-espresso">
        <div
          aria-hidden
          className="h-9 bg-[url('/card-pattern.png')] bg-repeat-x bg-center bg-size-[auto_180%] opacity-40 sm:h-10"
        />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-espresso px-4">
          <HeritageKnot />
        </span>
      </div>
    </section>
  );
}
