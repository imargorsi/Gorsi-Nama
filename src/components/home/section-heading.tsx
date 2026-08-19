import type { ReactNode } from "react";
import { Heading, Text } from "@/components/typography";
import { cn } from "@/lib/utils";

export function SectionHeading({
  as = "h2",
  titleVariant,
  eyebrow,
  title,
  description,
  descriptionClassName,
  children,
  className,
}: {
  as?: "h1" | "h2";
  titleVariant?: "h1" | "h2" | "h3";
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  descriptionClassName?: string;
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
        <Heading
          as={as}
          variant={titleVariant ?? (as === "h1" ? "h1" : "h2")}
          className={eyebrow ? "mt-3" : undefined}
        >
          {title}
        </Heading>
        {description ? (
          <Text
            variant="muted"
            className={cn("mt-2 max-w-2xl", descriptionClassName)}
          >
            {description}
          </Text>
        ) : null}
      </div>
      {children ? (
        <div className="w-full shrink-0 sm:w-auto">{children}</div>
      ) : null}
    </div>
  );
}
