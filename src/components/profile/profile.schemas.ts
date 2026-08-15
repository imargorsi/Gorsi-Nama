// Own-profile identity, sourced entirely from Clerk (see own-profile-client.tsx).
// Editing happens through Clerk's own account UI (useClerk().openUserProfile()),
// not a custom form — see doc/auth-and-roles.md.
export interface UserInfo {
  userId: string;
  fullName: string;
  email: string;
  profilePhoto?: string | null;
}
