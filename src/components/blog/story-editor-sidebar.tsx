"use client";

import type { ChangeEventHandler } from "react";
import type { FieldErrors, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("Stories.editor");
  const common = useTranslations("Common");
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
        {t("saveDraft")}
      </Button>
      <Button
        type="button"
        variant="ghost"
        disabled={isBusy}
        onClick={onCancel}
        className={cn(isRow ? "order-1 px-3" : "w-full")}
      >
        {common("cancel")}
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
  const t = useTranslations("Stories.editor");
  const common = useTranslations("Common");
  const categories = useTranslations("Stories.categories");

  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
      <section className={cn(surfaceClass, "p-5")}>
        <p className="heritage-eyebrow">{t("publishEyebrow")}</p>
        <Text variant="small" className="mt-3">
          {t("publishHint")}
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
        <p className="heritage-eyebrow">{t("detailsEyebrow")}</p>

        <FormField
          id="story-category"
          label={t("category")}
          error={errors.categoryId?.message}
        >
          <select
            id="story-category"
            {...register("categoryId")}
            className={nativeSelectClassName}
          >
            {blogCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {categories(category.id)}
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
          label={t("permalink")}
          hint={t("permalinkHint")}
          error={errors.slug?.message}
        >
          <Input
            id="story-slug"
            {...slugRegister}
            onChange={onSlugChange}
            aria-invalid={Boolean(errors.slug)}
          />
          <Text variant="meta">/blog/{slug || t("slugFallback")}</Text>
        </FormField>

        <FormField
          id="story-excerpt"
          label={t("excerpt")}
          hint={common("optional")}
          error={errors.excerpt?.message}
        >
          <Textarea
            id="story-excerpt"
            {...register("excerpt")}
            rows={4}
            placeholder={t("excerptPlaceholder")}
            aria-invalid={Boolean(errors.excerpt)}
          />
          <Text variant="meta">{excerptLength}/300</Text>
        </FormField>
      </section>
    </aside>
  );
}
