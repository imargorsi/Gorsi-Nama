import { cn } from "@/lib/utils";

export function HeritageDiamond({ className }: { className?: string }) {
  return <span className={cn("size-1.5 rotate-45 bg-gold", className)} aria-hidden />;
}

export function HeritageRule({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex w-full max-w-xs items-center gap-3 sm:max-w-sm", className)}
      aria-hidden
    >
      <span className="h-px flex-1 bg-gold/55" />
      <HeritageDiamond className="size-2 shrink-0" />
      <span className="h-px flex-1 bg-gold/55" />
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

export function HeritageCircleMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block size-5 shrink-0 bg-gold mask-[url('/pattern-circle.png')] mask-luminance mask-center mask-no-repeat mask-contain",
        className
      )}
    />
  );
}

export function HeritagePatternBand({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 z-0 h-16 translate-y-1/2 sm:h-20",
        className
      )}
    >
      <div className="h-full w-full bg-gold/40 [mask-image:url('/pattern-2.png')] [mask-mode:luminance] [mask-position:bottom_center] [mask-repeat:repeat-x] [mask-size:auto_160%]" />
    </div>
  );
}

/** Gold `pattern-2.png` divider at the start of a card's text block. */
export function HeritageCardSeam({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("relative h-10 overflow-hidden sm:h-11", className)}
    >
      <div className="h-full w-full bg-gold [mask-image:url('/pattern-2.png')] [mask-mode:luminance] [mask-position:center_bottom] [mask-repeat:repeat-x] [mask-size:auto_220%]" />
    </div>
  );
}
