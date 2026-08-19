"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FormField } from "@/components/form-field";
import { Text } from "@/components/typography";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getErrorMessage } from "@/lib/get-error-message";
import { useSaveOwnProfile } from "@/components/profile/use-profile";
import {
  profileDetailsSchema,
  toProfileFormValues,
  type ProfileDetails,
  type ProfileDetailsValues,
} from "@/components/profile/profile.schemas";

export function ProfileEditDialog({
  details,
  open,
  onOpenChange,
}: {
  details: ProfileDetails;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const saveProfile = useSaveOwnProfile();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProfileDetailsValues>({
    resolver: zodResolver(profileDetailsSchema),
    defaultValues: toProfileFormValues(details),
  });

  useEffect(() => {
    if (open) reset(toProfileFormValues(details));
  }, [open, details, reset]);

  const summaryValue = useWatch({ control, name: "summary" });
  const summaryLength = summaryValue?.length ?? 0;

  const onSubmit = (values: ProfileDetailsValues) => {
    saveProfile.mutate(values, {
      onSuccess: () => {
        toast.success("Profile updated.");
        onOpenChange(false);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, "Could not save your profile."));
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (saveProfile.isPending) return;
        onOpenChange(next);
      }}
    >
      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-xl" showCloseButton>
        <DialogHeader>
          <p className="heritage-eyebrow">Your details</p>
          <DialogTitle className="mt-2 text-xl">Edit profile</DialogTitle>
          <DialogDescription>
            These details appear on your Gorsi Nama profile. Name, email, and photo are
            managed in your account.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField id="city" label="City" error={errors.city?.message}>
              <Input
                id="city"
                placeholder="Lahore"
                aria-invalid={!!errors.city}
                {...register("city")}
              />
            </FormField>
            <FormField id="profession" label="Profession" error={errors.profession?.message}>
              <Input
                id="profession"
                placeholder="Historian"
                aria-invalid={!!errors.profession}
                {...register("profession")}
              />
            </FormField>
          </div>

          <FormField
            id="summary"
            label="Summary"
            hint={`${summaryLength}/500`}
            error={errors.summary?.message}
          >
            <Textarea
              id="summary"
              rows={4}
              placeholder="A short introduction for other members of the clan."
              aria-invalid={!!errors.summary}
              {...register("summary")}
            />
          </FormField>

          <div className="flex flex-col gap-4">
            <div>
              <p className="heritage-eyebrow">Links</p>
              <Text variant="small" className="mt-1.5">
                Optional. Leave blank to hide.
              </Text>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField id="websiteUrl" label="Website" error={errors.websiteUrl?.message}>
                <Input
                  id="websiteUrl"
                  type="url"
                  placeholder="https://"
                  aria-invalid={!!errors.websiteUrl}
                  {...register("websiteUrl")}
                />
              </FormField>
              <FormField id="facebookUrl" label="Facebook" error={errors.facebookUrl?.message}>
                <Input
                  id="facebookUrl"
                  type="url"
                  placeholder="https://facebook.com/…"
                  aria-invalid={!!errors.facebookUrl}
                  {...register("facebookUrl")}
                />
              </FormField>
              <FormField id="instagramUrl" label="Instagram" error={errors.instagramUrl?.message}>
                <Input
                  id="instagramUrl"
                  type="url"
                  placeholder="https://instagram.com/…"
                  aria-invalid={!!errors.instagramUrl}
                  {...register("instagramUrl")}
                />
              </FormField>
              <FormField id="twitterUrl" label="X / Twitter" error={errors.twitterUrl?.message}>
                <Input
                  id="twitterUrl"
                  type="url"
                  placeholder="https://x.com/…"
                  aria-invalid={!!errors.twitterUrl}
                  {...register("twitterUrl")}
                />
              </FormField>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={saveProfile.isPending}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saveProfile.isPending}>
              {saveProfile.isPending ? "Saving…" : "Save profile"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
