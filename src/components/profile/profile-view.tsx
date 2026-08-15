"use client";

import { useClerk } from "@clerk/nextjs";
import { Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { UserInfo } from "@/components/profile/profile.schemas";

export function ProfileView({ userDetails }: { userDetails: UserInfo }) {
  const { openUserProfile } = useClerk();

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start gap-4 px-4 py-12 sm:flex-row sm:items-center sm:px-6">
      <Avatar size="lg" className="size-24">
        <AvatarImage src={userDetails.profilePhoto || "/default.jpg"} />
        <AvatarFallback>{userDetails.fullName?.[0]}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold">
          {userDetails.fullName}
        </h1>
        <p className="text-sm text-muted-foreground">{userDetails.email}</p>
        <div className="mt-2">
          <Button variant="outline" size="sm" onClick={() => openUserProfile()}>
            <Pencil />
            Manage Account
          </Button>
        </div>
      </div>
    </div>
  );
}
