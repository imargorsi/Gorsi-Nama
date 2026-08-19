import { Bookmark } from "lucide-react";
import { EmptyWell } from "@/components/empty-well";
import { SectionHeading } from "@/components/home/section-heading";

export function ProfileSavedContent() {
  return (
    <section id="saved-content">
      <SectionHeading
        eyebrow="Saved"
        title="Saved Posts"
        description="Community posts you save will gather here."
      />

      <EmptyWell
        icon={Bookmark}
        className="mt-8 py-12"
        title="Nothing Saved Yet"
        text="When you save a post on the community feed, it will appear here so you can find it again."
      />
    </section>
  );
}
