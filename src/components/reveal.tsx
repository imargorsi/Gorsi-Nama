"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export const motionEase = [0.22, 1, 0.36, 1] as const;

const staggerCap = 3;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: motionEase },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: motionEase,
      delay: Math.min(index, staggerCap) * 0.09,
    },
  }),
};

export function Reveal({
  children,
  className,
  as = "div",
  amount = 0.35,
  mode = "view",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "header";
  amount?: number;
  mode?: "view" | "load";
}) {
  const Tag = as === "header" ? motion.header : motion.div;

  if (mode === "load") {
    return (
      <Tag
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: motionEase }}
        className={className}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.4, ease: motionEase }}
      className={className}
    >
      {children}
    </Tag>
  );
}

export function FadeIn({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: motionEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  mode = "view",
}: {
  children: ReactNode;
  className?: string;
  mode?: "view" | "load";
}) {
  const visibility =
    mode === "load"
      ? { initial: "hidden" as const, animate: "show" as const }
      : {
          initial: "hidden" as const,
          whileInView: "show" as const,
          viewport: { once: true, amount: 0.12 },
        };

  return (
    <motion.div
      {...visibility}
      variants={{ hidden: {}, show: {} }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  index = 0,
  isHoverable = false,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  isHoverable?: boolean;
}) {
  return (
    <motion.div
      custom={index}
      variants={staggerItem}
      className={cn("min-w-0", className)}
      whileHover={
        isHoverable
          ? { y: -4, transition: { duration: 0.22, ease: motionEase } }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}

export function FeedItem({
  children,
  className,
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <motion.div
      layout={false}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.32,
        ease: motionEase,
        delay: Math.min(index, staggerCap) * 0.08,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
