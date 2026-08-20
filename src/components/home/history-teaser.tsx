import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Stagger, StaggerItem } from "@/components/reveal";
import { Heading, Text } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const photoFrameClass =
  "relative overflow-hidden rounded-lg bg-espresso ring-2 ring-gold";

export async function HistoryTeaser() {
  const t = await getTranslations("Home.history");

  return (
    <section
      id="our-history"
      className="scroll-mt-28 pt-12 pb-16 sm:scroll-mt-32 sm:pt-16 sm:pb-20"
    >
      <div className="site-shell px-4 sm:px-0">
        <Stagger className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-stretch md:gap-14 lg:gap-20">
          <StaggerItem index={0} className="flex min-w-0 flex-col border-t border-espresso pt-8 md:justify-between md:gap-12">
            <div>
              <p className="heritage-eyebrow mb-4">{t("eyebrow")}</p>
              <Heading as="h2" variant="h2">
                {t("title")}
              </Heading>
              <Text variant="muted" className="mt-2">
                {t("dek")}
              </Text>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 md:mt-0">
              <div className={cn(photoFrameClass, "aspect-square")}>
                <Image
                  src="/history__image__3.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 768px) 22vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className={cn(photoFrameClass, "aspect-square")}>
                <Image
                  src="/history__image__4.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 768px) 22vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          </StaggerItem>

          <StaggerItem index={1} className="flex min-w-0 flex-col border-b border-espresso pb-8">
            <div className={cn(photoFrameClass, "aspect-16/10")}>
              <Image
                src="/connecting-tech.jpg"
                alt={t("photoAlt")}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-[center_45%]"
              />
            </div>
            <Heading as="h3" variant="h4" className="mt-6">
              {t("briefTitle")}
            </Heading>
            <Text variant="muted" className="mt-4">
              {t("brief1")}
            </Text>
            <Text variant="muted" className="mt-4">
              {t("brief2")}
            </Text>
            <Link
              href="/history"
              className={cn(buttonVariants({ className: "mt-6 w-fit" }))}
            >
              {t("cta")}
            </Link>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
