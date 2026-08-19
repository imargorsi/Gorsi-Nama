"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { useUploadImage } from "@/components/uploads/use-upload-image";
import { getErrorMessage } from "@/lib/get-error-message";
import {
  imageInputAccept,
  type UploadFolder,
} from "@/lib/storage/upload.schemas";

export function useUploadPhoto(folder: UploadFolder = "community") {
  const uploadImage = useUploadImage();
  const [photoPreview, setPhotoPreview] = useState<string>();
  const [photoUrl, setPhotoUrl] = useState<string>();
  const [photoKey, setPhotoKey] = useState<string>();
  const photoInputRef = useRef<HTMLInputElement>(null);
  const photoRequestId = useRef(0);

  function clearPhoto() {
    photoRequestId.current += 1;
    if (photoPreview?.startsWith("blob:")) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(undefined);
    setPhotoUrl(undefined);
    setPhotoKey(undefined);
    if (photoInputRef.current) photoInputRef.current.value = "";
  }

  async function onPhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const requestId = ++photoRequestId.current;
    if (photoPreview?.startsWith("blob:")) URL.revokeObjectURL(photoPreview);
    setPhotoUrl(undefined);
    setPhotoKey(undefined);
    const preview = URL.createObjectURL(file);
    setPhotoPreview(preview);

    try {
      const uploaded = await uploadImage.mutateAsync({ file, folder });
      if (requestId !== photoRequestId.current) return;
      setPhotoUrl(uploaded.publicUrl);
      setPhotoKey(uploaded.key);
    } catch (error) {
      if (requestId !== photoRequestId.current) return;
      URL.revokeObjectURL(preview);
      setPhotoPreview(undefined);
      setPhotoUrl(undefined);
      setPhotoKey(undefined);
      if (photoInputRef.current) photoInputRef.current.value = "";
      toast.error(getErrorMessage(error, "Could not upload the image."));
    }
  }

  return {
    photoPreview,
    photoUrl,
    photoKey,
    isUploading: uploadImage.isPending,
    clearPhoto,
    openPicker() {
      photoInputRef.current?.click();
    },
    fileInputProps: {
      ref: photoInputRef,
      type: "file" as const,
      accept: imageInputAccept,
      className: "sr-only",
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        void onPhotoChange(event);
      },
    },
  };
}
