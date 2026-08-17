"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, BookOpen, Calendar, Diamond, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { HeroSlideControls } from "@/components/home/hero-slide-controls";
import {
  heroImageFade,
  heroKenBurnsDuration,
  heroStatItem,
  heroStatsContainer,
  slideContentContainer,
  slideContentItem,
} from "@/components/home/hero-motion";
import { cn } from "@/lib/utils";

const stats = [
  {
    icon: Users,
    label: "Global Community",
    value: "Connecting Gorsi worldwide",
  },
  {
    icon: BookOpen,
    label: "Stories & Archives",
    value: "Heritage, stories, and memory",
  },
  {
    icon: Calendar,
    label: "Generations",
    value: "A living intergenerational record",
  },
];

const slides = [
  {
    id: "gorsi-nama",
    image: "/hero.jpg",
    eyebrow: "Preserving Our Legacy",
    title: (
      <>
        Discover the Legacy
        <br />
        of the <span className="text-gold">Gorsi Tribe</span>
      </>
    ),
    description:
      "Unveiling our rich history, traditions, achievements and uniting generations across the world.",
    primaryCta: { label: "Explore Our History", href: "/history" },
    secondaryCta: { label: "Browse Library", href: "/library" },
  },
  {
    id: "history",
    image: "/oldhsitory.jpg",
    eyebrow: "Our History",
    title: (
      <>
        Where we came from
        <br />
        shapes who <span className="text-gold">we are today</span>
      </>
    ),
    description:
      "Trace the roots, milestones, and historical memory that continue to define the Gorsi story across time.",
    primaryCta: { label: "Explore Our History", href: "/history" },
    secondaryCta: { label: "Browse Library", href: "/library" },
  },
  {
    id: "people",
    image: "/history__image__4.jpg",
    eyebrow: "Notable Gorsi",
    title: (
      <>
        Meet the people
        <br />
        who <span className="text-gold">shaped our story</span>
      </>
    ),
    description:
      "Celebrate the lives, contributions, and presence of Gorsi figures whose legacy continues to inspire the community.",
    primaryCta: { label: "Meet Notable Gorsi", href: "/people" },
    secondaryCta: { label: "Explore Members", href: "/member" },
  },
] as const;

const AUTO_ADVANCE_MS = 7000;

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(interval);
  }, [isPaused, activeIndex]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLElement &&
        event.target.closest("input, textarea, [contenteditable='true']")
      ) {
        return;
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % slides.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section
      className="relative isolate min-h-svh bg-espresso"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      aria-label="Gorsi Nama hero"
    >
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={heroImageFade}
            className="absolute inset-0"
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.06 }}
              animate={{ scale: 1.02 }}
              transition={heroKenBurnsDuration(AUTO_ADVANCE_MS)}
            >
              <Image
                src={activeSlide.image}
                alt=""
                fill
                priority={activeIndex === 0}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-y-0 inset-s-0 -z-10 w-[80%] bg-linear-to-r from-espresso/96 via-espresso/82 to-transparent" />
      <div className="absolute inset-y-0 inset-s-0 -z-10 w-[48%] bg-gold/8 blur-3xl" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-espresso/55 via-transparent to-espresso/12" />

      <div className="site-shell relative flex min-h-svh flex-col justify-center gap-10 px-4 pt-28 pb-10 sm:gap-12 sm:px-0 sm:pt-40 sm:pb-16 lg:pt-48 lg:pb-28">
        <div className="grid w-full min-w-0 gap-12 lg:grid-cols-[minmax(0,1.08fr)_21rem] lg:items-end">
          <div className="min-w-0 max-w-4xl">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeSlide.id}
                variants={slideContentContainer}
                initial="hidden"
                animate="show"
                exit="exit"
                className="max-w-4xl"
              >
                <motion.div
                  variants={slideContentItem}
                  className="heritage-eyebrow flex items-center gap-2"
                >
                  <motion.span
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  >
                    <Diamond className="size-3 fill-gold" />
                  </motion.span>
                  {activeSlide.eyebrow}
                </motion.div>

                <motion.div variants={slideContentItem} className="mt-4 overflow-hidden">
                  <motion.div
                    className="heritage-rule"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                    style={{ originX: 0 }}
                    aria-hidden
                  />
                </motion.div>

                <motion.h1
                  variants={slideContentItem}
                  className="mt-6 max-w-2xl text-balance font-heading text-3xl font-semibold tracking-tight text-ivory sm:text-5xl lg:max-w-3xl lg:text-6xl lg:leading-[1.06]"
                >
                  {activeSlide.title}
                </motion.h1>

                <motion.p
                  variants={slideContentItem}
                  className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-ivory/80 sm:mt-6 sm:text-base lg:max-w-2xl lg:text-lg"
                >
                  {activeSlide.description}
                </motion.p>

                <motion.div variants={slideContentItem} className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                  <motion.div
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto"
                  >
                    <Link
                      href={activeSlide.primaryCta.href}
                      className={cn(
                        buttonVariants({
                          className:
                            "h-11 w-full gap-2 rounded-lg bg-gold px-6 text-sm font-semibold text-espresso shadow-md hover:bg-gold/90 sm:w-auto",
                        })
                      )}
                    >
                      {activeSlide.primaryCta.label}
                      <motion.span
                        className="inline-flex"
                        initial={false}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="size-4" />
                      </motion.span>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto"
                  >
                    <Link
                      href={activeSlide.secondaryCta.href}
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "h-11 w-full rounded-lg border-gold/50 bg-transparent px-6 text-sm font-semibold text-ivory shadow-none hover:bg-transparent hover:text-ivory sm:w-auto"
                      )}
                    >
                      {activeSlide.secondaryCta.label}
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <motion.div
              variants={heroStatsContainer}
              initial="hidden"
              animate="show"
              className="mt-10 flex flex-col gap-5 sm:mt-12 md:flex-row md:flex-wrap md:gap-x-8 md:gap-y-4 lg:gap-10"
            >
              {stats.map(({ icon: Icon, label, value }) => (
                <motion.div
                  key={label}
                  variants={heroStatItem}
                  className="flex min-w-0 items-start gap-3 md:max-w-xs lg:max-w-none"
                >
                  <Icon className="mt-0.5 size-4 shrink-0 text-gold" />
                  <div className="min-w-0">
                    <p className="font-sans text-sm font-semibold text-gold">
                      {label}
                    </p>
                    <p className="mt-1 font-sans text-sm text-ivory/75">
                      {value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <HeroSlideControls
            slides={slides}
            activeIndex={activeIndex}
            isPaused={isPaused}
            autoAdvanceMs={AUTO_ADVANCE_MS}
            onSelect={setActiveIndex}
            variant="desktop"
          />
        </div>

        <HeroSlideControls
          slides={slides}
          activeIndex={activeIndex}
          isPaused={isPaused}
          autoAdvanceMs={AUTO_ADVANCE_MS}
          onSelect={setActiveIndex}
          variant="mobile"
        />
      </div>
    </section>
  );
}
