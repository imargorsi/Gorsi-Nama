import { BookOpen } from "lucide-react";

export function BookGallery() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-espresso/15 bg-card py-16 text-center">
      <BookOpen className="size-8 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">
        No documents yet — check back soon.
      </p>
    </div>
  );
}
