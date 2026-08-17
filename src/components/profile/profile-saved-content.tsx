import { BookOpen, Bookmark, ImageIcon } from "lucide-react";
import Image from "next/image";

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
    description: "Photographs saved from the gallery.",
    icon: ImageIcon,
  },
] as const;

export function ProfileSavedContent() {
  return (
    <section>
      <p className="heritage-eyebrow">Archive</p>
      <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
        Saved content
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Stories, posts, and photos you save will gather here.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {slots.map((slot) => {
          const Icon = slot.icon;
          return (
            <article
              key={slot.title}
              className="relative overflow-hidden rounded-xl bg-card px-5 py-6 ring-1 ring-foreground/10"
            >
              <Image
                src="/lion-trademark.png"
                alt=""
                width={160}
                height={160}
                className="pointer-events-none absolute -right-6 -bottom-8 w-28 opacity-[0.06]"
              />
              <Icon className="relative size-5 text-gold" aria-hidden />
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
