import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/reveal";
import { CommunityFeed } from "@/components/community/community-feed";
import { SectionHeading } from "./section-heading";
import { SectionLink } from "./section-link";

export async function CommunityPulse() {
  const t = await getTranslations("Home.pulse");

  return (
    <section
      id="community-pulse"
      className="scroll-mt-28 pt-12 pb-16 sm:scroll-mt-32 sm:pt-16 sm:pb-20"
    >
      <div className="site-shell px-4 sm:px-0">
        <Reveal as="header">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          >
            <SectionLink href="/community">{t("cta")}</SectionLink>
          </SectionHeading>
        </Reveal>

        <Reveal className="mt-10" amount={0.12}>
          <CommunityFeed layout="slider" />
        </Reveal>
      </div>
    </section>
  );
}
