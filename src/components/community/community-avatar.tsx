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
  size?: "default" | "lg" | "xl";
}) {
  return (
    <Avatar
      size={size === "default" ? "default" : "lg"}
      className={cn(
        "bg-espresso text-ivory ring-1 ring-gold/30 after:border-gold/25",
        size === "lg" && "size-11",
        size === "xl" &&
          "size-28 shadow-md ring-2 ring-gold/45 ring-offset-4 ring-offset-background after:hidden sm:size-32"
      )}
    >
      {imageUrl ? <AvatarImage src={imageUrl} alt="" /> : null}
      <AvatarFallback
        className={cn(
          "bg-espresso font-heading font-semibold text-ivory",
          size === "xl" ? "text-3xl" : "text-sm"
        )}
      >
        {initialsFromName(name)}
      </AvatarFallback>
    </Avatar>
  );
}
