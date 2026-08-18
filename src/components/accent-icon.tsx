import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccentIcon({
  icon: Icon,
  size = "md",
  tone = "on-light",
  className,
}: {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  tone?: "on-light" | "on-dark" | "on-photo";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-transparent text-gold",
        size === "sm" && "size-8",
        size === "md" && "size-10",
        size === "lg" && "size-12",
        tone === "on-light" && "ring-1 ring-espresso/45",
        tone === "on-dark" && "ring-1 ring-ivory/50",
        tone === "on-photo" && "text-ivory ring-1 ring-ivory",
        className
      )}
      aria-hidden
    >
      <Icon
        className={cn(
          size === "sm" && "size-3.5",
          size === "md" && "size-4",
          size === "lg" && "size-5"
        )}
        strokeWidth={1.75}
      />
    </span>
  );
}
