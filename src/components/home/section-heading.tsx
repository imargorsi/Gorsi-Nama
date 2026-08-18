import type { ReactNode } from "react";
import { HeritageDiamond } from "@/components/heritage-ornaments";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        children && "sm:flex-row sm:items-end sm:justify-between sm:gap-8",
        className
      )}
    >
      <div className="min-w-0">
        {eyebrow ? <p className="heritage-eyebrow">{eyebrow}</p> : null}
        <div
          className={cn("flex items-center gap-3", eyebrow && "mt-3")}
          aria-hidden
        >
          <span className="h-px w-8 bg-gold/35" />
          <HeritageDiamond />
          <span className="h-px w-8 bg-gold/35" />
        </div>
        <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-espresso sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-warm-gray sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {children ? (
        <div className="w-full shrink-0 sm:w-auto">{children}</div>
      ) : null}
    </div>
  );
}
