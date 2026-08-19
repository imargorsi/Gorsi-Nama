"use client";

import { useState } from "react";
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

const collapsedLength = 240;

export function CommunityPostBody({
  body,
  compact = false,
}: {
  body: string;
  compact?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (compact) {
    const collapsed = body.split(/\n+/).filter(Boolean).join(" ");
    return (
      <p className="line-clamp-2 text-sm leading-relaxed text-espresso">
        {renderInline(collapsed)}
      </p>
    );
  }

  const isLong = body.length > collapsedLength;
  const display = isLong && !isExpanded ? `${body.slice(0, collapsedLength).trimEnd()}…` : body;
  const paragraphs = display.split(/\n+/).filter(Boolean);

  return (
    <div>
      <div className="text-[0.95rem] leading-relaxed text-espresso">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={cn(index > 0 && "mt-3")}>
            {renderInline(paragraph)}
          </p>
        ))}
      </div>
      {isLong ? (
        <button
          type="button"
          onClick={() => setIsExpanded((open) => !open)}
          className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-gold transition-colors hover:text-espresso"
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>
      ) : null}
    </div>
  );
}
