"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ImageIcon, Link2, X } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CommunityAvatar } from "@/components/community/community-avatar";
import { ComposerIcon } from "@/components/community/community-composer-toolbar";
import {
  ComposerLinkField,
  ComposerPhotoPreview,
} from "@/components/community/community-composer-fields";
import { communityCategories } from "@/components/community/community-categories";
import {
  communityPostSchema,
  type CommunityPostValues,
} from "@/components/community/community.schemas";
import { nativeSelectClassName } from "@/components/form-field";
import { useUploadPhoto } from "@/components/uploads/use-upload-photo";
import type { CommunityPost } from "@/data/community-posts";
import { surfaceClass } from "@/components/surface";
import { maxImageUploadMb } from "@/lib/storage/upload.schemas";
import { cn } from "@/lib/utils";

export function CommunityComposer({
  post,
  onSave,
  onCancel,
}: {
  post?: CommunityPost;
  onSave: (post: CommunityPost) => void;
  onCancel?: () => void;
}) {
  const { user } = useUser();
  const isEdit = Boolean(post);
  const [isOpen, setIsOpen] = useState(isEdit);
  const [isLinkOpen, setIsLinkOpen] = useState(Boolean(post?.linkUrl));
  const [keptImage, setKeptImage] = useState(post?.images[0]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const photo = useUploadPhoto();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CommunityPostValues>({
    resolver: zodResolver(communityPostSchema),
    defaultValues: {
      body: post?.body ?? "",
      categoryId: post?.categoryId ?? "our-stories",
      linkUrl: post?.linkUrl ?? "",
    },
  });

  const bodyRegister = register("body");
  const linkUrl = watch("linkUrl");
  const displayName = post?.authorName || user?.fullName || "Member";
  const photoPreview = photo.photoPreview || photo.photoUrl || keptImage;
  const isBusy = isSubmitting || photo.isUploading;

  useEffect(() => {
    if (isOpen) textareaRef.current?.focus();
  }, [isOpen]);

  function closeComposer() {
    reset();
    photo.clearPhoto();
    setKeptImage(undefined);
    setIsLinkOpen(false);
    setIsOpen(false);
    onCancel?.();
  }

  function onSubmit(values: CommunityPostValues) {
    if (!isEdit && !user?.id) return;

    onSave({
      id: post?.id ?? `draft-${Date.now()}`,
      authorId: post ? post.authorId : user?.id,
      authorName: post ? post.authorName : displayName,
      createdAt: post?.createdAt ?? new Date().toISOString(),
      categoryId: values.categoryId,
      body: values.body,
      tags: post?.tags ?? [],
      images: photo.photoUrl ? [photo.photoUrl] : keptImage ? [keptImage] : [],
      likeCount: post?.likeCount ?? 0,
      saveCount: post?.saveCount ?? 0,
      linkUrl: values.linkUrl || undefined,
    });
    closeComposer();
    toast.message(
      isEdit
        ? "This post is updated on this device for now. Saving to the community feed is next."
        : "Your post is on this page for now. Saving to the community feed is next."
    );
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          surfaceClass,
          "flex min-h-14 w-full items-center gap-3 px-4 py-3 text-start sm:px-5"
        )}
      >
        <CommunityAvatar
          name={displayName}
          imageUrl={user?.imageUrl}
          size="lg"
        />
        <span className="min-w-0 text-sm text-warm-gray sm:text-base">
          Share something with the Gorsi community...
        </span>
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(surfaceClass, "p-3.5 sm:p-4")}
    >
      <div className="flex items-start gap-3">
        <CommunityAvatar
          name={displayName}
          imageUrl={isEdit ? undefined : user?.imageUrl}
          size="lg"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="font-heading text-base font-semibold text-espresso">
              {displayName}
            </p>
            <button
              type="button"
              onClick={closeComposer}
              aria-label="Close composer"
              className="inline-flex size-11 items-center justify-center rounded-lg text-warm-gray transition-colors hover:bg-espresso/5 hover:text-espresso"
            >
              <X className="size-4" />
            </button>
          </div>
          <Label htmlFor="community-body" className="sr-only">
            Your post
          </Label>
          <Textarea
            {...bodyRegister}
            id="community-body"
            ref={(element) => {
              bodyRegister.ref(element);
              textareaRef.current = element;
            }}
            rows={3}
            placeholder="Write your story, memory, thought or question."
            className="mt-1 min-h-20 resize-none border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            aria-invalid={Boolean(errors.body)}
          />
          {errors.body ? (
            <p className="text-sm text-destructive">{errors.body.message}</p>
          ) : null}
          {photoPreview ? (
            <ComposerPhotoPreview
              previewUrl={photoPreview}
              isUploading={photo.isUploading}
              onRemove={() => {
                photo.clearPhoto();
                setKeptImage(undefined);
              }}
            />
          ) : null}
          {isLinkOpen || linkUrl ? (
            <ComposerLinkField
              register={register}
              setValue={setValue}
              linkUrl={linkUrl}
              errorMessage={errors.linkUrl?.message}
              onClose={() => setIsLinkOpen(false)}
            />
          ) : null}
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-3 border-t border-espresso/10 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center">
          <ComposerIcon
            label="Photo"
            isDisabled={photo.isUploading}
            isActive={Boolean(photoPreview)}
            onClick={photo.openPicker}
          >
            <ImageIcon className="size-4" />
          </ComposerIcon>
          <ComposerIcon
            label="Link"
            isActive={isLinkOpen || Boolean(linkUrl)}
            onClick={() => {
              setIsLinkOpen(true);
              requestAnimationFrame(() =>
                document.getElementById("community-link")?.focus()
              );
            }}
          >
            <Link2 className="size-4" />
          </ComposerIcon>
          <input
            {...photo.fileInputProps}
            aria-describedby="community-photo-hint"
          />
          <span id="community-photo-hint" className="sr-only">
            JPEG, PNG, WebP, or GIF. Max {maxImageUploadMb} MB.
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <Label htmlFor="community-category" className="sr-only">
            Category
          </Label>
          <select
            id="community-category"
            {...register("categoryId")}
            className={cn(
              nativeSelectClassName,
              "min-w-0 flex-1 font-medium text-espresso sm:flex-none"
            )}
          >
            {communityCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
          <Button
            type="submit"
            disabled={isBusy}
            className="h-11 shrink-0 bg-gold px-5 text-espresso hover:bg-gold/90"
          >
            {isEdit ? "Save" : "Publish"}
          </Button>
        </div>
      </div>
    </form>
  );
}
