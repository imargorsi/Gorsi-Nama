import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "animate-pulse rounded-md bg-espresso/10 motion-reduce:animate-none",
        className
      )}
    />
  );
}
