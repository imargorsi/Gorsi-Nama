export function excerptFromContent(content: string) {
  const text = content.trim().replace(/\s+/g, " ");
  if (text.length <= 180) return text;
  return `${text.slice(0, 177).trimEnd()}…`;
}

export function readingMinutes(post: { excerpt: string; content: string }) {
  const words = [post.excerpt, post.content]
    .filter(Boolean)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

export function displayName(user: {
  firstName: string | null;
  lastName: string | null;
}) {
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return name || "Member";
}

export function likePattern(query: string) {
  const safe = query.replace(/[%_\\]/g, "").trim();
  if (!safe) return undefined;
  return `%${safe}%`;
}
