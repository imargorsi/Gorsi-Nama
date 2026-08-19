import { Bookmark } from "lucide-react";
import { AccentIcon } from "@/components/accent-icon";
import { SectionHeading } from "@/components/home/section-heading";
import { surfaceClass } from "@/components/surface";
import { cn } from "@/lib/utils";

export function ProfileSavedContent() {
  return (
    <section id="saved-content">
      <SectionHeading
        eyebrow="Saved"
        title="Saved Posts"
        description="Community posts you save will gather here."
      />

      <div
        className={cn(
          surfaceClass,
          "mt-8 flex flex-col items-center gap-3 px-5 py-12 text-center"
        )}
      >
        <AccentIcon icon={Bookmark} size="lg" />
        <p className="font-heading text-lg font-semibold text-espresso">
          Nothing Saved Yet
        </p>
        <p className="max-w-sm text-sm leading-relaxed text-warm-gray">
          When you save a post on the community feed, it will appear here so you
          can find it again.
        </p>
      </div>
    </section>
  );
}
