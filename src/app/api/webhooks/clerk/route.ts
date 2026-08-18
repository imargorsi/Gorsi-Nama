import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { parseRole } from "@/lib/roles";
import { eq } from "drizzle-orm";

// Keeps our `users` table in sync with Clerk so the rest of the app (and
// future feature tables) can join on a stable id without calling Clerk on
// every request. Clerk stays the source of truth for identity — this is a
// mirror, not a second copy of auth. See doc/data-and-backend.md.
export async function POST(request: Request) {
  const signingSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
  if (!signingSecret) {
    return new Response("Webhook signing secret is not configured", {
      status: 500,
    });
  }

  const svixId = request.headers.get("svix-id");
  const svixTimestamp = request.headers.get("svix-timestamp");
  const svixSignature = request.headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const body = await request.text();

  let event: WebhookEvent;
  try {
    event = new Webhook(signingSecret).verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch {
    return new Response("Invalid webhook signature", { status: 400 });
  }

  switch (event.type) {
    case "user.created":
    case "user.updated": {
      const { id, email_addresses, primary_email_address_id, first_name, last_name, image_url, public_metadata } =
        event.data;
      const primaryEmail =
        email_addresses.find((e) => e.id === primary_email_address_id)?.email_address ??
        email_addresses[0]?.email_address ??
        "";
      const role = parseRole(public_metadata.role);

      await db
        .insert(users)
        .values({
          id,
          email: primaryEmail,
          firstName: first_name,
          lastName: last_name,
          imageUrl: image_url,
          role,
        })
        .onConflictDoUpdate({
          target: users.id,
          set: {
            email: primaryEmail,
            firstName: first_name,
            lastName: last_name,
            imageUrl: image_url,
            role,
            updatedAt: new Date(),
          },
        });
      break;
    }
    case "user.deleted": {
      if (event.data.id) {
        await db.delete(users).where(eq(users.id, event.data.id));
      }
      break;
    }
  }

  return new Response("OK", { status: 200 });
}
