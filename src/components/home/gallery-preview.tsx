import { Image as ImageIcon } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { PlaceholderBlock } from "./placeholder-block";

export function GalleryPreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading
        title="Moments We Remember"
        description="Photographs and memories that bring our shared history to life."
      />

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <PlaceholderBlock key={index} icon={ImageIcon} label="Photo" className="min-h-24" />
        ))}
      </div>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
        Explore Gallery — coming soon
      </span>
    </section>
  );
}
