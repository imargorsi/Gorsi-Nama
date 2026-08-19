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
import { FieldError } from "@/components/form-field";
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
    <div className="site-shell px-4 pt-8 pb-16 sm:px-0 sm:pt-10 sm:pb-20">
      {loadError ? (
        <div className="mb-6 rounded-xl bg-ivory px-4 py-3 shadow-md">
          <FieldError>
            {loadError} You can still manage your account.
          </FieldError>
        </div>
      ) : null}

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
        }}
        className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_19.5rem] lg:items-start"
      >
        <motion.div variants={fadeUp} className="flex min-w-0 flex-col gap-10">
          <ProfilePortrait
            userDetails={userDetails}
            profile={profile}
            isLoadingProfile={isLoadingProfile}
          />
          <ProfileStories
            userId={userDetails.userId}
            firstName={userDetails.firstName}
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <ProfileSidebar
            details={profile}
            email={userDetails.email}
            sharePath={sharePath}
            isLoading={isLoadingProfile}
            canEdit={canEdit}
            onEdit={() => setIsEditing(true)}
            onManageAccount={() => openUserProfile()}
            onSignOut={() => signOut({ redirectUrl: homePath })}
            signOutLabel={t("logOut")}
          />
        </motion.div>

        <motion.div variants={fadeUp} className="lg:col-span-2">
          <ProfileSavedContent />
        </motion.div>
      </motion.div>

      {canEdit ? (
        <ProfileEditDialog
          details={profile}
          open={isEditing}
          onOpenChange={setIsEditing}
        />
      ) : null}
    </div>
  );
}
