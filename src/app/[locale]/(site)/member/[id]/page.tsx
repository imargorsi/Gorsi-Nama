import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { CallToAction } from "@/components/call-to-action";
import { CommunityAvatar } from "@/components/community/community-avatar";
import { Reveal } from "@/components/reveal";
import { surfaceClass } from "@/components/surface";
import { Text } from "@/components/typography";
import { getPlaceholderMember } from "@/data/members";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/member/[id]">): Promise<Metadata> {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: "Members" });
  const common = await getTranslations({ locale, namespace: "Common" });
  const member = getPlaceholderMember(id);
    return pageMetadata({
    locale,
    href: `/member/${id}`,
    title: member ? `${member.name} | ${common("brandName")}` : t("profileMetaTitle"),
    description: t("publicProfile"),
    index: false,
  });
}

export default async function MemberProfilePage({
  params,
}: PageProps<"/[locale]/member/[id]">) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Members");
  const common = await getTranslations("Common");
  const membersHome = await getTranslations("Home.members");

  const member = getPlaceholderMember(id);
  const name = member?.name ?? t("fallbackName");

  return (
    <>
      <PageBreadcrumb
        eyebrow={t("memberEyebrow")}
        title={name}
        crumbs={[
          { label: common("home"), href: "/" },
          { label: t("crumb"), href: "/member" },
          { label: name },
        ]}
        description={
          member
            ? membersHome("membershipId", { id: member.membershipId })
            : t("publicProfile")
        }
      />
      <div className="site-shell px-4 py-12 sm:px-0 sm:py-16">
        <Reveal mode="load">
          <article
            className={cn(
              surfaceClass,
              "mx-auto flex max-w-3xl flex-col gap-6 overflow-hidden p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-10"
            )}
          >
            <CommunityAvatar name={name} imageUrl={member?.image} size="xl" />
            <Text variant="muted" className="max-w-2xl">
              {t("placeholderBio")}
            </Text>
          </article>
        </Reveal>
      </div>
      <CallToAction
        eyebrow={t("profileCtaEyebrow")}
        title={t("profileCtaTitle")}
        text={t("profileCtaText")}
        buttonText={t("profileCtaButton")}
        href="/auth/signup"
      />
    </>
  );
}
