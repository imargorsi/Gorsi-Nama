"use client";

import { MessagesSquare } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CommunityAvatar } from "@/components/community/community-avatar";
import { EmptyWell } from "@/components/empty-well";
import { surfaceClass } from "@/components/surface";
import { Heading, Text } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CommunityJoinPrompt() {
  return (
    <div className={cn(surfaceClass, "flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6")}>
      <CommunityAvatar name="Gorsi Nama" size="lg" />
      <div className="min-w-0 flex-1">
        <Heading as="p" variant="card">
          Sit With the Conversation
        </Heading>
        <Text variant="small" className="mt-1">
          Sign in to share a memory, a question, or a photograph with the Gorsi
          community.
        </Text>
      </div>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
        <Link href="/auth/login" className={cn(buttonVariants({ variant: "outline" }))}>
          Sign in
        </Link>
        <Link href="/auth/signup" className={cn(buttonVariants())}>
          Join Gorsi Nama
        </Link>
      </div>
    </div>
  );
}

export function CommunityEmptyPrompt({
  isFiltered,
}: {
  isFiltered: boolean;
}) {
  return (
    <EmptyWell
      icon={MessagesSquare}
      title={isFiltered ? "No Posts in This Filter Yet" : "The Room Is Quiet"}
      text={
        isFiltered
          ? "Try another category or tag, or be the first to share a photograph or a question here."
          : "Be the first to share a memory, a question, or a photograph with the Gorsi community."
      }
    />
  );
}
