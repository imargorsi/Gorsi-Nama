"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useUserInfo, type UserInfo } from "@/context/user-context";
import { getErrorMessage } from "@/lib/get-error-message";
import { FacebookIcon, InstagramIcon } from "@/components/icons/brand-icons";
import { ProfileImageUpload } from "@/components/profile/profile-image-upload";
import { useEditProfile } from "@/components/profile/use-edit-profile";
import {
  editProfileSchema,
  type EditProfileValues,
} from "@/components/profile/profile.schemas";

export function EditProfileForm({
  userInfo,
  onSuccess,
}: {
  userInfo: UserInfo;
  onSuccess: () => void;
}) {
  const { setUserInfo } = useUserInfo();
  const editProfile = useEditProfile();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditProfileValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fullName: userInfo.fullName || "",
      city: userInfo.city || "",
      profession: userInfo.profession || "",
      dateOfBirth: userInfo.dateOfBirth || "",
      contact: userInfo.contact || "",
      summary: userInfo.summary || "",
      facebookUsername: userInfo.facebookUsername || "",
      instagramUsername: userInfo.instagramUsername || "",
      profilePhoto: userInfo.profilePhoto || null,
      galleryImage1: userInfo.galleryImage1 || null,
      galleryImage2: userInfo.galleryImage2 || null,
    },
  });

  const onSubmit = (values: EditProfileValues) => {
    editProfile.mutate(
      { ...values, userId: userInfo.userId },
      {
        onSuccess: (data) => {
          if (data.message === "User edited successfully") {
            toast.success("Profile updated successfully.");
            setUserInfo(data.data);
            onSuccess();
          } else {
            toast.error("Something went wrong, try again.");
          }
        },
        onError: (error) => {
          toast.error(getErrorMessage(error, "Something went wrong, try again."));
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Controller
          control={control}
          name="profilePhoto"
          render={({ field }) => (
            <ProfileImageUpload value={field.value} onChange={field.onChange} />
          )}
        />
        <Controller
          control={control}
          name="galleryImage1"
          render={({ field }) => (
            <ProfileImageUpload value={field.value} onChange={field.onChange} />
          )}
        />
        <Controller
          control={control}
          name="galleryImage2"
          render={({ field }) => (
            <ProfileImageUpload value={field.value} onChange={field.onChange} />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <FacebookIcon className="size-5 shrink-0" />
          <span className="text-sm text-muted-foreground">facebook.com/</span>
          <Input placeholder="username" {...register("facebookUsername")} />
        </div>
        <div className="flex items-center gap-2">
          <InstagramIcon className="size-5 shrink-0" />
          <span className="text-sm text-muted-foreground">instagram.com/</span>
          <Input placeholder="username" {...register("instagramUsername")} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="fullName">Your Full Name *</Label>
        <Input id="fullName" {...register("fullName")} />
        {errors.fullName && (
          <p className="text-sm text-destructive">{errors.fullName.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="city">Your City (optional)</Label>
        <Input id="city" {...register("city")} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="profession">Your Profession (optional)</Label>
        <Input id="profession" {...register("profession")} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="dateOfBirth">Date of Birth (optional)</Label>
        <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact">Contact/Phone Number (optional)</Label>
        <Input id="contact" {...register("contact")} />
        {errors.contact && (
          <p className="text-sm text-destructive">{errors.contact.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="summary">Summary (optional)</Label>
        <Textarea
          id="summary"
          placeholder="Write something about yourself (max 50 words)"
          {...register("summary")}
        />
        {errors.summary && (
          <p className="text-sm text-destructive">{errors.summary.message}</p>
        )}
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onSuccess}
        >
          Close
        </Button>
        <Button type="submit" disabled={editProfile.isPending}>
          {editProfile.isPending ? "Saving..." : "Save"}
        </Button>
      </DialogFooter>
    </form>
  );
}
