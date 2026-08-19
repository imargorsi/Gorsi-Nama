import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
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
        eyebrow="Notable Gorsi"
        title="People Who Shaped Our Story"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Famous Gorsi Personalities" },
        ]}
        description="Discover the individuals whose lives, work, and contributions have shaped the Gorsi story and left a lasting mark on our shared heritage."
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
        title="Help Complete This Directory"
        text="Know a notable Gorsi personality who should be remembered? Share their story and help us build a more complete record of our people and heritage."
        buttonText="Email us"
        href="mailto:hey@argorsi.com"
      />
    </>
  );
}
