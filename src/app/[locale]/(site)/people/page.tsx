import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { CallToAction } from "@/components/call-to-action";
import { PersonalityCard } from "@/components/people/personality-card";
import { notablePeople } from "@/data/notable-people";

export const metadata: Metadata = {
  title: "Famous Gorsi Personalities | Gorsi Nama",
};

export default async function PeoplePage({
  params,
}: PageProps<"/[locale]/people">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageBreadcrumb title="Famous Gorsi Personalities" />

      <div className="site-shell px-4 py-12 sm:px-0 sm:py-16">
        <p className="heritage-eyebrow">Notable Gorsi</p>
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-espresso sm:text-4xl">
          People who shaped our story
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-warm-gray sm:text-base">
          A first look at the notable-people directory. These cards are
          placeholders until verified biographies live in the archive.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {notablePeople.map((person) => (
            <PersonalityCard key={person.id} person={person} />
          ))}
        </div>
      </div>

      <CallToAction
        text="If you know of notable Gorsi personalities who belong here, join Gorsi Nama and help us add them."
        buttonText="Join Gorsi Nama"
        href="/auth/signup"
      />
    </>
  );
}
