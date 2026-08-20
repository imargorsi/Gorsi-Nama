import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/reveal";
import { ArrowRight, Feather } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HeritageKnot, HeritageRule } from "@/components/heritage-ornaments";
import { Heading, Text } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function Banner() {
  const t = await getTranslations("Home.banner");

  return (
    <section id="your-story-belongs-here" className="relative isolate">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/footer-cta.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_45%]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-espresso/96 via-espresso/84 to-espresso/50" />
        <div className="absolute inset-0 bg-gold/8" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-espresso to-transparent" />
      </div>

      <div className="site-shell px-4 pt-16 pb-14 sm:px-0 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20">
        <Reveal>
          <p className="flex items-center gap-2.5">
            <HeritageKnot />
            <span className="heritage-eyebrow">{t("eyebrow")}</span>
          </p>

          <Heading as="h2" variant="h2" tone="onDark" className="mt-5 max-w-3xl">
            {t("title")}
          </Heading>

          <div className="mt-6">
            <HeritageRule />
          </div>

          <Text variant="muted" className="mt-6 max-w-2xl text-ivory/80">
            {t("text")}
          </Text>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/blog/write"
              className={cn(
                buttonVariants({
                  size: "lg",
                  className:
                    "w-full ring-1 ring-ivory/35 sm:h-14 sm:w-auto sm:px-7",
                })
              )}
            >
              <Feather className="size-5" strokeWidth={1.75} />
              {t("shareCta")}
              <ArrowRight className="size-5 rtl:rotate-180" />
            </Link>
            <Link
              href="/auth/signup"
              className={cn(
                buttonVariants({
                  variant: "outlineLight",
                  size: "lg",
                  className: "w-full sm:h-14 sm:w-auto sm:px-7",
                })
              )}
            >
              {t("joinCta")}
              <ArrowRight className="size-5 rtl:rotate-180" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
