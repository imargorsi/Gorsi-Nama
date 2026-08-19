import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const headingVariants = cva("font-heading font-semibold tracking-tight", {
  variants: {
    variant: {
      display: "text-4xl sm:text-5xl lg:text-6xl",
      h1: "text-3xl sm:text-4xl lg:text-5xl lg:leading-tight",
      h2: "text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-tight",
      h3: "text-2xl sm:text-3xl",
      h4: "text-xl sm:text-2xl",
      card: "text-lg sm:text-xl sm:leading-snug",
    },
    tone: {
      default: "text-espresso",
      onDark: "text-ivory",
    },
  },
  defaultVariants: {
    variant: "h2",
    tone: "default",
  },
});

export const textVariants = cva("", {
  variants: {
    variant: {
      body: "text-base leading-relaxed text-espresso",
      lead: "text-lg leading-relaxed text-espresso/80",
      muted: "text-sm leading-relaxed text-warm-gray sm:text-base",
      small: "text-sm leading-relaxed text-warm-gray",
      meta: "text-xs text-warm-gray",
      label: "text-sm font-medium text-espresso",
      error: "text-sm text-destructive",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "span";

const headingTagByVariant: Record<
  NonNullable<VariantProps<typeof headingVariants>["variant"]>,
  HeadingTag
> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  card: "h3",
};

export function Heading({
  as,
  variant = "h2",
  tone = "default",
  className,
  ...props
}: {
  as?: HeadingTag;
  className?: string;
  children?: ReactNode;
} & VariantProps<typeof headingVariants> &
  Omit<ComponentPropsWithoutRef<"h2">, "className" | "children">) {
  const Tag = (as ?? headingTagByVariant[variant ?? "h2"]) as ElementType;

  return (
    <Tag className={cn(headingVariants({ variant, tone }), className)} {...props} />
  );
}

type TextTag = "p" | "span" | "div" | "li";

export function Text({
  as: Tag = "p",
  variant = "body",
  className,
  ...props
}: {
  as?: TextTag;
  className?: string;
  children?: ReactNode;
} & VariantProps<typeof textVariants>) {
  return (
    <Tag className={cn(textVariants({ variant }), className)} {...props} />
  );
}
