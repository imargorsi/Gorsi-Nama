"use client";

import { Loader2 } from "lucide-react";
import { NotFoundPanel } from "@/components/not-found-panel";
import { ProfileView } from "@/components/profile/profile-view";
import { useMemberQuery } from "@/components/profile/use-member";

export function MemberProfileClient({ id }: { id: string }) {
  const { data: userDetails, isLoading } = useMemberQuery(id);

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!userDetails) {
    return (
      <NotFoundPanel
        heading="404 - User Not Found"
        text="The user you are looking for does not exist."
      />
    );
  }

  return <ProfileView userDetails={userDetails} isOwner={false} />;
}
