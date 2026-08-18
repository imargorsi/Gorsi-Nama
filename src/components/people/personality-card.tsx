import Image from "next/image";
import { surfaceClass } from "@/components/surface";
import { cn } from "@/lib/utils";
import type { NotablePerson } from "@/data/notable-people";

export function PersonalityCard({ person }: { person: NotablePerson }) {
  return (
    <article className={cn(surfaceClass, "flex h-full min-w-0 flex-col overflow-hidden")}>
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={person.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="heritage-eyebrow">{person.role}</p>
        <h3 className="mt-2 font-heading text-xl font-semibold tracking-tight text-espresso">
          {person.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-warm-gray">
          {person.summary}
        </p>
      </div>
    </article>
  );
}
