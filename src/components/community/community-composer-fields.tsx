import type { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { X } from "lucide-react";
import { FieldError } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CommunityLinkPreview } from "@/components/community/community-link-preview";
import { CommunityPhoto } from "@/components/community/community-photo";
import type { CommunityPostValues } from "@/components/community/community.schemas";

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
    <CommunityPhoto src={previewUrl} variant="composer" className="mt-3">
      {isUploading ? (
        <p className="absolute inset-0 flex items-center justify-center bg-espresso/45 text-sm text-ivory">
          Uploading…
        </p>
      ) : null}
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove photo"
        className="absolute top-2 end-2 inline-flex size-11 items-center justify-center rounded-full bg-espresso/80 text-ivory transition-colors hover:bg-espresso"
      >
        <X className="size-4" />
      </button>
    </CommunityPhoto>
  );
}

export function ComposerLinkField({
  register,
  setValue,
  linkUrl,
  errorMessage,
  onClose,
}: {
  register: UseFormRegister<CommunityPostValues>;
  setValue: UseFormSetValue<CommunityPostValues>;
  linkUrl?: string;
  errorMessage?: string;
  onClose: () => void;
}) {
  return (
    <div className="mt-3 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor="community-link">Link</Label>
        <button
          type="button"
          onClick={() => {
            setValue("linkUrl", "");
            onClose();
          }}
          aria-label="Remove link"
          className="inline-flex size-11 items-center justify-center rounded-lg text-warm-gray hover:text-espresso"
        >
          <X className="size-3.5" />
        </button>
      </div>
      <Input
        id="community-link"
        {...register("linkUrl")}
        type="url"
        placeholder="https://"
      />
      {errorMessage ? <FieldError>{errorMessage}</FieldError> : null}
      {linkUrl ? <CommunityLinkPreview url={linkUrl} /> : null}
    </div>
  );
}
