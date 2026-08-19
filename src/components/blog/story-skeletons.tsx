import { Skeleton } from "@/components/ui/skeleton";
import { surfaceClass } from "@/components/surface";
import { cn } from "@/lib/utils";

function StoryCardSkeleton({
  variant = "compact",
  mediaClassName,
  className,
}: {
  variant?: "featured" | "compact";
  mediaClassName?: string;
  className?: string;
}) {
  const isHero = variant === "featured";

  return (
    <div
      className={cn(
        surfaceClass,
        "flex h-full min-h-0 min-w-0 flex-col overflow-hidden",
        className
      )}
    >
      <Skeleton
        className={cn(
          "rounded-none",
          isHero ? "min-h-48 flex-1" : "aspect-16/9 shrink-0",
          mediaClassName
        )}
      />
      <div className={cn("flex flex-col gap-2.5 px-4 py-3 sm:px-5", isHero && "shrink-0")}>
        <Skeleton className="h-5 w-4/5" />
        <div className="flex items-center gap-3">
          <Skeleton className="size-7 shrink-0 rounded-full" />
          <Skeleton className="h-4 w-2/5" />
        </div>
      </div>
    </div>
  );
}

export function StoryListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      aria-busy="true"
      aria-label="Loading stories"
    >
      {Array.from({ length: count }, (_, index) => (
        <StoryCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function StoryHomeSkeleton() {
  return (
    <div
      className="mt-8 grid grid-cols-1 gap-4 lg:mt-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-stretch lg:gap-5"
      aria-busy="true"
      aria-label="Loading stories"
    >
      <StoryCardSkeleton variant="featured" className="min-h-72 lg:min-h-96" />
      <div className="grid min-h-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2">
        <StoryCardSkeleton mediaClassName="aspect-auto h-36 lg:h-40" />
        <StoryCardSkeleton mediaClassName="aspect-auto h-36 lg:h-40" />
      </div>
    </div>
  );
}

export function StoryEditorSkeleton() {
  return (
    <div
      className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_19.5rem] lg:items-start"
      aria-busy="true"
      aria-label="Loading editor"
    >
      <div className={cn(surfaceClass, "overflow-hidden px-5 py-6 sm:px-8 sm:py-8")}>
        <Skeleton className="h-10 w-3/4 sm:h-12" />
        <Skeleton className="mt-6 h-36 w-full rounded-lg sm:h-44" />
        <div className="mt-6 space-y-3 border-t border-espresso/10 pt-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className={cn(surfaceClass, "space-y-3 p-5")}>
          <Skeleton className="h-3 w-16 rounded-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
        </div>
        <div className={cn(surfaceClass, "space-y-4 p-5")}>
          <Skeleton className="h-3 w-16 rounded-full" />
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>
  );
}

export function StoryArticleSkeleton() {
  return (
    <>
      <div className="site-shell px-4 pt-6 sm:px-0 sm:pt-8">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-3 w-3" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-3 w-3" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
      <div
        className="site-shell px-4 pt-8 pb-16 sm:px-0 sm:pt-10 sm:pb-20"
        aria-busy="true"
        aria-label="Loading story"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_19.5rem] lg:items-start">
          <div className={cn(surfaceClass, "overflow-hidden px-5 py-6 sm:px-8 sm:py-8")}>
            <Skeleton className="h-3 w-20 rounded-full" />
            <Skeleton className="mt-3 h-10 w-4/5 sm:h-12" />
            <Skeleton className="mt-4 h-5 w-full" />
            <Skeleton className="mt-2 h-5 w-2/3" />
            <Skeleton className="mt-6 aspect-16/9 w-full rounded-lg" />
            <div className="mt-6 space-y-3 border-t border-espresso/10 pt-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
          <div className={cn(surfaceClass, "space-y-5 p-5")}>
            <Skeleton className="h-3 w-16 rounded-full" />
            <div className="flex items-center gap-2.5">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    </>
  );
}

export function ProfileStoriesSkeleton() {
  return (
    <ul className="mt-6 flex flex-col gap-3" aria-busy="true" aria-label="Loading your stories">
      {Array.from({ length: 3 }, (_, index) => (
        <li
          key={index}
          className="surface flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center"
        >
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-5 w-3/5" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-10" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export { StoryCardSkeleton };
