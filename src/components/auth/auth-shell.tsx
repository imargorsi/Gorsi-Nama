"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const panelContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

function Ornament() {
  return (
    <div className="flex items-center gap-2 text-gold/60">
      <span className="h-px w-10 bg-gold/40" />
      <span className="size-1.5 rotate-45 bg-gold/60" />
      <span className="h-px w-10 bg-gold/40" />
    </div>
  );
}

export function AuthShell({
  mode,
  children,
}: {
  mode: "login" | "signup";
  children: ReactNode;
}) {
  return (
    <div className="w-full bg-espresso p-4 sm:p-8 lg:p-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mx-auto flex min-h-[calc(100svh-2rem)] w-full max-w-7xl flex-col overflow-hidden rounded-2xl ring-2 ring-gold/45 shadow-xl sm:min-h-[calc(100svh-4rem)] sm:flex-row lg:min-h-[calc(100svh-6rem)]"
      >
        <motion.div
          variants={panelContainer}
          initial="hidden"
          animate="show"
          className="relative hidden flex-col items-center justify-between gap-6 overflow-hidden px-10 py-10 text-center sm:flex sm:w-1/2"
        >
          <Image
            src="/hero.jpg"
            alt=""
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-espresso/60" />
          <div className="absolute inset-0 bg-linear-to-t from-espresso/95 via-espresso/40 to-espresso/50" />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
          />

          <motion.div
            variants={fadeUp}
            className="relative z-10 flex flex-col items-center gap-5"
          >
            <Link href="/" className="relative h-20 w-72 transition-opacity hover:opacity-80">
              <Image
                src="/white-version.png"
                alt="Gorsi Nama"
                fill
                sizes="288px"
                className="object-contain"
              />
            </Link>
            <p className="text-xs font-medium tracking-[0.35em] text-ivory/80">
              GORSI NAMA
            </p>
            <Ornament />
            <p className="text-sm text-ivory/75">
              Our People &bull; Our Stories &bull; Our Heritage
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative z-10 h-[28svh] max-h-96 min-h-56 w-[28svh] max-w-96 min-w-56"
          >
            <Image
              src="/lion-trademark.png"
              alt=""
              fill
              sizes="384px"
              className="object-contain"
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative z-10 flex flex-col items-center gap-5"
          >
            <p className="font-heading text-2xl leading-snug sm:text-[1.75rem]">
              <span className="text-gold">Preserving our past,</span>
              <br />
              <span className="text-ivory/90">connecting our people,</span>
              <br />
              <span className="text-ivory/90">inspiring our future.</span>
            </p>
            <Ornament />
          </motion.div>
        </motion.div>

        <div className="flex w-full flex-1 flex-col justify-center bg-card px-6 py-10 sm:w-1/2 sm:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            className="mx-auto flex w-full max-w-md flex-col gap-6"
          >
            <div className="relative flex items-center justify-center gap-6">
              <Link
                href="/auth/login"
                className={cn(
                  "relative pb-3 text-sm font-semibold transition-colors",
                  mode === "login"
                    ? "text-gold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Login
                {mode === "login" && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-gold" />
                )}
              </Link>
              <span className="h-4 w-px bg-border" />
              <Link
                href="/auth/signup"
                className={cn(
                  "relative pb-3 text-sm font-semibold transition-colors",
                  mode === "signup"
                    ? "text-gold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Register
                {mode === "signup" && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-gold" />
                )}
              </Link>
              <div className="absolute inset-x-0 bottom-0 h-px bg-border" />
            </div>

            {children}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export function AuthHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 text-center sm:text-left">
      <h1 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="text-base text-muted-foreground">{description}</p>
    </div>
  );
}
