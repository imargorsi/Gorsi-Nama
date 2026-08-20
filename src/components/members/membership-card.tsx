"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { initialsFromName } from "@/lib/initials";
import { motionEase } from "@/components/reveal";
import { Heading } from "@/components/typography";
import { cn } from "@/lib/utils";

export interface MembershipCardProps {
  name: string;
  membershipId: string;
  image?: string;
  href?: string;
  className?: string;
}

export function MembershipCard({
  name,
  membershipId,
  image,
  href,
  className,
}: MembershipCardProps) {
  const t = useTranslations("Home.members");
  const initials = initialsFromName(name);

  const card = (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22, ease: motionEase }}
      className={cn(
        "relative flex w-full min-w-0 flex-col items-center overflow-hidden rounded-2xl bg-espresso px-5 pt-6 pb-6 text-center shadow-md ring-1 ring-gold/20",
        href &&
          "transition-shadow duration-300 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:outline-none",
        className
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/MEMEBER-CARD.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover object-[center_35%] opacity-45"
        />
        <div className="absolute inset-0 bg-linear-to-b from-espresso/70 via-espresso/40 to-espresso/72" />
      </div>

      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-10 h-0.5 bg-gold/40"
      />

      <div className="relative z-10 size-20 shrink-0 overflow-hidden rounded-full bg-ivory ring-2 ring-gold/45 ring-offset-2 ring-offset-espresso sm:size-24">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="112px"
            className="object-cover"
          />
        ) : (
          <span className="flex size-full items-center justify-center font-heading text-3xl font-semibold text-espresso">
            {initials}
          </span>
        )}
      </div>

      <p className="heritage-eyebrow relative z-10 mt-3.5 text-gold/80">
        {t("membershipId", { id: membershipId })}
      </p>
      <Heading
        as="h3"
        variant="card"
        tone="onDark"
        title={name}
        className="relative z-10 mt-1.5 line-clamp-2"
      >
        {name}
      </Heading>
    </motion.article>
  );

  if (href) {
    return (
      <Link href={href} className="block min-w-0 w-full">
        {card}
      </Link>
    );
  }

  return card;
}
