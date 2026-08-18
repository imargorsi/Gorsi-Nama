import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb, pageBanner } from "@/components/page-breadcrumb";
import { CallToAction } from "@/components/call-to-action";
import { PersonalityCard } from "@/components/people/personality-card";
import { Stagger, StaggerItem } from "@/components/reveal";
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
      <PageBreadcrumb
        image={pageBanner.people}
        eyebrow="Notable Gorsi"
        title="People who shaped our story"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Famous Gorsi Personalities" },
        ]}
        description="A first look at the notable-people directory. These cards are placeholders until verified biographies live in the archive."
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
        eyebrow="The Archive"
        title="Help complete this directory"
        text="If you know of notable Gorsi personalities who belong here, join Gorsi Nama and help us add them."
        buttonText="Join Gorsi Nama"
        href="/auth/signup"
      />
    </>
  );
}
