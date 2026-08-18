"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ImageIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "@/i18n/navigation";
import { blogCategories } from "@/components/blog/blog-categories";
import {
  blogPostSchema,
  type BlogPostValues,
} from "@/components/blog/blog.schemas";
import {
  takenStorySlugs,
  upsertMemberStory,
} from "@/components/blog/member-stories";
import { ComposerPhotoPreview } from "@/components/community/community-composer-fields";
import { FormField, nativeSelectClassName } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUploadPhoto } from "@/components/uploads/use-upload-photo";
import { surfaceClass } from "@/components/surface";
import { excerptFromContent, type BlogPost } from "@/data/blog-posts";
import { parseTags } from "@/lib/parse-tags";
import { slugify, uniqueSlug } from "@/lib/slugify";
import { maxImageUploadMb } from "@/lib/storage/upload.schemas";
import { cn } from "@/lib/utils";

export function StoryEditor({ story }: { story?: BlogPost }) {
  const router = useRouter();
  const { user } = useUser();
  const photo = useUploadPhoto();
  const [slugTouched, setSlugTouched] = useState(Boolean(story));
  const isEdit = Boolean(story);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BlogPostValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: story?.title ?? "",
      slug: story?.slug ?? "",
      excerpt: story?.excerpt ?? "",
      content: story?.content ?? "",
      categoryId: story?.categoryId ?? "family",
      tags: story?.tags.join(", ") ?? "",
      featuredImage: story?.featuredImage ?? "",
      status: story?.status ?? "publish",
    },
  });

  const title = useWatch({ control, name: "title" });
  const excerpt = useWatch({ control, name: "excerpt" });
  const featuredImage = useWatch({ control, name: "featuredImage" });
  const { onChange: onSlugChange, ...slugRegister } = register("slug");

  useEffect(() => {
    if (slugTouched || isEdit) return;
    setValue("slug", slugify(title), { shouldValidate: false });
  }, [isEdit, setValue, slugTouched, title]);

  useEffect(() => {
    if (photo.photoUrl) setValue("featuredImage", photo.photoUrl);
  }, [photo.photoUrl, setValue]);

  const featuredPreview =
    photo.photoPreview || photo.photoUrl || featuredImage;
  const isBusy = isSubmitting || photo.isUploading;

  function onSubmit(values: BlogPostValues) {
    if (!story && !user?.id) return;

    const now = new Date().toISOString();
    const saved = upsertMemberStory({
      id: story?.id ?? `story-${Date.now()}`,
      slug: uniqueSlug(values.slug, takenStorySlugs(story?.id)),
      title: values.title,
      excerpt: values.excerpt?.trim() || excerptFromContent(values.content),
      content: values.content,
      categoryId: values.categoryId,
      tags: parseTags(values.tags ?? ""),
      featuredImage: photo.photoUrl || values.featuredImage || undefined,
      status: values.status,
      authorName: story ? story.authorName : user?.fullName || "Member",
      authorId: story ? story.authorId : user?.id,
      publishedAt:
        values.status === "publish" ? (story?.publishedAt ?? now) : story?.publishedAt,
      updatedAt: now,
    });

    toast.message(
      saved.status === "draft"
        ? "Draft saved on this device for now. The archive backend is next."
        : "Your story is on the site for now. Saving to the archive is next."
    );
    router.push(saved.status === "publish" ? `/blog/${saved.slug}` : "/profile");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(surfaceClass, "mx-auto max-w-3xl p-5 sm:p-8")}
    >
      <div className="flex flex-col gap-5">
        <FormField id="story-title" label="Title" error={errors.title?.message}>
          <Input
            id="story-title"
            {...register("title")}
            className="h-11"
            placeholder="A memory, a person, a place…"
            aria-invalid={Boolean(errors.title)}
          />
        </FormField>

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
            onChange={(event) => {
              setSlugTouched(true);
              void onSlugChange(event);
            }}
            aria-invalid={Boolean(errors.slug)}
          />
        </FormField>

        <FormField
          id="story-excerpt"
          label="Excerpt"
          hint="Optional — used on cards"
          error={errors.excerpt?.message}
        >
          <Textarea
            id="story-excerpt"
            {...register("excerpt")}
            rows={3}
            placeholder="A short summary. Leave blank to use the opening lines."
            aria-invalid={Boolean(errors.excerpt)}
          />
          <p className="text-xs text-muted-foreground">{excerpt?.length ?? 0}/300</p>
        </FormField>

        <FormField id="story-content" label="Content" error={errors.content?.message}>
          <Textarea
            id="story-content"
            {...register("content")}
            rows={12}
            placeholder="Write the story in plain text."
            aria-invalid={Boolean(errors.content)}
          />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
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
          <FormField
            id="story-tags"
            label="Tags"
            hint="Comma-separated"
            error={errors.tags?.message}
          >
            <Input
              id="story-tags"
              {...register("tags")}
              className="h-11"
              placeholder="Gorsi, Family, Memories"
            />
          </FormField>
        </div>

        <FormField id="story-image" label="Featured image">
          {featuredPreview ? (
            <ComposerPhotoPreview
              previewUrl={featuredPreview}
              isUploading={photo.isUploading}
              onRemove={() => {
                photo.clearPhoto();
                setValue("featuredImage", "");
              }}
            />
          ) : (
            <button
              type="button"
              onClick={photo.openPicker}
              className="mt-1 flex h-28 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-espresso/20 text-sm text-warm-gray hover:text-espresso"
            >
              <ImageIcon className="size-4" />
              Add a featured image
            </button>
          )}
          <input {...photo.fileInputProps} />
          <p className="text-xs text-muted-foreground">
            JPEG, PNG, WebP, or GIF. Max {maxImageUploadMb} MB.
          </p>
        </FormField>

        <FormField id="story-status" label="Status">
          <select
            id="story-status"
            {...register("status")}
            className={cn(nativeSelectClassName, "sm:max-w-xs")}
          >
            <option value="publish">Published</option>
            <option value="draft">Draft</option>
          </select>
        </FormField>

        <div className="flex flex-col gap-3 border-t border-espresso/10 pt-5 sm:flex-row sm:justify-end">
          <Button type="button" variant="ghost" className="h-11" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isBusy}
            className="h-11 bg-gold px-5 text-espresso hover:bg-gold/90"
          >
            {isEdit ? "Update story" : "Save story"}
          </Button>
        </div>
      </div>
    </form>
  );
}
