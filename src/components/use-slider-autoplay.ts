"use client";

import { useCallback, useEffect, useState, type FocusEvent } from "react";
import { useReducedMotion } from "motion/react";

export const sliderAutoplayMs = 5000;

export function useSliderAutoplay(
  pageCount: number,
  intervalMs = sliderAutoplayMs
) {
  const [page, setPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const goTo = useCallback(
    (next: number) => {
      if (pageCount < 1) return;
      setPage(((next % pageCount) + pageCount) % pageCount);
    },
    [pageCount]
  );

  useEffect(() => {
    if (pageCount < 2 || isPaused || prefersReducedMotion) return;

    const timer = window.setTimeout(() => {
      setPage((current) => (current + 1) % pageCount);
    }, intervalMs);

    return () => window.clearTimeout(timer);
  }, [page, pageCount, isPaused, prefersReducedMotion, intervalMs]);

  return {
    page,
    goTo,
    pause: () => setIsPaused(true),
    resume: () => setIsPaused(false),
    hoverProps: {
      onMouseEnter: () => setIsPaused(true),
      onMouseLeave: () => setIsPaused(false),
      onFocusCapture: () => setIsPaused(true),
      onBlurCapture: (event: FocusEvent<HTMLElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      },
    },
  };
}
