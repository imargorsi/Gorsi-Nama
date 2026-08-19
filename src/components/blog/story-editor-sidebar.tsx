"use client";

import type { ChangeEventHandler } from "react";
import type { FieldErrors, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import { blogCategories } from "@/components/blog/blog-categories";
import type { BlogPostValues } from "@/components/blog/blog.schemas";
import { StoryTagsField } from "@/components/blog/story-tags-field";
import { FormField, nativeSelectClassName } from "@/components/form-field";
import { surfaceClass } from "@/components/surface";
import { Text } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function StoryEditorActions({
  isBusy,
  primaryLabel,
  onPublish,
  onDraft,
  onCancel,
  layout = "stack",
  className,
}: {
  isBusy: boolean;
  primaryLabel: string;
  onPublish: () => void;
  onDraft: () => void;
  onCancel: () => void;
  layout?: "stack" | "row";
  className?: string;
}) {
  const isRow = layout === "row";

  return (
    <div className={cn(isRow ? "flex gap-2" : "flex flex-col gap-2", className)}>
      <Button
        type="button"
        disabled={isBusy}
        onClick={onPublish}
        className={cn(isRow ? "order-3 min-w-0 flex-1" : "w-full")}
      >
        {primaryLabel}
      </Button>
      <Button
        type="button"
        variant="outline"
        disabled={isBusy}
        onClick={onDraft}
        className={cn(isRow ? "order-2 min-w-0 flex-1" : "w-full")}
      >
        Save draft
      </Button>
      <Button
        type="button"
        variant="ghost"
        disabled={isBusy}
        onClick={onCancel}
        className={cn(isRow ? "order-1 px-3" : "w-full")}
      >
        Cancel
      </Button>
    </div>
  );
}

export function StoryEditorSidebar({
  register,
  errors,
  slugRegister,
  onSlugChange,
  excerptLength,
  slug,
  tags,
  onTagsChange,
  isBusy,
  primaryLabel,
  onPublish,
  onDraft,
  onCancel,
}: {
  register: UseFormRegister<BlogPostValues>;
  errors: FieldErrors<BlogPostValues>;
  slugRegister: Omit<UseFormRegisterReturn, "onChange">;
  onSlugChange: ChangeEventHandler<HTMLInputElement>;
  excerptLength: number;
  slug: string;
  tags: string;
  onTagsChange: (value: string) => void;
  isBusy: boolean;
  primaryLabel: string;
  onPublish: () => void;
  onDraft: () => void;
  onCancel: () => void;
}) {
  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
      <section className={cn(surfaceClass, "p-5")}>
        <p className="heritage-eyebrow">Publish</p>
        <Text variant="small" className="mt-3">
          Published stories appear on Stories right away. Drafts stay on this
          device until you publish them.
        </Text>
        <StoryEditorActions
          className="mt-4 hidden lg:flex"
          isBusy={isBusy}
          primaryLabel={primaryLabel}
          onPublish={onPublish}
          onDraft={onDraft}
          onCancel={onCancel}
        />
      </section>

      <section className={cn(surfaceClass, "flex flex-col gap-5 p-5")}>
        <p className="heritage-eyebrow">Details</p>

        <FormField
          id="story-category"
          label="Category"
          error={errors.categoryId?.message}
        >
          <select
            id="story-category"
            {...register("categoryId")}
            className={nativeSelectClassName}
          >
            {blogCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </FormField>

        <StoryTagsField
          value={tags}
          onChange={onTagsChange}
          error={errors.tags?.message}
        />

        <FormField
          id="story-slug"
          label="Permalink"
          hint="Auto from the title"
          error={errors.slug?.message}
        >
          <Input
            id="story-slug"
            {...slugRegister}
            className="h-11"
            onChange={onSlugChange}
            aria-invalid={Boolean(errors.slug)}
          />
          <p className="text-xs text-muted-foreground">
            /blog/{slug || "your-title"}
          </p>
        </FormField>

        <FormField
          id="story-excerpt"
          label="Excerpt"
          hint="Optional"
          error={errors.excerpt?.message}
        >
          <Textarea
            id="story-excerpt"
            {...register("excerpt")}
            rows={4}
            placeholder="A short summary for cards. Leave blank to use the opening lines."
            aria-invalid={Boolean(errors.excerpt)}
          />
          <p className="text-xs text-muted-foreground">{excerptLength}/300</p>
        </FormField>
      </section>
    </aside>
  );
}
