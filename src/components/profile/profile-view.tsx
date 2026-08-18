"use client";

import { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ProfileEditDialog } from "@/components/profile/profile-edit-dialog";
import { ProfilePortrait } from "@/components/profile/profile-portrait";
import { ProfileSavedContent } from "@/components/profile/profile-saved-content";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import { ProfileStories } from "@/components/profile/profile-stories";
import { fadeUp } from "@/components/reveal";
import { routing } from "@/i18n/routing";
import type { ProfileDetails, UserInfo } from "@/components/profile/profile.schemas";

export function ProfileView({
  userDetails,
  profile,
  sharePath,
  canEdit,
  isLoadingProfile,
  loadError,
}: {
  userDetails: UserInfo;
  profile: ProfileDetails;
  sharePath: string;
  canEdit: boolean;
  isLoadingProfile: boolean;
  loadError?: string;
}) {
  const { openUserProfile, signOut } = useClerk();
  const locale = useLocale();
  const t = useTranslations("Nav");
  const [isEditing, setIsEditing] = useState(false);
  const homePath = locale === routing.defaultLocale ? "/" : `/${locale}`;

  return (
    <div className="site-shell px-4 py-12 sm:px-0 sm:py-16">
      {loadError ? (
        <p className="mb-8 rounded-xl bg-card px-4 py-3 text-sm text-destructive ring-1 ring-destructive/20">
          {loadError} You can still manage your account.
        </p>
      ) : null}

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
        }}
        className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start xl:grid-cols-[minmax(0,1fr)_22rem]"
      >
        <motion.div variants={fadeUp} className="min-w-0">
          <ProfilePortrait
            userDetails={userDetails}
            profile={profile}
            canEdit={canEdit}
            isLoadingProfile={isLoadingProfile}
            onEdit={() => setIsEditing(true)}
            onManageAccount={() => openUserProfile()}
            onSignOut={() => signOut({ redirectUrl: homePath })}
            signOutLabel={t("logOut")}
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <ProfileSidebar
            details={profile}
            sharePath={sharePath}
            isLoading={isLoadingProfile}
          />
        </motion.div>

        <motion.div variants={fadeUp} className="lg:col-span-2">
          <ProfileStories userId={userDetails.userId} />
        </motion.div>

        <motion.div variants={fadeUp} className="lg:col-span-2">
          <ProfileSavedContent />
        </motion.div>
      </motion.div>

      {canEdit ? (
        <ProfileEditDialog details={profile} open={isEditing} onOpenChange={setIsEditing} />
      ) : null}
    </div>
  );
}
