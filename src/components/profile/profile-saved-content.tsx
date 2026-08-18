import { BookOpen, Bookmark, ImageIcon } from "lucide-react";
import Image from "next/image";
import { AccentIcon } from "@/components/accent-icon";
import { SectionHeading } from "@/components/home/section-heading";
import { surfaceClass } from "@/components/surface";
import { cn } from "@/lib/utils";

const slots = [
  {
    title: "Stories",
    description: "Articles and family narratives you bookmark.",
    icon: BookOpen,
  },
  {
    title: "Posts",
    description: "Community posts you want to return to.",
    icon: Bookmark,
  },
  {
    title: "Photos",
    description: "Photographs saved from the library.",
    icon: ImageIcon,
  },
] as const;

export function ProfileSavedContent() {
  return (
    <section id="saved-content">
      <SectionHeading
        eyebrow="Archive"
        title="Saved Content"
        description="Stories, posts, and photos you save will gather here."
      />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {slots.map((slot) => {
          const Icon = slot.icon;
          return (
            <article
              key={slot.title}
              className={cn(surfaceClass, "relative overflow-hidden px-5 py-6")}
            >
              <Image
                src="/trademarkgorsi.png"
                alt=""
                width={160}
                height={160}
                className="pointer-events-none absolute -right-6 -bottom-8 w-28 opacity-[0.06]"
              />
              <AccentIcon icon={Icon} size="sm" />
              <h3 className="relative mt-4 font-heading text-xl font-semibold">{slot.title}</h3>
              <p className="relative mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {slot.description}
              </p>
              <p className="heritage-eyebrow relative mt-5">Coming soon</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
