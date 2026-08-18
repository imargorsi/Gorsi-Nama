import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CallToAction({
  text,
  buttonText,
  href,
}: {
  text: string;
  buttonText: string;
  href: string;
}) {
  return (
    <section className="border-t border-gold/20">
      <div className="site-shell flex flex-col items-start gap-5 px-4 py-14 sm:px-0">
        <p className="max-w-2xl text-sm leading-relaxed text-warm-gray sm:text-base">
          {text}
        </p>
        <Link
          href={href}
          className={cn(
            buttonVariants({
              className: "h-11 gap-2 bg-gold px-5 text-espresso hover:bg-gold/90",
            })
          )}
        >
          {buttonText}
          <ArrowRight className="size-4 rtl:rotate-180" />
        </Link>
      </div>
    </section>
  );
}
