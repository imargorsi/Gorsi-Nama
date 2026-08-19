import "server-only";

import { auth, currentUser, type User } from "@clerk/nextjs/server";
import { HttpError } from "@/lib/http";

export async function getCurrentUser(): Promise<User | null> {
  const { userId } = await auth();
  if (!userId) return null;
  return (await currentUser()) ?? null;
}

export async function requireCurrentUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) throw new HttpError(401, "Unauthorized");
  return user;
}
