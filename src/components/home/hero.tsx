"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion } from "motion/react";
import { ArrowRight, BookOpen, Calendar, Diamond, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stats = [
  {
    icon: Users,
    label: "Global Community",
    value: "Connecting Gorsi Worldwide",
  },
  {
    icon: BookOpen,
    label: "Stories & Archives",
    value: "A Growing Digital Library",
  },
  {
    icon: Calendar,
    label: "Generations",
    value: "Centuries of Heritage",
  },
];

const thumbnails = [
  { src: "/hero.jpg", grayscale: false },
  { src: "/oldhsitory.jpg", grayscale: false },
  { src: "/history__image__4.jpg", grayscale: true },
];

export function Hero() {
  return (
    <section className="relative isolate -mt-28 overflow-hidden sm:-mt-32">
      <Image
        src="/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-espresso/85 via-espresso/55 to-espresso/25" />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 pt-40 pb-20 sm:px-6 sm:pt-48 sm:pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-gold uppercase">
            <Diamond className="size-3 fill-gold" />
            Preserving Our Legacy
          </div>

          <h1 className="font-heading text-4xl font-semibold text-ivory sm:text-5xl lg:text-6xl">
            Discover the Legacy
            <br />
            of the <span className="text-gold">Gorsi Tribe</span>
          </h1>

          <p className="max-w-md text-base leading-relaxed text-parchment/80">
            Unveiling our rich history, traditions, achievements and uniting
            generations across the world.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/history"
              className={cn(
                buttonVariants({
                  className: "h-11 gap-2 bg-gold px-6 text-ivory hover:bg-gold/90",
                })
              )}
            >
              Explore Our History
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/library"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  className:
                    "h-11 border-ivory/30 bg-transparent px-6 text-ivory hover:bg-ivory/10",
                })
              )}
            >
              Browse Library
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-3">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Icon className="size-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-ivory">{label}</span>
                  <span className="text-xs text-parchment/60">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="hidden lg:flex lg:flex-col lg:items-center lg:gap-4"
        >
          <div className="flex gap-3">
            {thumbnails.map((thumb, index) => (
              <div
                key={thumb.src}
                className={cn(
                  "relative h-40 shrink-0 overflow-hidden rounded-xl",
                  index === 0 ? "w-32 ring-2 ring-gold" : "w-24 ring-1 ring-ivory/20"
                )}
              >
                <Image
                  src={thumb.src}
                  alt=""
                  fill
                  sizes="160px"
                  className={cn("object-cover", thumb.grayscale && "grayscale")}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-1.5">
            {thumbnails.map((thumb, index) => (
              <span
                key={thumb.src}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  index === 0 ? "w-6 bg-gold" : "w-1.5 bg-ivory/30"
                )}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
