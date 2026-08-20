import { getTranslations } from "next-intl/server";
import { HeritageCard, HeritageCardGrid } from "@/components/heritage-card";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "./section-heading";

const cards = [
  {
    id: "history",
    index: 1,
    href: "/history",
    image: "/history-card.jpg",
  },
  {
    id: "stories",
    index: 2,
    href: "/blog",
    image: "/our-story.png",
  },
  {
    id: "people",
    index: 3,
    href: "/member",
    image: "/people.jpg",
  },
  {
    id: "archive",
    index: 4,
    href: "/library",
    image: "/slider/3.jpg",
  },
] as const;

export async function ExploreGrid() {
  const t = await getTranslations("Home.explore");

  return (
    <section
      id="explore-gorsi-nama"
      className="relative overflow-hidden scroll-mt-28 pt-10 pb-16 sm:scroll-mt-32 sm:pt-12 sm:pb-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 end-0 z-0 w-[min(72%,28rem)] [mask-image:linear-gradient(to_left,black_30%,transparent)] sm:w-[min(58%,36rem)] rtl:[mask-image:linear-gradient(to_right,black_30%,transparent)]"
      >
        <div className="h-full w-full bg-gold/30 [mask-image:url('/pattern-circle.png')] [mask-position:right_center] [mask-repeat:no-repeat] [mask-size:contain] [mask-mode:luminance] rtl:[mask-position:left_center]" />
      </div>

      <div className="site-shell relative z-10 px-4 sm:px-0">
        <Reveal as="header">
          <SectionHeading title={t("title")} description={t("description")} />
        </Reveal>

        <Stagger>
          <HeritageCardGrid className="mt-10 sm:mt-12">
            {cards.map((card, index) => (
              <StaggerItem
                key={card.href}
                index={index}
                isHoverable
                className="h-full"
              >
                <HeritageCard
                  index={card.index}
                  href={card.href}
                  image={card.image}
                  category={t(`cards.${card.id}.category`)}
                  title={t(`cards.${card.id}.title`)}
                  description={t(`cards.${card.id}.description`)}
                  cta={t(`cards.${card.id}.cta`)}
                />
              </StaggerItem>
            ))}
          </HeritageCardGrid>
        </Stagger>
      </div>
    </section>
  );
}
