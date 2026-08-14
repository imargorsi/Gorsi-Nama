import { ImageOff } from "lucide-react";

export function PhotoGallery() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-espresso/15 bg-card py-16 text-center">
      <ImageOff className="size-8 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">
        No photos yet — check back soon.
      </p>
    </div>
  );
}
