import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserInfo } from "@/context/user-context";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import { EditProfileDialog } from "@/components/profile/edit-profile-dialog";

export function ProfileView({
  userDetails,
  isOwner,
}: {
  userDetails: UserInfo;
  isOwner: boolean;
}) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row">
      <div className="flex flex-1 flex-col gap-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Avatar size="lg" className="size-24">
            <AvatarImage src={userDetails.profilePhoto || "/default.jpg"} />
            <AvatarFallback>{userDetails.fullName?.[0]}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <h1 className="font-heading text-2xl font-semibold">
              {userDetails.fullName}
            </h1>
            <p className="text-sm text-muted-foreground">{userDetails.email}</p>
            <p className="text-sm text-muted-foreground">
              {userDetails.summary || "No summary available."}
            </p>
            {isOwner && (
              <div className="mt-2">
                <EditProfileDialog userInfo={userDetails} />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-heading text-lg font-semibold">My Gallery</h2>
          <div className="grid grid-cols-2 gap-4 sm:max-w-md">
            {[userDetails.galleryImage1, userDetails.galleryImage2].map(
              (image, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-xl"
                >
                  <Image
                    src={image || "/default.jpg"}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <ProfileSidebar userDetails={userDetails} />
    </div>
  );
}
