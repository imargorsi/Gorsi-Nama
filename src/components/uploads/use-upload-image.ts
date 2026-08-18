"use client";

import { useMutation } from "@tanstack/react-query";
import {
  createUploadResponseSchema,
  isAllowedImageMimeType,
  maxImageUploadBytes,
  maxImageUploadMb,
  type UploadFolder,
} from "@/lib/storage/upload.schemas";

async function readError(response: Response) {
  try {
    const body: unknown = await response.json();
    if (body && typeof body === "object" && "error" in body) {
      const message = (body as { error: unknown }).error;
      if (typeof message === "string") return message;
    }
  } catch {
    // fall through
  }
  return "Could not upload the image.";
}

function assertImageFile(file: File) {
  if (!isAllowedImageMimeType(file.type)) {
    throw new Error("Use a JPG, PNG, WebP, or GIF image.");
  }
  if (file.size > maxImageUploadBytes) {
    throw new Error(`Keep photos under ${maxImageUploadMb} MB.`);
  }
}

async function uploadImageToR2({
  file,
  folder,
}: {
  file: File;
  folder: UploadFolder;
}) {
  assertImageFile(file);

  const signResponse = await fetch("/api/uploads", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type,
      size: file.size,
      folder,
    }),
  });

  if (!signResponse.ok) throw new Error(await readError(signResponse));

  const { uploadUrl, publicUrl, key } = createUploadResponseSchema.parse(
    await signResponse.json()
  );

  let putResponse: Response;
  try {
    putResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });
  } catch {
    throw new Error(
      "Could not reach image storage. The R2 bucket needs a CORS policy for this site."
    );
  }

  if (!putResponse.ok) {
    throw new Error("Could not store the image. Try again.");
  }

  return { key, publicUrl };
}

export function useUploadImage() {
  return useMutation({
    mutationFn: uploadImageToR2,
  });
}
