import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb, pageBanner } from "@/components/page-breadcrumb";
import { CallToAction } from "@/components/call-to-action";
import { CommunityAvatar } from "@/components/community/community-avatar";
import { Reveal } from "@/components/reveal";
import { surfaceClass } from "@/components/surface";
import { getPlaceholderMember } from "@/data/members";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Member Profile | Gorsi Nama",
};

export default async function MemberProfilePage({
  params,
}: PageProps<"/[locale]/member/[id]">) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const member = getPlaceholderMember(id);
  const name = member?.name ?? "Gorsi member";

  return (
    <>
      <PageBreadcrumb
        image={member?.image || pageBanner.members}
        eyebrow="Member"
        title={name}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Our Members", href: "/member" },
          { label: name },
        ]}
        description={
          member
            ? `Membership ID# ${member.membershipId}`
            : "Public member profile"
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
            <p className="max-w-2xl text-sm leading-relaxed text-warm-gray sm:text-base">
              Public profiles will show city, profession, and a short summary
              once members complete them. This page is the layout for that view
              — the Neon profile fields are not connected here yet.
            </p>
          </article>
        </Reveal>
      </div>
      <CallToAction
        eyebrow="The Directory"
        title="This could be your profile"
        text="Create your Gorsi Nama account to claim a profile and appear in the member directory."
        buttonText="Join Gorsi Nama"
        href="/auth/signup"
      />
    </>
  );
}
