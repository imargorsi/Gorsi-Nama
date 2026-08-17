import { Link } from "@/i18n/navigation";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { PlaceholderBlock } from "./placeholder-block";

export function CommunityPulse() {
  return (
    <section className="site-shell px-4 py-16 sm:px-0">
      <SectionHeading
        eyebrow="Community Pulse"
        title="What's Happening in Our Community"
        description="Recent posts and discussions from the Gorsi community will appear here once the community feed is live."
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <PlaceholderBlock label="Latest community post" />
        <PlaceholderBlock label="Latest community post" />
        <PlaceholderBlock icon={MessageCircle} label="Latest discussion" />
      </div>

      <Link
        href="/member"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        View Community
        <ArrowRight className="size-4" />
      </Link>
    </section>
  );
}
