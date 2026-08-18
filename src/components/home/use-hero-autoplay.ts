"use client";

import { useCallback, useRef, useState } from "react";
import { useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";

export function useHeroAutoplay(slideCount: number, durationMs: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const isPausedRef = useRef(isPaused);
  const prefersReducedMotion = useReducedMotion();

  isPausedRef.current = isPaused || Boolean(prefersReducedMotion);

  const select = useCallback(
    (index: number) => {
      setActiveIndex(index);
      progress.set(0);
    },
    [progress]
  );

  useAnimationFrame((_time, delta) => {
    if (isPausedRef.current || slideCount < 2) return;

    const next = progress.get() + delta / durationMs;
    if (next >= 1) {
      progress.set(0);
      setActiveIndex((current) => (current + 1) % slideCount);
      return;
    }

    progress.set(next);
  });

  return { activeIndex, isPaused, setIsPaused, progress, select };
}
