import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function PlaceholderBlock({
  icon: Icon,
  label,
  className,
}: {
  icon?: LucideIcon;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-32 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/30 px-4 text-center text-sm text-muted-foreground",
        className
      )}
    >
      {Icon && <Icon className="size-5" />}
      {label}
    </div>
  );
}
