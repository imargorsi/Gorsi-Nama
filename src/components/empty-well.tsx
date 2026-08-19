import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { AccentIcon } from "@/components/accent-icon";
import { Heading, Text } from "@/components/typography";
import { cn } from "@/lib/utils";

export function EmptyWell({
  icon: Icon,
  title,
  text,
  className,
}: {
  icon: LucideIcon;
  title: string;
  text: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "surface flex flex-col items-center gap-3 px-5 py-14 text-center",
        className
      )}
    >
      <AccentIcon icon={Icon} size="lg" />
      <Heading as="p" variant="card">
        {title}
      </Heading>
      <Text variant="small" className="max-w-sm">
        {text}
      </Text>
    </div>
  );
}
