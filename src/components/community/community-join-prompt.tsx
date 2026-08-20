"use client";

import { MessagesSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CommunityAvatar } from "@/components/community/community-avatar";
import { EmptyWell } from "@/components/empty-well";
import { FadeIn } from "@/components/reveal";
import { surfaceClass } from "@/components/surface";
import { Heading, Text } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CommunityJoinPrompt() {
  const t = useTranslations("Community");

  return (
    <FadeIn
      className={cn(
        surfaceClass,
        "flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6"
      )}
    >
      <CommunityAvatar name="Gujjar Nama" size="lg" />
      <div className="min-w-0 flex-1">
        <Heading as="p" variant="card">
          {t("joinTitle")}
        </Heading>
        <Text variant="small" className="mt-1">
          {t("joinText")}
        </Text>
      </div>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
        <Link href="/auth/login" className={cn(buttonVariants({ variant: "outline" }))}>
          {t("signIn")}
        </Link>
        <Link href="/auth/signup" className={cn(buttonVariants())}>
          {t("joinCta")}
        </Link>
      </div>
    </FadeIn>
  );
}

export function CommunityEmptyPrompt({
  isFiltered,
}: {
  isFiltered: boolean;
}) {
  const t = useTranslations("Community");

  return (
    <EmptyWell
      icon={MessagesSquare}
      title={isFiltered ? t("emptyFilteredTitle") : t("emptyTitle")}
      text={isFiltered ? t("emptyFilteredText") : t("emptyText")}
    />
  );
}
