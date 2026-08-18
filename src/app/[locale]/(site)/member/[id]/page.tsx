import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { CallToAction } from "@/components/call-to-action";
import { CommunityAvatar } from "@/components/community/community-avatar";
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
      <PageBreadcrumb title={name} />
      <div className="site-shell px-4 py-12 sm:px-0 sm:py-16">
        <article
          className={cn(surfaceClass, "mx-auto max-w-3xl overflow-hidden p-6 sm:p-8")}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <CommunityAvatar name={name} imageUrl={member?.image} size="lg" />
            <div className="min-w-0 flex-1">
              <p className="heritage-eyebrow">Member</p>
              <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-espresso">
                {name}
              </h1>
              {member ? (
                <p className="mt-1 text-sm text-warm-gray">
                  Membership ID# {member.membershipId}
                </p>
              ) : null}
              <p className="mt-4 text-sm leading-relaxed text-warm-gray sm:text-base">
                Public profiles will show city, profession, and a short
                summary once members complete them. This page is the layout
                for that view — the Neon profile fields are not connected
                here yet.
              </p>
            </div>
          </div>
        </article>
      </div>
      <CallToAction
        text="Create your Gorsi Nama account to claim a profile and appear in the member directory."
        buttonText="Join Gorsi Nama"
        href="/auth/signup"
      />
    </>
  );
}
