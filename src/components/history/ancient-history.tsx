import Image from "next/image";

export function AncientHistory() {
  return (
    <section className="site-shell px-4 py-8 sm:px-0">
      <h3 className="font-heading text-xl font-semibold">
        Ancient Origins of the Gujjars (5th Century A.D.)
      </h3>

      <div className="mt-6 grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div className="relative aspect-4/3 overflow-hidden rounded-xl">
          <Image
            src="/oldhsitory.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <p className="text-muted-foreground">
          The Gujjars, an ancient and significant ethnic group, have roots
          that can be traced back to around the 5th century A.D. Scholars
          debate their exact origin, but many believe that they migrated from
          Central Asia into the Indian subcontinent, settling across
          modern-day India, Pakistan, and Afghanistan. Some historians even
          suggest links to the Kushan Empire (30-375 CE). During this time,
          the Gujjars began establishing their influence in various regions,
          laying the groundwork for their legacy.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <h3 className="font-heading text-xl font-semibold">
            Migration and Settlement (6th-12th Century)
          </h3>
          <p className="text-muted-foreground">
            As the centuries passed, the Gujjars migrated to different parts
            of the subcontinent, spreading into regions like northern India
            and what is now Pakistan. The Gorsi clan, a subgroup of the
            Gujjars, was part of this migratory wave, settling in areas that
            are today part of Punjab, Azad Kashmir, and Khyber Pakhtunkhwa.
            Over time, the Gorsi Gujjars adopted a semi-nomadic lifestyle,
            primarily engaged in pastoralism and agriculture.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-medium text-muted-foreground">
            Walkthrough Our History
          </h4>
          <div className="relative aspect-4/3 overflow-hidden rounded-xl">
            <Image
              src="/emoire.webp"
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
