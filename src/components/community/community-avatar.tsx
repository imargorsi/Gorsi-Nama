"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initialsFromName } from "@/lib/initials";
import { cn } from "@/lib/utils";

export function CommunityAvatar({
  name,
  imageUrl,
  size = "default",
}: {
  name: string;
  imageUrl?: string;
  size?: "default" | "lg";
}) {
  return (
    <Avatar
      size={size === "lg" ? "lg" : "default"}
      className={cn(
        "bg-espresso text-ivory ring-1 ring-gold/30 after:border-gold/25",
        size === "lg" && "size-11"
      )}
    >
      {imageUrl ? <AvatarImage src={imageUrl} alt="" /> : null}
      <AvatarFallback className="bg-espresso font-heading text-sm font-semibold text-ivory">
        {initialsFromName(name)}
      </AvatarFallback>
    </Avatar>
  );
}
