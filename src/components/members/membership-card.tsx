import type { ReactNode } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { initialsFromName } from "@/lib/initials";
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
  const initials = initialsFromName(name);

  const card = (
    <article
      className={cn(
        "relative flex w-full min-w-0 flex-col items-center overflow-hidden rounded-2xl bg-espresso px-5 pt-6 pb-6 text-center shadow-md ring-1 ring-gold/20",
        href &&
          "transition-shadow duration-300 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:outline-none",
        className
      )}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-0.5 bg-gold/40"
      />

      <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-ivory ring-2 ring-gold/45 ring-offset-2 ring-offset-espresso sm:size-24">
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

      <p className="heritage-eyebrow relative mt-3.5 text-gold/80">
        Membership ID# {membershipId}
      </p>
      <Heading
        as="h3"
        variant="card"
        tone="onDark"
        title={name}
        className="relative mt-1.5 line-clamp-2"
      >
        {name}
      </Heading>
    </article>
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

export function MembershipCardGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}
