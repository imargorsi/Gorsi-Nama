"use client";

import { HeritageCard, HeritageCardGrid } from "@/components/heritage-card";
import { libraryCategories } from "@/components/library/library-categories";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "./section-heading";
import { SectionLink } from "./section-link";

export function LibraryPreview() {
  return (
    <section
      id="the-gorsi-library"
      className="scroll-mt-28 pt-12 pb-20 sm:scroll-mt-32 sm:pt-16 sm:pb-24"
    >
      <div className="site-shell px-4 sm:px-0">
        <Reveal as="header">
          <SectionHeading
            eyebrow="The Archive"
            title="The Gorsi Library"
            description="Three collections. One archive. Books, documents, and images kept for the generations after us."
          >
            <SectionLink href="/library">Explore the Library</SectionLink>
          </SectionHeading>
        </Reveal>

        <Stagger>
          <HeritageCardGrid className="mt-10 sm:mt-12 lg:grid-cols-3 xl:grid-cols-3">
            {libraryCategories.map((category, index) => (
              <StaggerItem
                key={category.id}
                index={index}
                isHoverable
                className="h-full"
              >
                <HeritageCard
                  index={index + 1}
                  category={category.eyebrow}
                  title={category.title}
                  description={category.description}
                  image={category.image}
                  href={`/library?category=${category.id}`}
                  cta={category.cta}
                  icon={category.icon}
                />
              </StaggerItem>
            ))}
          </HeritageCardGrid>
        </Stagger>
      </div>
    </section>
  );
}
