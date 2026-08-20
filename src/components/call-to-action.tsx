import { ArrowRight, Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HeritageKnot, HeritagePatternBand, HeritageRule } from "@/components/heritage-ornaments";
import { Reveal } from "@/components/reveal";
import { Heading, Text } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function isMailtoHref(href: string) {
  return href.startsWith("mailto:");
}

function isExternalHref(href: string) {
  return (
    isMailtoHref(href) ||
    href.startsWith("http://") ||
    href.startsWith("https:")
  );
}

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
  const className = cn(
    buttonVariants({ size: "lg", className: "w-full shrink-0 sm:w-auto" })
  );
  const isMailto = isMailtoHref(href);
  const label = (
    <>
      {isMailto ? <Mail className="size-4" strokeWidth={1.75} /> : null}
      {buttonText}
      {isMailto ? null : <ArrowRight className="size-4 rtl:rotate-180" />}
    </>
  );

  return (
    <section className="pt-4 pb-16 sm:site-shell sm:px-0 sm:pb-20">
      <Reveal>
        <div className="relative overflow-hidden bg-ivory px-5 py-10 ring-1 ring-espresso sm:rounded-xl sm:px-10 sm:py-12 sm:shadow-lg">
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
            {isExternalHref(href) ? (
              <a href={href} className={className}>
                {label}
              </a>
            ) : (
              <Link href={href} className={className}>
                {label}
              </Link>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
