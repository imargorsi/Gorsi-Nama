export function CommunityLinkPreview({ url }: { url: string }) {
  let host = url;
  try {
    host = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }

  if (!host) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-w-0 items-center gap-3 rounded-lg border border-espresso/40 bg-transparent px-3 py-2.5 text-sm text-espresso transition-colors hover:border-espresso/70"
    >
      <span className="min-w-0">
        <span className="block truncate font-medium">{host}</span>
        <span className="mt-0.5 block truncate text-xs text-warm-gray">{url}</span>
      </span>
    </a>
  );
}
