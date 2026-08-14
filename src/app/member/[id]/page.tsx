import { MemberProfileClient } from "@/components/profile/member-profile-client";

export default async function MemberProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <MemberProfileClient id={id} />;
}
