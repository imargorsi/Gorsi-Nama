import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  as = "h2",
  eyebrow,
  title,
  description,
  descriptionClassName,
  children,
  className,
}: {
  as?: "h1" | "h2";
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  descriptionClassName?: string;
  children?: ReactNode;
  className?: string;
}) {
  const HeadingTag = as;

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
        <HeadingTag
          className={cn(
            "font-heading font-semibold tracking-tight text-espresso",
            eyebrow ? "mt-3" : undefined,
            as === "h1"
              ? "text-3xl sm:text-4xl lg:text-5xl lg:leading-tight"
              : "text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
          )}
        >
          {title}
        </HeadingTag>
        {description ? (
          <p
            className={cn(
              "mt-2 max-w-2xl text-sm leading-relaxed text-warm-gray sm:text-base",
              descriptionClassName
            )}
          >
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
