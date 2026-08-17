import type { Transition, Variants } from "motion/react";

/** Premium ease-out curve — shared across hero animations. */
export const heroEase = [0.22, 1, 0.36, 1] as const;

export const heroImageFade: Transition = {
  duration: 0.75,
  ease: heroEase,
};

export function heroKenBurnsDuration(ms: number): Transition {
  return { duration: ms / 1000, ease: "linear" };
}

export const slideContentContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

export const slideContentItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: heroEase },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.24, ease: "easeIn" },
  },
};

export const heroStatsContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.55 },
  },
};

export const heroStatItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: heroEase },
  },
};

export const slideControlsContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.4 },
  },
};

export const slideControlItem: Variants = {
  hidden: { opacity: 0, x: 18 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: heroEase },
  },
};

export const mobileThumbContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.45 },
  },
};

export const mobileThumbItem: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: heroEase },
  },
};
