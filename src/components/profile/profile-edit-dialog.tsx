"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("Profile");
  const common = useTranslations("Common");
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
        toast.success(t("updated"));
        onOpenChange(false);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, t("saveError")));
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
      <DialogContent
        className="flex max-h-dvh flex-col gap-0 overflow-hidden p-0 sm:max-h-[90svh] sm:max-w-xl"
        showCloseButton
      >
        <DialogHeader className="shrink-0 border-b border-espresso/10 px-5 pt-5 pe-14 pb-4 sm:px-6 sm:pt-6">
          <p className="heritage-eyebrow">{t("editEyebrow")}</p>
          <DialogTitle className="mt-2 text-xl">{t("editTitle")}</DialogTitle>
          <DialogDescription>
            {t("editDescription")}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-5 py-5 sm:px-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField id="city" label={t("city")} error={errors.city?.message}>
                <Input
                  id="city"
                  placeholder={t("cityPlaceholder")}
                  aria-invalid={!!errors.city}
                  {...register("city")}
                />
              </FormField>
              <FormField id="profession" label={t("profession")} error={errors.profession?.message}>
                <Input
                  id="profession"
                  placeholder={t("professionPlaceholder")}
                  aria-invalid={!!errors.profession}
                  {...register("profession")}
                />
              </FormField>
            </div>

            <FormField
              id="summary"
              label={t("summary")}
              hint={`${summaryLength}/500`}
              error={errors.summary?.message}
            >
              <Textarea
                id="summary"
                rows={4}
                placeholder={t("summaryPlaceholder")}
                aria-invalid={!!errors.summary}
                {...register("summary")}
              />
            </FormField>

            <div className="flex flex-col gap-4">
              <div>
                <p className="heritage-eyebrow">{t("links")}</p>
                <Text variant="small" className="mt-1.5">
                  {t("linksHint")}
                </Text>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField id="websiteUrl" label={t("website")} error={errors.websiteUrl?.message}>
                  <Input
                    id="websiteUrl"
                    type="url"
                    placeholder="https://"
                    aria-invalid={!!errors.websiteUrl}
                    {...register("websiteUrl")}
                  />
                </FormField>
                <FormField id="facebookUrl" label={t("facebook")} error={errors.facebookUrl?.message}>
                  <Input
                    id="facebookUrl"
                    type="url"
                    placeholder="https://facebook.com/…"
                    aria-invalid={!!errors.facebookUrl}
                    {...register("facebookUrl")}
                  />
                </FormField>
                <FormField id="instagramUrl" label={t("instagram")} error={errors.instagramUrl?.message}>
                  <Input
                    id="instagramUrl"
                    type="url"
                    placeholder="https://instagram.com/…"
                    aria-invalid={!!errors.instagramUrl}
                    {...register("instagramUrl")}
                  />
                </FormField>
                <FormField id="twitterUrl" label={t("twitter")} error={errors.twitterUrl?.message}>
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
          </div>

          <DialogFooter className="mx-0 mb-0 shrink-0 rounded-none border-espresso/10 bg-ivory pb-[max(1rem,env(safe-area-inset-bottom))] sm:rounded-b-xl">
            <Button
              type="button"
              variant="outline"
              disabled={saveProfile.isPending}
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
            >
              {common("cancel")}
            </Button>
            <Button
              type="submit"
              disabled={saveProfile.isPending}
              className="w-full sm:w-auto"
            >
              {saveProfile.isPending ? t("saving") : t("saveProfile")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
