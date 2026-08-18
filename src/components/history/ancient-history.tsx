import Image from "next/image";
import { HeritageRule } from "@/components/heritage-ornaments";
import { Reveal } from "@/components/reveal";
import { surfaceClass } from "@/components/surface";
import { cn } from "@/lib/utils";

export function AncientHistory() {
  return (
    <section className="site-shell px-4 py-8 sm:px-0 sm:py-10">
      <Reveal>
        <p className="heritage-eyebrow">Origins</p>
        <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-espresso sm:text-3xl">
          Ancient Origins of the Gujjars (5th Century A.D.)
        </h2>
        <HeritageRule className="mt-4" />
      </Reveal>

      <Reveal className="mt-8 grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className={cn(surfaceClass, "relative aspect-4/3 overflow-hidden")}>
          <Image
            src="/oldhsitory.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <p className="text-sm leading-relaxed text-warm-gray sm:text-base">
          The Gujjars, an ancient and significant ethnic group, have roots
          that can be traced back to around the 5th century A.D. Scholars
          debate their exact origin, but many believe that they migrated from
          Central Asia into the Indian subcontinent, settling across
          modern-day India, Pakistan, and Afghanistan. Some historians even
          suggest links to the Kushan Empire (30-375 CE). During this time,
          the Gujjars began establishing their influence in various regions,
          laying the groundwork for their legacy.
        </p>
      </Reveal>

      <Reveal className="mt-12 grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className="flex min-w-0 flex-col">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-espresso sm:text-3xl">
            Migration and Settlement (6th-12th Century)
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-warm-gray sm:text-base">
            As the centuries passed, the Gujjars migrated to different parts
            of the subcontinent, spreading into regions like northern India
            and what is now Pakistan. The Gorsi clan, a subgroup of the
            Gujjars, was part of this migratory wave, settling in areas that
            are today part of Punjab, Azad Kashmir, and Khyber Pakhtunkhwa.
            Over time, the Gorsi Gujjars adopted a semi-nomadic lifestyle,
            primarily engaged in pastoralism and agriculture.
          </p>
        </div>

        <figure className="flex min-w-0 flex-col gap-3">
          <figcaption className="heritage-eyebrow">
            Walkthrough Our History
          </figcaption>
          <div className={cn(surfaceClass, "relative aspect-4/3 overflow-hidden")}>
            <Image
              src="/emoire.webp"
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </figure>
      </Reveal>
    </section>
  );
}
