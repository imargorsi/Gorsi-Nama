"use client";

import { useEffect, type ReactNode } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
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

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id}>{label}</Label>
        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </div>
      {children}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}

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
            <Field id="city" label="City" error={errors.city?.message}>
              <Input
                id="city"
                placeholder="Lahore"
                className="h-10"
                aria-invalid={!!errors.city}
                {...register("city")}
              />
            </Field>
            <Field id="profession" label="Profession" error={errors.profession?.message}>
              <Input
                id="profession"
                placeholder="Historian"
                className="h-10"
                aria-invalid={!!errors.profession}
                {...register("profession")}
              />
            </Field>
          </div>

          <Field
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
          </Field>

          <div className="flex flex-col gap-4">
            <div>
              <p className="heritage-eyebrow">Links</p>
              <p className="mt-1.5 text-sm text-muted-foreground">Optional. Leave blank to hide.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="websiteUrl" label="Website" error={errors.websiteUrl?.message}>
                <Input
                  id="websiteUrl"
                  type="url"
                  placeholder="https://"
                  className="h-10"
                  aria-invalid={!!errors.websiteUrl}
                  {...register("websiteUrl")}
                />
              </Field>
              <Field id="facebookUrl" label="Facebook" error={errors.facebookUrl?.message}>
                <Input
                  id="facebookUrl"
                  type="url"
                  placeholder="https://facebook.com/…"
                  className="h-10"
                  aria-invalid={!!errors.facebookUrl}
                  {...register("facebookUrl")}
                />
              </Field>
              <Field id="instagramUrl" label="Instagram" error={errors.instagramUrl?.message}>
                <Input
                  id="instagramUrl"
                  type="url"
                  placeholder="https://instagram.com/…"
                  className="h-10"
                  aria-invalid={!!errors.instagramUrl}
                  {...register("instagramUrl")}
                />
              </Field>
              <Field id="twitterUrl" label="X / Twitter" error={errors.twitterUrl?.message}>
                <Input
                  id="twitterUrl"
                  type="url"
                  placeholder="https://x.com/…"
                  className="h-10"
                  aria-invalid={!!errors.twitterUrl}
                  {...register("twitterUrl")}
                />
              </Field>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="h-11 px-4"
              disabled={saveProfile.isPending}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="h-11 px-4" disabled={saveProfile.isPending}>
              {saveProfile.isPending ? "Saving…" : "Save profile"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
