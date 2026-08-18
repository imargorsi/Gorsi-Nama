import Image from "next/image";
import { Stagger, StaggerItem } from "@/components/reveal";
import { surfaceClass } from "@/components/surface";
import { cn } from "@/lib/utils";

export function HistoryIntro() {
  return (
    <section className="site-shell px-4 py-12 sm:px-0 sm:py-16">
      <Stagger
        mode="load"
        className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14"
      >
        <StaggerItem index={0} className="flex min-w-0 flex-col">
          <p className="heritage-eyebrow mb-5">The chronicle</p>
          <p className="text-sm leading-relaxed text-warm-gray sm:text-base">
            Welcome to the historical journey of the Gorsi clan, a proud and
            resilient sub-tribe of the Gujjar community. Our roots run deep
            across the Indian subcontinent, where our ancestors have shaped
            history through migration, settlement, and cultural preservation.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-warm-gray sm:text-base">
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
        </StaggerItem>
        <StaggerItem
          index={1}
          className={cn(surfaceClass, "relative aspect-4/3 overflow-hidden")}
        >
          <Image
            src="/history_img.png"
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </StaggerItem>
      </Stagger>
    </section>
  );
}
