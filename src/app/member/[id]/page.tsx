import type { Metadata } from "next";
import { NotFoundPanel } from "@/components/not-found-panel";

export const metadata: Metadata = {
  title: "Member Profile | Gorsi Nama",
};

// Member profiles aren't backed by real data yet — the legacy API this used
// to call is gone now that Clerk owns identity. See doc/data-and-backend.md
// for the planned Neon-backed member directory.
export default function MemberProfilePage() {
  return (
    <NotFoundPanel
      heading="Member Profiles Are Coming Soon"
      text="We're building out the community member directory. Check back soon."
    />
  );
}
