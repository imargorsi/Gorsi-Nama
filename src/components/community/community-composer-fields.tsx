import { X } from "lucide-react";
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
  return (
    <CommunityPhoto src={previewUrl} variant="composer" isBusy={isUploading}>
      {isUploading ? (
        <ImageUploadOverlay />
      ) : (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove photo"
          className="absolute top-2 end-2 z-10 inline-flex size-11 items-center justify-center rounded-full bg-espresso/80 text-ivory transition-colors hover:bg-espresso"
        >
          <X className="size-4" />
        </button>
      )}
    </CommunityPhoto>
  );
}
