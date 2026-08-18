import { cn } from "@/lib/utils";

export function HeritageDiamond({ className }: { className?: string }) {
  return <span className={cn("size-1.5 rotate-45 bg-gold", className)} aria-hidden />;
}

export function HeritageRule({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)} aria-hidden>
      <span className="h-px w-8 bg-gold/35" />
      <HeritageDiamond />
      <span className="h-px w-8 bg-gold/35" />
    </div>
  );
}

export function HeritageKnot({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-grid grid-cols-2 gap-0.5 text-gold", className)}
      aria-hidden
    >
      <span className="size-1.5 rotate-45 bg-current" />
      <span className="size-1.5 rotate-45 bg-current" />
      <span className="size-1.5 rotate-45 bg-current" />
      <span className="size-1.5 rotate-45 bg-current" />
    </span>
  );
}
