"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ImageIcon, Link2, X } from "lucide-react";
import { motion } from "motion/react";
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
import { FieldError, nativeSelectClassName } from "@/components/form-field";
import { useUploadPhoto } from "@/components/uploads/use-upload-photo";
import type { CommunityPost } from "@/data/community-posts";
import { surfaceClass } from "@/components/surface";
import { Heading, Text } from "@/components/typography";
import { motionEase } from "@/components/reveal";
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
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        whileHover={{ y: -2, transition: { duration: 0.2, ease: motionEase } }}
        whileTap={{ scale: 0.99 }}
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
        <Text as="span" variant="muted" className="min-w-0">
          Share something with the Gorsi community...
        </Text>
      </motion.button>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: motionEase }}
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
            <Heading as="p" variant="card" className="text-base sm:text-base">
              {displayName}
            </Heading>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={closeComposer}
              aria-label="Close composer"
            >
              <X className="size-4" />
            </Button>
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
          {errors.body ? <FieldError>{errors.body.message}</FieldError> : null}
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
            variant="gold"
            className="shrink-0"
          >
            {isEdit ? "Save" : "Publish"}
          </Button>
        </div>
      </div>
    </motion.form>
  );
}
