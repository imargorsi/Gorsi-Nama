import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/reveal";
import { MemberSlider } from "@/components/members/member-slider";
import { SectionHeading } from "./section-heading";
import { SectionLink } from "./section-link";

export async function CommunityPreview() {
  const t = await getTranslations("Home.members");

  return (
    <section
      id="meet-the-gorsi-community"
      className="scroll-mt-28 pt-12 pb-16 sm:scroll-mt-32 sm:pt-16 sm:pb-20"
    >
      <div className="site-shell px-4 sm:px-0">
        <Reveal as="header">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          >
            <SectionLink href="/member">{t("cta")}</SectionLink>
          </SectionHeading>
        </Reveal>

        <Reveal className="mt-10" amount={0.12}>
          <MemberSlider />
        </Reveal>
      </div>
    </section>
  );
}
