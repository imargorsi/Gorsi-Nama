import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { CallToAction } from "@/components/call-to-action";
import { PersonalityCard } from "@/components/people/personality-card";
import { Stagger, StaggerItem } from "@/components/reveal";
import { notablePeople } from "@/data/notable-people";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/people">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "People" });
  return pageMetadata({
    locale,
    href: "/people",
    title: t("metaTitle"),
    description: t("description"),
  });
}

export default async function PeoplePage({
  params,
}: PageProps<"/[locale]/people">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("People");
  const common = await getTranslations("Common");

  return (
    <>
      <PageBreadcrumb
        eyebrow={t("eyebrow")}
        title={t("title")}
        crumbs={[
          { label: common("home"), href: "/" },
          { label: t("crumb") },
        ]}
        description={t("description")}
      />

      <div className="site-shell px-4 py-12 sm:px-0 sm:py-16">
        <Stagger
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          mode="load"
        >
          {notablePeople.map((person, index) => (
            <StaggerItem
              key={person.id}
              index={index}
              isHoverable
              className="h-full"
            >
              <PersonalityCard person={person} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <CallToAction
        eyebrow={t("ctaEyebrow")}
        title={t("ctaTitle")}
        text={t("ctaText")}
        buttonText={t("ctaButton")}
        href="mailto:hey@argorsi.com"
      />
    </>
  );
}
