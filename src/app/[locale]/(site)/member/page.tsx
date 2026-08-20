import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { CallToAction } from "@/components/call-to-action";
import { MemberDirectory } from "@/components/members/member-directory";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/member">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Members" });
  return pageMetadata({
    locale,
    href: "/member",
    title: t("metaTitle"),
    description: t("description"),
  });
}

export default async function MembersPage({
  params,
}: PageProps<"/[locale]/member">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Members");
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
      <div className="site-shell px-4 pt-8 pb-16 sm:px-0 sm:pt-10 sm:pb-20">
        <MemberDirectory />
      </div>
      <CallToAction
        eyebrow={t("ctaEyebrow")}
        title={t("ctaTitle")}
        text={t("ctaText")}
        buttonText={t("ctaButton")}
        href="/auth/signup"
      />
    </>
  );
}
