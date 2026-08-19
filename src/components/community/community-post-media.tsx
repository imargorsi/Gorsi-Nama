import { CommunityPhoto } from "@/components/community/community-photo";

const gridSizes = "(min-width: 1024px) 25vw, 50vw";

export function CommunityPostMedia({
  images,
  compact = false,
}: {
  images: string[];
  compact?: boolean;
}) {
  if (images.length === 0) {
    return compact ? (
      <div className="mt-3 aspect-4/3 rounded-lg bg-espresso/8" />
    ) : null;
  }

  if (compact || images.length === 1) {
    return (
      <CommunityPhoto
        src={images[0]!}
        sizes="(min-width: 1024px) 50vw, 100vw"
        variant={compact ? "compact" : "post"}
        className={compact ? "mt-3" : "mt-4"}
      />
    );
  }

  const visible = images.slice(0, 4);
  const leftover = Math.max(0, images.length - visible.length);
  const count = visible.length;

  if (count === 2) {
    return (
      <div className="mt-4 grid aspect-16/10 grid-cols-2 gap-0.5 overflow-hidden rounded-lg">
        {visible.map((src) => (
          <MediaTile key={src} src={src} />
        ))}
      </div>
    );
  }

  if (count === 3) {
    return (
      <div className="mt-4 grid aspect-16/10 grid-cols-2 grid-rows-2 gap-0.5 overflow-hidden rounded-lg">
        <MediaTile src={visible[0]!} className="row-span-2" />
        {visible.slice(1).map((src) => (
          <MediaTile key={src} src={src} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-4 grid aspect-square grid-cols-2 grid-rows-2 gap-0.5 overflow-hidden rounded-lg sm:aspect-16/10">
      {visible.map((src, index) => (
        <MediaTile
          key={src}
          src={src}
          leftover={index === visible.length - 1 ? leftover : 0}
        />
      ))}
    </div>
  );
}

function MediaTile({
  src,
  className,
  leftover = 0,
}: {
  src: string;
  className?: string;
  leftover?: number;
}) {
  return (
    <CommunityPhoto src={src} sizes={gridSizes} variant="fill" className={className}>
      {leftover > 0 ? (
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center bg-espresso/50 font-heading text-2xl text-ivory"
        >
          +{leftover}
        </span>
      ) : null}
    </CommunityPhoto>
  );
}
