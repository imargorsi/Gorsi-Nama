import type { LucideIcon } from "lucide-react";
import { AccentIcon } from "@/components/accent-icon";
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
      <AccentIcon icon={Icon} size="lg" />
      <h3 className="font-heading text-xl font-semibold tracking-tight text-espresso">
        {title}
      </h3>
      <p className="max-w-sm text-sm leading-relaxed text-warm-gray">{message}</p>
    </div>
  );
}
