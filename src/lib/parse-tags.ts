export const maxTagsPerPost = 8;

export function parseTags(value: string) {
  const tags = value
    .split(/[\s,]+/)
    .map((tag) => tag.replace(/^#/, "").trim())
    .filter(Boolean);

  return [...new Set(tags)].slice(0, maxTagsPerPost);
}

export function formatTag(tag: string) {
  return `#${tag.replace(/^#/, "")}`;
}
