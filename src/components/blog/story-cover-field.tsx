"use client";

import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/typography";
import { ImageUploadOverlay } from "@/components/uploads/image-upload-overlay";
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
      <div
        className="relative overflow-hidden rounded-lg bg-espresso/8"
        aria-busy={isUploading}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={previewUrl} alt="" className="block h-auto w-full" />
        {isUploading ? <ImageUploadOverlay /> : (
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-end gap-2 bg-linear-to-t from-espresso/70 to-transparent p-3">
            <Button type="button" variant="light" onClick={onPick}>
              Change
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-lg"
              onClick={onRemove}
              aria-label="Remove featured image"
              className="bg-espresso/80 text-ivory hover:bg-espresso hover:text-ivory"
            >
              <X className="size-4" />
            </Button>
          </div>
        )}
      </div>
    );
  }

  if (isUploading) {
    return (
      <div
        className="relative h-36 overflow-hidden rounded-lg sm:h-44"
        aria-busy="true"
      >
        <Skeleton className="size-full rounded-lg" />
        <ImageUploadOverlay />
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
      <Text as="span" variant="label">
        Add a featured image
      </Text>
      <Text as="span" variant="meta" className="max-w-xs text-center leading-relaxed">
        Optional. JPEG, PNG, WebP, or GIF · max {maxImageUploadMb} MB.
      </Text>
    </button>
  );
}
