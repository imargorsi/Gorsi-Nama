"use client";

import { useRef } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Pencil } from "lucide-react";

const VALID_TYPES = ["image/jpeg", "image/png", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024;

export function ProfileImageUpload({
  value,
  onChange,
}: {
  value: string | null | undefined;
  onChange: (url: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!VALID_TYPES.includes(file.type)) {
      toast.error("Please upload an image file (jpeg, png, or gif)");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_SIZE) {
      toast.error("File size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    // No storage backend yet — preview only, not persisted anywhere.
    onChange(URL.createObjectURL(file));
  };

  return (
    <div className="relative size-20 shrink-0">
      <Image
        src={value || "/default.jpg"}
        alt=""
        fill
        sizes="80px"
        className="rounded-full object-cover"
      />
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="absolute right-0 bottom-0 flex size-6 items-center justify-center rounded-full bg-background text-foreground ring-1 ring-border"
        aria-label="Change photo"
      >
        <Pencil className="size-3" />
      </button>
    </div>
  );
}
