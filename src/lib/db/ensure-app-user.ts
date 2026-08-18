import "server-only";

import type { User } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { parseRole } from "@/lib/roles";

function primaryEmail(user: User) {
  return (
    user.primaryEmailAddress?.emailAddress ??
    user.emailAddresses[0]?.emailAddress ??
    ""
  );
}

function roleFromMetadata(user: User) {
  return parseRole(user.publicMetadata.role);
}

/** Upsert the Neon `users` mirror from a Clerk user so profile rows can join. */
export async function ensureAppUser(user: User) {
  const email = primaryEmail(user);
  const role = roleFromMetadata(user);

  await db
    .insert(users)
    .values({
      id: user.id,
      email,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      role,
    })
    .onConflictDoUpdate({
      target: users.id,
      set: {
        email,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        role,
        updatedAt: new Date(),
      },
    });
}
