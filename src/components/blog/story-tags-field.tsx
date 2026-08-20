"use client";

import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { FormField } from "@/components/form-field";
import { useTranslations } from "next-intl";
import { formatTag, maxTagsPerPost, parseTags } from "@/lib/parse-tags";
import { cn } from "@/lib/utils";

export function StoryTagsField({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const t = useTranslations("Stories.editor");
  const [draft, setDraft] = useState("");
  const tags = parseTags(value);
  const isFull = tags.length >= maxTagsPerPost;

  function commitDraft() {
    const next = parseTags([...tags, ...parseTags(draft)].join(", "));
    if (next.length === tags.length && !draft.trim()) return;
    onChange(next.join(", "));
    setDraft("");
  }

  function removeTag(tag: string) {
    onChange(tags.filter((item) => item !== tag).join(", "));
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      commitDraft();
      return;
    }

    if (event.key === "Backspace" && !draft && tags.length > 0) {
      event.preventDefault();
      removeTag(tags[tags.length - 1]);
    }
  }

  return (
    <FormField
      id="story-tag-input"
      label={t("tags")}
      hint={`${tags.length}/${maxTagsPerPost}`}
      error={error}
    >
      <div
        className={cn(
          "flex min-h-11 flex-wrap items-center gap-1.5 rounded-lg border border-input px-2 py-1.5",
          "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50"
        )}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex h-8 max-w-full items-center gap-1 rounded-full bg-espresso/8 ps-2.5 pe-1 text-xs font-medium text-espresso"
          >
            <span className="truncate">{formatTag(tag)}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              aria-label={t("removeTag", { tag })}
              className="inline-flex size-6 shrink-0 items-center justify-center rounded-full text-warm-gray hover:bg-espresso/10 hover:text-espresso"
            >
              <X className="size-3" />
            </button>
          </span>
        ))}
        <input
          id="story-tag-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={onKeyDown}
          onBlur={commitDraft}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          disabled={isFull}
          placeholder={tags.length === 0 ? t("tagPlaceholder") : ""}
          className="h-8 min-w-28 flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        />
      </div>
    </FormField>
  );
}
