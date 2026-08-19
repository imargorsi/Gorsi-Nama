"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "@/i18n/navigation";
import {
  blogPostSchema,
  type BlogPost,
  type BlogPostValues,
  type BlogStatus,
} from "@/components/blog/blog.schemas";
import { StoryCoverField } from "@/components/blog/story-cover-field";
import {
  StoryEditorActions,
  StoryEditorSidebar,
} from "@/components/blog/story-editor-sidebar";
import { useCreateStory, useUpdateStory } from "@/components/blog/use-stories";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUploadPhoto } from "@/components/uploads/use-upload-photo";
import { FieldError } from "@/components/form-field";
import { surfaceClass } from "@/components/surface";
import { headingVariants, Text } from "@/components/typography";
import { getErrorMessage } from "@/lib/get-error-message";
import { slugify } from "@/lib/slugify";
import { cn } from "@/lib/utils";

export function StoryEditor({ story }: { story?: BlogPost }) {
  const router = useRouter();
  const { user } = useUser();
  const photo = useUploadPhoto();
  const createStory = useCreateStory();
  const updateStory = useUpdateStory();
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
      featuredImageKey: story?.featuredImageKey ?? "",
      status: story?.status ?? "publish",
    },
  });

  const title = useWatch({ control, name: "title" });
  const slug = useWatch({ control, name: "slug" });
  const excerpt = useWatch({ control, name: "excerpt" });
  const tags = useWatch({ control, name: "tags" });
  const featuredImage = useWatch({ control, name: "featuredImage" });
  const { onChange: onSlugChange, ...slugRegister } = register("slug");

  useEffect(() => {
    if (slugTouched || isEdit) return;
    setValue("slug", slugify(title), { shouldValidate: false });
  }, [isEdit, setValue, slugTouched, title]);

  useEffect(() => {
    if (!photo.photoUrl) return;
    setValue("featuredImage", photo.photoUrl);
    setValue("featuredImageKey", photo.photoKey ?? "");
  }, [photo.photoKey, photo.photoUrl, setValue]);

  const featuredPreview =
    photo.photoPreview || photo.photoUrl || featuredImage;
  const isBusy =
    isSubmitting ||
    photo.isUploading ||
    createStory.isPending ||
    updateStory.isPending;
  const primaryLabel =
    isEdit && story?.status === "publish" ? "Update story" : "Publish story";

  async function onSubmit(values: BlogPostValues) {
    if (!story && !user?.id) return;

    const featuredImageKey =
      photo.photoKey || values.featuredImageKey || undefined;
    const payload: BlogPostValues = {
      ...values,
      featuredImageKey,
      featuredImage: featuredImageKey
        ? photo.photoUrl || values.featuredImage || undefined
        : undefined,
    };

    try {
      const saved = story
        ? await updateStory.mutateAsync({ slug: story.slug, values: payload })
        : await createStory.mutateAsync(payload);

      toast.success(
        saved.status === "draft"
          ? "Draft saved to your profile."
          : story
            ? "Story updated."
            : "Story published."
      );
      router.push(saved.status === "publish" ? `/blog/${saved.slug}` : "/profile");
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not save this story."));
    }
  }

  function submitWithStatus(status: BlogStatus) {
    setValue("status", status);
    void handleSubmit(onSubmit)();
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <input type="hidden" {...register("status")} />
      <input type="hidden" {...register("featuredImage")} />
      <input type="hidden" {...register("featuredImageKey")} />
      <input {...photo.fileInputProps} />

      <div className="grid gap-6 pb-24 lg:grid-cols-[minmax(0,1fr)_19.5rem] lg:items-start lg:pb-0">
        <div className={cn(surfaceClass, "overflow-hidden")}>
          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <label htmlFor="story-title" className="sr-only">
              Title
            </label>
            <Input
              id="story-title"
              {...register("title")}
              className={cn(
                headingVariants({ variant: "h1" }),
                "h-auto min-h-12 border-0 bg-transparent px-0 shadow-none placeholder:text-espresso/25 focus-visible:border-transparent focus-visible:ring-0"
              )}
              placeholder="Story title"
              aria-invalid={Boolean(errors.title)}
            />
            {errors.title ? (
              <FieldError className="mt-2">{errors.title.message}</FieldError>
            ) : null}

            <div className="mt-5">
              <StoryCoverField
                previewUrl={featuredPreview}
                isUploading={photo.isUploading}
                onPick={photo.openPicker}
                onRemove={() => {
                  photo.clearPhoto();
                  setValue("featuredImage", "");
                  setValue("featuredImageKey", "");
                }}
              />
            </div>

            <div className="mt-6 border-t border-espresso/10 pt-5">
              <label htmlFor="story-content" className="sr-only">
                Content
              </label>
              <Textarea
                id="story-content"
                {...register("content")}
                className="min-h-88 resize-y border-0 bg-transparent px-0 text-base leading-relaxed shadow-none focus-visible:border-transparent focus-visible:ring-0 sm:min-h-112 md:text-base"
                placeholder="Start writing the story. A memory, a person, a place…"
                aria-invalid={Boolean(errors.content)}
              />
              {errors.content ? (
                <FieldError className="mt-2">{errors.content.message}</FieldError>
              ) : (
                <Text variant="meta" className="mt-3">
                  Plain text for now. Add an excerpt in Details if you want a
                  different summary on cards.
                </Text>
              )}
            </div>
          </div>
        </div>

        <StoryEditorSidebar
          register={register}
          errors={errors}
          slugRegister={slugRegister}
          onSlugChange={(event) => {
            setSlugTouched(true);
            void onSlugChange(event);
          }}
          excerptLength={excerpt?.length ?? 0}
          slug={slug}
          tags={tags ?? ""}
          onTagsChange={(value) => setValue("tags", value, { shouldValidate: true })}
          isBusy={isBusy}
          primaryLabel={primaryLabel}
          onPublish={() => submitWithStatus("publish")}
          onDraft={() => submitWithStatus("draft")}
          onCancel={() => router.back()}
        />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-espresso/12 bg-ivory/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        <StoryEditorActions
          layout="row"
          isBusy={isBusy}
          primaryLabel={primaryLabel}
          onPublish={() => submitWithStatus("publish")}
          onDraft={() => submitWithStatus("draft")}
          onCancel={() => router.back()}
        />
      </div>
    </form>
  );
}
