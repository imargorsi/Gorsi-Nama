import Image from "next/image";

export function HistoryIntro() {
  return (
    <section className="site-shell px-4 py-16 sm:px-0">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-2xl font-semibold">
            History of the Gorsi Clan
          </h2>
          <p className="text-muted-foreground">
            Welcome to the historical journey of the Gorsi clan, a proud and
            resilient sub-tribe of the Gujjar community. Our roots run deep
            across the Indian subcontinent, where our ancestors have shaped
            history through migration, settlement, and cultural preservation.
          </p>
          <p className="text-muted-foreground">
            This page is dedicated to exploring that legacy, celebrating the
            stories of our forefathers and their lasting impact. We believe
            that history is a collective narrative, and we warmly invite all
            members of our Gorsi family, both brothers and sisters, to
            contribute their knowledge and stories. If you have any
            information or memories that deserve to be part of our
            community&apos;s heritage, please reach out to us. Your input is
            valuable in preserving and enriching the history of our clan, and
            we&apos;ll gladly include it in our ongoing chronicle.
          </p>
        </div>
        <div className="relative aspect-4/3 overflow-hidden rounded-xl">
          <Image
            src="/history_img.png"
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
