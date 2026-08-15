import type { Metadata } from "next";
import { OwnProfileClient } from "@/components/profile/own-profile-client";

export const metadata: Metadata = {
  title: "My Profile | Gorsi Nama",
};

export default function ProfilePage() {
  return <OwnProfileClient />;
}
