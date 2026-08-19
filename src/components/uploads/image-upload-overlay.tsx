import { Skeleton } from "@/components/ui/skeleton";

export function ImageUploadOverlay({
  label = "Uploading image",
}: {
  label?: string;
}) {
  return (
    <div
      className="absolute inset-0 z-10 flex flex-col justify-end bg-espresso/50"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
      <Skeleton className="absolute inset-0 rounded-none bg-ivory/10" />
      <div className="relative px-4 pb-4">
        <Skeleton className="h-1 w-full rounded-full bg-gold/45" />
      </div>
    </div>
  );
}
