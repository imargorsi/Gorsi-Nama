import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HeritageKnot, HeritagePatternBand, HeritageRule } from "@/components/heritage-ornaments";
import { Reveal } from "@/components/reveal";
import { Heading, Text } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CallToAction({
  eyebrow = "Contribute",
  title,
  text,
  buttonText,
  href,
}: {
  eyebrow?: string;
  title: string;
  text: string;
  buttonText: string;
  href: string;
}) {
  return (
    <section className="site-shell px-4 pt-4 pb-16 sm:px-0 sm:pb-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-xl bg-ivory px-5 py-10 shadow-lg ring-1 ring-espresso sm:px-10 sm:py-12">
          <HeritagePatternBand />
          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="min-w-0 max-w-2xl">
              <p className="flex items-center gap-2.5">
                <HeritageKnot />
                <span className="heritage-eyebrow">{eyebrow}</span>
              </p>
              <Heading as="h2" variant="h3" className="mt-4">
                {title}
              </Heading>
              <HeritageRule className="mt-4" />
              <Text variant="muted" className="mt-4">
                {text}
              </Text>
            </div>
            <Link
              href={href}
              className={cn(
                buttonVariants({ size: "lg", className: "w-full shrink-0 sm:w-auto" })
              )}
            >
              {buttonText}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
