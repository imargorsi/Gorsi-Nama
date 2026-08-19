import { HeritageCardGrid } from "@/components/heritage-card";
import { LibraryCategoryCard } from "@/components/library/library-category-card";
import { libraryCategories } from "@/components/library/library-categories";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "./section-heading";
import { SectionLink } from "./section-link";

export function LibraryPreview() {
  return (
    <section
      id="the-gorsi-library"
      className="scroll-mt-28 pt-12 pb-16 sm:scroll-mt-32 sm:pt-16 sm:pb-20"
    >
      <div className="site-shell px-4 sm:px-0">
        <Reveal as="header">
          <SectionHeading
            eyebrow="The Archive"
            title="The Gujjar Library"
            description="PDF documents and photographs of the Gujjar people, kept in one archive so the generations after us can still find, read, and remember what we were careful to keep."
          >
            <SectionLink href="/library">Explore the Library</SectionLink>
          </SectionHeading>
        </Reveal>

        <Stagger>
          <HeritageCardGrid className="mt-10 sm:mt-12 md:grid-cols-2 xl:grid-cols-2">
            {libraryCategories.map((category, index) => (
              <StaggerItem
                key={category.id}
                index={index}
                isHoverable
                className="h-full"
              >
                <LibraryCategoryCard category={category} />
              </StaggerItem>
            ))}
          </HeritageCardGrid>
        </Stagger>
      </div>
    </section>
  );
}
