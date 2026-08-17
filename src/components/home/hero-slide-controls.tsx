"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import {
  mobileThumbContainer,
  mobileThumbItem,
  slideControlItem,
  slideControlsContainer,
} from "@/components/home/hero-motion";
import { cn } from "@/lib/utils";

type HeroSlide = {
  id: string;
  image: string;
  eyebrow: string;
  primaryCta: { label: string };
};

function SlideProgress({
  slides,
  activeIndex,
  isPaused,
  autoAdvanceMs,
  onSelect,
  className,
}: {
  slides: readonly HeroSlide[];
  activeIndex: number;
  isPaused: boolean;
  autoAdvanceMs: number;
  onSelect: (index: number) => void;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex items-center gap-2", className)}
      role="tablist"
      aria-label="Hero slide progress"
    >
      {slides.map((slide, index) => (
        <button
          key={slide.id}
          type="button"
          role="tab"
          aria-selected={activeIndex === index}
          aria-label={`Slide ${index + 1}: ${slide.eyebrow}`}
          onClick={() => onSelect(index)}
          className="relative h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-ivory/15"
        >
          {index < activeIndex ? (
            <motion.span
              layout
              className="absolute inset-0 rounded-full bg-gold/80"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : null}
          {index === activeIndex ? (
            <span
              key={`progress-${activeIndex}`}
              className="absolute inset-y-0 inset-s-0 w-full origin-[inline-start] rounded-full bg-gold fill-mode-[forwards] [animation-name:hero-slide-progress] [animation-timing-function:linear]"
              style={{
                animationDuration: `${autoAdvanceMs}ms`,
                animationPlayState: isPaused ? "paused" : "running",
              }}
            />
          ) : null}
        </button>
      ))}
    </motion.div>
  );
}

function DesktopSlideCard({
  slide,
  index,
  isActive,
  onSelect,
}: {
  slide: HeroSlide;
  index: number;
  isActive: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(index)}
      aria-label={`Show ${slide.eyebrow}`}
      aria-current={isActive}
      whileHover={{ x: isActive ? 0 : 4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className={cn(
        "group relative flex w-full items-center gap-4 rounded-xl border p-3 text-start backdrop-blur-sm",
        isActive
          ? "border-gold/35 bg-espresso/55 shadow-md ring-1 ring-gold/15"
          : "border-ivory/10 bg-espresso/30 hover:border-gold/25 hover:bg-espresso/40"
      )}
    >
      <motion.div
        layout
        className={cn(
          "absolute inset-0 rounded-xl bg-gold/5",
          isActive ? "opacity-100" : "opacity-0"
        )}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />
      <div className="relative h-22 w-24 shrink-0 overflow-hidden rounded-lg ring-1 ring-ivory/10">
        <motion.div
          animate={{ scale: isActive ? 1.04 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt=""
            fill
            sizes="96px"
            className={cn("object-cover transition-[filter] duration-500", !isActive && "grayscale")}
          />
        </motion.div>
      </div>
      <div className="relative min-w-0">
        <p className="font-sans text-[0.65rem] font-semibold tracking-[0.22em] text-gold uppercase">
          0{index + 1}
        </p>
        <p className="mt-1 font-heading text-lg text-ivory">{slide.eyebrow}</p>
        <p className="mt-1 font-sans text-sm text-ivory/70">{slide.primaryCta.label}</p>
      </div>
      <motion.span
        className="relative ms-auto shrink-0"
        animate={{ x: isActive ? 2 : 0, opacity: isActive ? 1 : 0.4 }}
        transition={{ duration: 0.25 }}
      >
        <ArrowRight className="size-4 text-ivory/40 group-hover:text-gold" />
      </motion.span>
    </motion.button>
  );
}

export function HeroSlideControls({
  slides,
  activeIndex,
  isPaused,
  autoAdvanceMs,
  onSelect,
  variant,
}: {
  slides: readonly HeroSlide[];
  activeIndex: number;
  isPaused: boolean;
  autoAdvanceMs: number;
  onSelect: (index: number) => void;
  variant: "desktop" | "mobile";
}) {
  if (variant === "desktop") {
    return (
      <motion.div
        variants={slideControlsContainer}
        initial="hidden"
        animate="show"
        className="hidden w-full max-w-sm space-y-3 lg:block"
      >
        {slides.map((slide, index) => (
          <motion.div key={slide.id} variants={slideControlItem}>
            <DesktopSlideCard
              slide={slide}
              index={index}
              isActive={activeIndex === index}
              onSelect={onSelect}
            />
          </motion.div>
        ))}
        <SlideProgress
          slides={slides}
          activeIndex={activeIndex}
          isPaused={isPaused}
          autoAdvanceMs={autoAdvanceMs}
          onSelect={onSelect}
          className="pt-1"
        />
      </motion.div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-3 lg:hidden">
      <motion.div
        variants={mobileThumbContainer}
        initial="hidden"
        animate="show"
        className="flex gap-3"
      >
        {slides.map((slide, index) => (
          <motion.button
            key={slide.id}
            type="button"
            variants={mobileThumbItem}
            onClick={() => onSelect(index)}
            aria-label={`Show ${slide.eyebrow}`}
            aria-current={activeIndex === index}
            whileTap={{ scale: 0.94 }}
            animate={{
              scale: activeIndex === index ? 1.04 : 1,
              opacity: activeIndex === index ? 1 : 0.72,
            }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className={cn(
              "relative h-16 w-20 overflow-hidden rounded-lg sm:h-20 sm:w-24",
              activeIndex === index
                ? "ring-2 ring-gold/80 ring-offset-2 ring-offset-espresso"
                : "ring-1 ring-ivory/15"
            )}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              sizes="96px"
              className={cn("object-cover", activeIndex !== index && "grayscale")}
            />
          </motion.button>
        ))}
      </motion.div>
      <SlideProgress
        slides={slides}
        activeIndex={activeIndex}
        isPaused={isPaused}
        autoAdvanceMs={autoAdvanceMs}
        onSelect={onSelect}
        className="w-full max-w-xs"
      />
    </div>
  );
}
