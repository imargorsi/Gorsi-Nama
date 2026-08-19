"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initialsFromName } from "@/lib/initials";
import { cn } from "@/lib/utils";

export function CommunityAvatar({
  name,
  imageUrl,
  size = "default",
  className,
}: {
  name: string;
  imageUrl?: string;
  size?: "default" | "lg" | "xl";
  className?: string;
}) {
  return (
    <Avatar
      className={cn(
        "shrink-0 bg-espresso text-ivory",
        size === "default" && "size-8 ring-1 ring-gold/30 after:border-gold/25",
        size === "lg" && "size-11 ring-1 ring-gold/30 after:border-gold/25",
        size === "xl" &&
          "size-20 ring-2 ring-gold/45 after:hidden sm:size-24",
        className
      )}
    >
      {imageUrl ? <AvatarImage src={imageUrl} alt="" /> : null}
      <AvatarFallback
        className={cn(
          "bg-espresso font-heading font-semibold text-ivory",
          size === "xl" ? "text-xl sm:text-2xl" : "text-sm"
        )}
      >
        {initialsFromName(name)}
      </AvatarFallback>
    </Avatar>
  );
}
