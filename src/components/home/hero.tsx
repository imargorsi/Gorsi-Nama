"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, BookOpen, Calendar, Diamond, Users } from "lucide-react";
import { HeritageRule } from "@/components/heritage-ornaments";
import { buttonVariants } from "@/components/ui/button";
import { HeroSlideControls } from "@/components/home/hero-slide-controls";
import { useHeroAutoplay } from "@/components/home/use-hero-autoplay";
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
    id: "heritage",
    image: "/slider/1.jpg",
    eyebrow: "Our Heritage",
    preview: "Discover the clan",
    title: (
      <>
        <span className="block whitespace-nowrap">Discover the Legacy of</span>
        <span className="block whitespace-nowrap">
          the Gorsi Clan & <span className="text-gold">Our Heritage</span>
        </span>
      </>
    ),
    description:
      "Gorsi Nama is a digital home for the Gorsi clan — a place to discover who we are, where we come from, and the heritage we still carry.",
    primaryCta: { label: "Explore Our Community", href: "/community" },
    secondaryCta: { label: "Browse Library", href: "/library" },
  },
  {
    id: "community",
    image: "/slider/2.png",
    eyebrow: "Our Community",
    preview: "Connect worldwide",
    title: (
      <>
        <span className="block whitespace-nowrap">Connecting the Gorsi</span>
        <span className="block whitespace-nowrap">
          Community <span className="text-gold">Worldwide</span>
        </span>
      </>
    ),
    description:
      "Find Gorsi people across cities and countries. Share photographs and conversation on the community feed, stay connected with the clan.",
    primaryCta: { label: "Explore Our Community", href: "/community" },
    secondaryCta: { label: "Browse Library", href: "/library" },
  },
  {
    id: "history",
    image: "/slider/3.png",
    eyebrow: "Our History",
    preview: "Read the chronicle",
    title: (
      <>
        <span className="block whitespace-nowrap">The History Written</span>
        <span className="block whitespace-nowrap">
          by <span className="text-gold">Our Forefathers</span>
        </span>
      </>
    ),
    description:
      "The Gorsi clan is a Gujjar people whose story runs through migration, settlement, and cultural memory across the Indian subcontinent. This is the chronicle they began — and that we still keep.",
    primaryCta: { label: "Explore Our Community", href: "/community" },
    secondaryCta: { label: "Browse Library", href: "/library" },
  },
] as const;

const AUTO_ADVANCE_MS = 7000;

export function Hero() {
  const { activeIndex, setIsPaused, progress, select } = useHeroAutoplay(
    slides.length,
    AUTO_ADVANCE_MS
  );
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLElement &&
        event.target.closest("input, textarea, [contenteditable='true']")
      ) {
        return;
      }
      if (event.key === "ArrowLeft") {
        select((activeIndex - 1 + slides.length) % slides.length);
      }
      if (event.key === "ArrowRight") {
        select((activeIndex + 1) % slides.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, select]);

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

                <motion.h1
                  variants={slideContentItem}
                  className="mt-6 min-w-0 font-heading text-[clamp(1.2rem,4.4vw,3rem)] font-semibold leading-[1.15] tracking-tight text-ivory"
                >
                  {activeSlide.title}
                </motion.h1>

                <motion.div variants={slideContentItem} className="mt-5">
                  <HeritageRule />
                </motion.div>

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
                          className: "w-full shadow-md sm:w-auto",
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
                        buttonVariants({ variant: "outlineLight" }),
                        "w-full border-gold/50 sm:w-auto"
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
            progress={progress}
            onSelect={select}
            setIsPaused={setIsPaused}
            variant="desktop"
          />
        </div>

        <HeroSlideControls
          slides={slides}
          activeIndex={activeIndex}
          progress={progress}
          onSelect={select}
          setIsPaused={setIsPaused}
          variant="mobile"
        />
      </div>
    </section>
  );
}
