export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      {eyebrow && (
        <span className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading text-2xl font-semibold sm:text-3xl">{title}</h2>
      {description && (
        <p className="max-w-2xl text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
