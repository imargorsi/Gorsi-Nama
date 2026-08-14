"use client";

import { useRef } from "react";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export function ProfileCopyLink({ id }: { id: string }) {
  const textRef = useRef<HTMLParagraphElement>(null);

  const copyToClipboard = async () => {
    if (!textRef.current) return;
    try {
      await navigator.clipboard.writeText(textRef.current.innerText);
      toast.success("Text copied to clipboard");
    } catch {
      toast.error("Failed to copy text");
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg bg-muted px-3 py-2">
      <p ref={textRef} className="truncate text-sm select-text">
        {`www.gorsi.online/member/${id}`}
      </p>
      <button
        type="button"
        onClick={copyToClipboard}
        aria-label="Copy profile link"
        className="text-muted-foreground hover:text-foreground"
      >
        <Copy className="size-4" />
      </button>
    </div>
  );
}
