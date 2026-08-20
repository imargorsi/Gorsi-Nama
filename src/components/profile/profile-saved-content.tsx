"use client";

import { Bookmark } from "lucide-react";
import { useTranslations } from "next-intl";
import { EmptyWell } from "@/components/empty-well";
import { SectionHeading } from "@/components/home/section-heading";

export function ProfileSavedContent() {
  const t = useTranslations("Profile");

  return (
    <section id="saved-content">
      <SectionHeading
        eyebrow={t("savedEyebrow")}
        title={t("savedTitle")}
        description={t("savedDescription")}
      />

      <EmptyWell
        icon={Bookmark}
        className="mt-8 py-12"
        title={t("savedEmptyTitle")}
        text={t("savedEmptyText")}
      />
    </section>
  );
}
