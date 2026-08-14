import type { UserInfo } from "@/context/user-context";
import { ProfileCopyLink } from "@/components/profile/profile-copy-link";
import { FacebookIcon, InstagramIcon } from "@/components/icons/brand-icons";

export function ProfileSidebar({ userDetails }: { userDetails: UserInfo }) {
  const infoRows: Array<[string, string | undefined]> = [
    ["City", userDetails.city],
    ["Membership ID#", userDetails.userId],
    ["Profession", userDetails.profession],
    ["Date of Birth", userDetails.dateOfBirth ?? undefined],
    ["Contact", userDetails.contact],
  ];

  return (
    <aside className="flex w-full flex-col gap-6 rounded-xl border p-6 sm:max-w-xs">
      <h2 className="font-heading text-lg font-semibold">About Me</h2>

      <ProfileCopyLink id={userDetails.userId} />

      <dl className="flex flex-col gap-2 text-sm">
        {infoRows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="text-right">{value || "—"}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium">Social Media Profiles</h3>
        <div className="flex items-center gap-4">
          <a
            href={`https://www.facebook.com/${userDetails.facebookUsername || ""}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon className="size-8" />
          </a>
          <a
            href={`https://www.instagram.com/${userDetails.instagramUsername || ""}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon className="size-8" />
          </a>
        </div>
      </div>
    </aside>
  );
}
