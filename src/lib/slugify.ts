const reservedSlugs = new Set(["write", "edit", "new", "mine"]);

export function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);

  return slug;
}

function isReservedSlug(slug: string) {
  return reservedSlugs.has(slug);
}

export function uniqueSlug(desired: string, taken: Iterable<string>) {
  const takenSet = new Set(taken);
  const base = slugify(desired) || "story";
  const start = isReservedSlug(base) ? `${base}-story` : base;
  if (!takenSet.has(start)) return start;

  let index = 2;
  while (takenSet.has(`${start}-${index}`)) index += 1;
  return `${start}-${index}`;
}
