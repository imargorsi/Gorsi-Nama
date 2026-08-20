"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { CommunityPhoto } from "@/components/community/community-photo";
import { ImageUploadOverlay } from "@/components/uploads/image-upload-overlay";

export function ComposerPhotoPreview({
  previewUrl,
  isUploading,
  onRemove,
}: {
  previewUrl: string;
  isUploading: boolean;
  onRemove: () => void;
}) {
  const t = useTranslations("Community");

  return (
    <CommunityPhoto src={previewUrl} variant="composer" isBusy={isUploading}>
      {isUploading ? (
        <ImageUploadOverlay label={t("uploading")} />
      ) : (
        <button
          type="button"
          onClick={onRemove}
          aria-label={t("removePhoto")}
          className="absolute top-2 end-2 z-10 inline-flex size-11 items-center justify-center rounded-full bg-espresso/80 text-ivory transition-colors hover:bg-espresso"
        >
          <X className="size-4" />
        </button>
      )}
    </CommunityPhoto>
  );
}
