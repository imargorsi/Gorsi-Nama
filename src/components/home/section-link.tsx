import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SectionLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({
          className: "h-11 w-full gap-2 bg-espresso px-5 text-ivory hover:bg-espresso/90 sm:w-auto",
        }),
        className
      )}
    >
      {children}
      <ArrowRight className="size-4 rtl:rotate-180" />
    </Link>
  );
}
