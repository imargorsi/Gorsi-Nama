import { cn } from "@/lib/utils";

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s]+)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold underline-offset-2 hover:underline"
        >
          {part}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export function CommunityPostBody({
  body,
  compact = false,
}: {
  body: string;
  compact?: boolean;
}) {
  if (compact) {
    const collapsed = body.split(/\n+/).filter(Boolean).join(" ");
    return (
      <p className="line-clamp-2 text-sm leading-relaxed text-espresso">
        {renderInline(collapsed)}
      </p>
    );
  }

  const paragraphs = body.split(/\n+/).filter(Boolean);

  return (
    <div className="text-sm leading-relaxed text-espresso">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={cn(index > 0 && "mt-3")}>
          {renderInline(paragraph)}
        </p>
      ))}
    </div>
  );
}
