"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import {
  communityPostSchema,
  type CommunityPostValues,
} from "@/components/community/community.schemas";
import { useUploadPhoto } from "@/components/uploads/use-upload-photo";
import type { CommunityPost } from "@/data/community-posts";

function emptyValues(): CommunityPostValues {
  return { body: "", categoryId: "our-stories", linkUrl: "" };
}

function valuesFromPost(post: CommunityPost): CommunityPostValues {
  return {
    body: post.body,
    categoryId: post.categoryId,
    linkUrl: post.linkUrl ?? "",
  };
}

export function useCommunityComposer({
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
  const [open, setOpen] = useState(isEdit);
  const [keptImage, setKeptImage] = useState(post?.images[0]);
  const photo = useUploadPhoto();

  const form = useForm<CommunityPostValues>({
    resolver: zodResolver(communityPostSchema),
    defaultValues: post ? valuesFromPost(post) : emptyValues(),
  });

  const { reset, control } = form;
  const bodyValue = useWatch({ control, name: "body" }) ?? "";
  const linkUrl = useWatch({ control, name: "linkUrl" });
  const displayName = post?.authorName || user?.fullName || "Member";
  const photoPreview = photo.photoPreview || photo.photoUrl || keptImage;
  const isBusy = form.formState.isSubmitting || photo.isUploading;

  useEffect(() => {
    if (!post) return;
    reset(valuesFromPost(post));
    setKeptImage(post.images[0]);
    photo.clearPhoto();
    setOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset from the post being edited
  }, [post?.id, reset]);

  function discardComposer() {
    reset(emptyValues());
    photo.clearPhoto();
    setKeptImage(undefined);
    setOpen(false);
    onCancel?.();
  }

  function requestClose() {
    if (isBusy) return;
    discardComposer();
  }

  function openCreate() {
    reset(emptyValues());
    photo.clearPhoto();
    setKeptImage(undefined);
    setOpen(true);
  }

  function onSubmit(values: CommunityPostValues) {
    if (!isEdit && !user?.id) {
      toast.error("Sign in to publish a post.");
      return;
    }

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
    discardComposer();
    toast.message(
      isEdit
        ? "This post is updated on this device for now. Saving to the community feed is next."
        : "Your post is on this page for now. Saving to the community feed is next."
    );
  }

  return {
    isEdit,
    open,
    displayName,
    imageUrl: isEdit ? undefined : user?.imageUrl,
    bodyValue,
    linkUrl,
    photoPreview,
    isUploading: photo.isUploading,
    isBusy,
    form,
    photo,
    openCreate,
    requestClose,
    onSubmit,
    onRemovePhoto() {
      photo.clearPhoto();
      setKeptImage(undefined);
    },
  };
}
