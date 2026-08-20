"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { AuthSignedInRedirect } from "@/components/auth/auth-signed-in-redirect";
import { HeritageRule } from "@/components/heritage-ornaments";
import { Heading, Text } from "@/components/typography";
import { cn } from "@/lib/utils";

const panelContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export function AuthShell({
  mode,
  children,
}: {
  mode: "login" | "signup";
  children: ReactNode;
}) {
  const t = useTranslations("Auth");
  const common = useTranslations("Common");

  return (
    <div className="relative isolate min-h-dvh w-full overflow-x-hidden bg-espresso sm:overflow-hidden sm:p-8 lg:p-12">
      <AuthSignedInRedirect />
      <Image
        src="/auth-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-espresso/65" />
      <div className="absolute inset-0 bg-linear-to-t from-espresso/90 via-espresso/45 to-espresso/70" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 mx-auto flex min-h-dvh w-full max-w-7xl flex-col overflow-hidden bg-card sm:min-h-[calc(100svh-4rem)] sm:flex-row sm:rounded-2xl sm:bg-transparent sm:ring-2 sm:ring-gold/45 sm:shadow-xl lg:min-h-[calc(100svh-6rem)]"
      >
        <motion.div
          variants={panelContainer}
          initial="hidden"
          animate="show"
          className="relative hidden flex-col items-center justify-between gap-6 overflow-hidden bg-espresso px-10 py-10 text-center sm:flex sm:w-1/2"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
          />

          <motion.div
            variants={fadeUp}
            className="relative z-10 flex flex-col items-center"
          >
            <Link href="/" className="relative h-28 w-96 transition-opacity hover:opacity-80 sm:h-32 sm:w-[28rem]">
              <Image
                src="/veriosn-v2.png"
                alt={common("brandName")}
                fill
                sizes="448px"
                className="object-contain mix-blend-lighten"
                unoptimized
              />
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative z-10 h-[28svh] max-h-96 min-h-56 w-[28svh] max-w-96 min-w-56"
          >
            <Image
              src="/gujjar-emblem.png"
              alt={common("brandEmblemAlt")}
              fill
              sizes="384px"
              className="object-contain mix-blend-lighten"
              priority
              unoptimized
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative z-10 flex flex-col items-center gap-5"
          >
            <p className="font-heading text-2xl leading-snug sm:text-[1.75rem]">
              <span className="text-gold">{t("taglinePast")}</span>
              <br />
              <span className="text-ivory/90">{t("taglinePeople")}</span>
              <br />
              <span className="text-ivory/90">{t("taglineFuture")}</span>
            </p>
            <HeritageRule />
          </motion.div>
        </motion.div>

        <div className="flex w-full flex-1 flex-col justify-start overflow-y-auto bg-card px-5 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:w-1/2 sm:justify-center sm:px-12 sm:py-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            className="mx-auto flex w-full max-w-md flex-col gap-6 pt-[env(safe-area-inset-top)] sm:pt-0"
          >
            <Link
              href="/"
              className="relative mx-auto size-28 overflow-hidden rounded-full bg-espresso ring-1 ring-gold/25 sm:hidden"
            >
              <Image
                src="/gujjar-emblem.png"
                alt={common("brandEmblemAlt")}
                fill
                sizes="112px"
                className="object-contain mix-blend-lighten"
                priority
                unoptimized
              />
            </Link>
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
                {t("loginTab")}
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
                {t("registerTab")}
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

export function AuthContinueDivider() {
  const t = useTranslations("Auth");

  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-border" />
      <Text as="span" variant="meta">
        {t("orContinue")}
      </Text>
      <span className="h-px flex-1 bg-border" />
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
    <div className="flex flex-col gap-3 text-center sm:text-left">
      <Heading as="h1" variant="h1">
        {title}
      </Heading>
      <HeritageRule className="justify-center sm:justify-start" />
      <Text variant="muted">{description}</Text>
    </div>
  );
}
