import type { ReactNode } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { initialsFromName } from "@/lib/initials";
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
        "relative flex h-full min-w-0 flex-col items-center overflow-hidden rounded-2xl bg-espresso px-5 pt-8 pb-10 text-center shadow-md",
        href &&
          "transition-shadow duration-300 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:outline-none",
        className
      )}
    >
      <Image
        src="/trademarkgorsi.png"
        alt=""
        width={160}
        height={160}
        className="pointer-events-none absolute -bottom-6 size-28 select-none object-contain opacity-25 mix-blend-lighten"
      />
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-0.5 bg-gold/40"
      />

      <div className="relative size-24 shrink-0 overflow-hidden rounded-full bg-ivory ring-2 ring-gold/45 ring-offset-2 ring-offset-espresso sm:size-28">
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

      <p className="relative mt-5 font-sans text-[0.65rem] font-semibold tracking-[0.16em] text-gold/80 uppercase">
        Membership ID# {membershipId}
      </p>
      <h3
        title={name}
        className="relative mt-2 line-clamp-2 font-heading text-xl font-semibold tracking-tight text-ivory sm:text-2xl"
      >
        {name}
      </h3>
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="h-full min-w-0">
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
        "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}
