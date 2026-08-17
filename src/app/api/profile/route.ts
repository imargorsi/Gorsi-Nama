import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { ensureAppUser } from "@/lib/db/ensure-app-user";
import {
  emptyProfileDetails,
  profileDetailsResponseSchema,
  profileDetailsSchema,
  toStoredProfileDetails,
  type ProfileDetails,
} from "@/components/profile/profile.schemas";

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

function toDetails(row: typeof profiles.$inferSelect | undefined): ProfileDetails {
  if (!row) return emptyProfileDetails;
  return profileDetailsResponseSchema.parse({
    city: row.city,
    profession: row.profession,
    summary: row.summary,
    facebookUrl: row.facebookUrl,
    instagramUrl: row.instagramUrl,
    twitterUrl: row.twitterUrl,
    websiteUrl: row.websiteUrl,
  });
}

async function requireUser() {
  const { userId } = await auth();
  if (!userId) return jsonError("Unauthorized", 401);
  const user = await currentUser();
  if (!user) return jsonError("Unauthorized", 401);
  return user;
}

export async function GET() {
  const user = await requireUser();
  if (user instanceof Response) return user;

  try {
    const [row] = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, user.id))
      .limit(1);
    return Response.json(toDetails(row));
  } catch {
    return jsonError("Could not load profile details.", 500);
  }
}

export async function PATCH(request: Request) {
  const user = await requireUser();
  if (user instanceof Response) return user;

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return jsonError("Invalid JSON", 400);
  }

  const parsed = profileDetailsSchema.safeParse(json);
  if (!parsed.success) {
    return jsonError("Validation failed", 400);
  }

  const stored = toStoredProfileDetails(parsed.data);

  try {
    await ensureAppUser(user);
    const [row] = await db
      .insert(profiles)
      .values({
        userId: user.id,
        ...stored,
      })
      .onConflictDoUpdate({
        target: profiles.userId,
        set: {
          ...stored,
          updatedAt: new Date(),
        },
      })
      .returning();

    if (!row) return jsonError("Could not save profile details.", 500);
    return Response.json(toDetails(row));
  } catch {
    return jsonError("Could not save profile details.", 500);
  }
}
