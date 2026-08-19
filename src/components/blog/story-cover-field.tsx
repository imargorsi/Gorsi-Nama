"use client";

import { ImagePlus, X } from "lucide-react";
import { maxImageUploadMb } from "@/lib/storage/upload.schemas";
import { cn } from "@/lib/utils";

export function StoryCoverField({
  previewUrl,
  isUploading,
  onPick,
  onRemove,
}: {
  previewUrl?: string;
  isUploading: boolean;
  onPick: () => void;
  onRemove: () => void;
}) {
  if (previewUrl) {
    return (
      <div className="relative h-36 overflow-hidden rounded-lg bg-espresso/8 sm:h-44">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewUrl}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        {isUploading ? (
          <p className="absolute inset-0 flex items-center justify-center bg-espresso/45 text-sm text-ivory">
            Uploading…
          </p>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-end gap-2 bg-linear-to-t from-espresso/70 to-transparent p-3">
          <button
            type="button"
            onClick={onPick}
            className="inline-flex h-11 items-center rounded-lg bg-ivory/95 px-3 text-sm font-medium text-espresso hover:bg-ivory"
          >
            Change
          </button>
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove featured image"
            className="inline-flex size-11 items-center justify-center rounded-lg bg-espresso/80 text-ivory hover:bg-espresso"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onPick}
      className={cn(
        "flex h-36 w-full flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-espresso/15 bg-espresso/4 px-4 text-warm-gray sm:h-44",
        "transition-colors hover:bg-espresso/8 hover:text-espresso"
      )}
    >
      <span className="flex size-9 items-center justify-center rounded-full bg-gold/15">
        <ImagePlus className="size-4 text-gold" strokeWidth={1.75} />
      </span>
      <span className="text-sm font-medium">Add a featured image</span>
      <span className="max-w-xs text-center text-xs leading-relaxed">
        Optional. JPEG, PNG, WebP, or GIF · max {maxImageUploadMb} MB.
      </span>
    </button>
  );
}
