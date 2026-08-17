import { cn } from "@/lib/utils";

export function HeritageDiamond({ className }: { className?: string }) {
  return <span className={cn("size-1.5 rotate-45 bg-gold", className)} aria-hidden />;
}

export function HeritageDiamondBand() {
  return (
    <div
      aria-hidden
      className="h-6 w-full bg-[url('/card-pattern.png')] bg-repeat-x bg-top bg-size-[auto_200%] opacity-40"
    />
  );
}
