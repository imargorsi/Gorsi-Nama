import type { LucideIcon } from "lucide-react";
import { HeritageDiamond } from "@/components/heritage-ornaments";
import { surfaceClass } from "@/components/surface";
import { cn } from "@/lib/utils";

export function LibraryEmpty({
  icon: Icon,
  title,
  message,
}: {
  icon: LucideIcon;
  title: string;
  message: string;
}) {
  return (
    <div
      className={cn(
        surfaceClass,
        "flex flex-col items-center justify-center gap-4 px-6 py-20 text-center"
      )}
    >
      <span className="flex size-14 items-center justify-center rounded-full bg-espresso/8 text-gold">
        <Icon className="size-6" strokeWidth={1.5} />
      </span>
      <div className="flex items-center gap-3" aria-hidden>
        <span className="h-px w-8 bg-gold/35" />
        <HeritageDiamond />
        <span className="h-px w-8 bg-gold/35" />
      </div>
      <h3 className="font-heading text-xl font-semibold tracking-tight text-espresso">
        {title}
      </h3>
      <p className="max-w-sm text-sm leading-relaxed text-warm-gray">{message}</p>
    </div>
  );
}
