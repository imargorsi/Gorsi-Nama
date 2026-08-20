import "server-only";

import { after } from "next/server";
import { clerkClient, type UserJSON } from "@clerk/nextjs/server";
import { notifyWelcome } from "@/lib/email/notify";

const welcomeSentKey = "welcomeEmailedAt";

function primaryEmail(user: UserJSON) {
  return (
    user.email_addresses.find((entry) => entry.id === user.primary_email_address_id) ??
    user.email_addresses[0]
  );
}

function isVerified(user: UserJSON) {
  return primaryEmail(user)?.verification?.status === "verified";
}

function alreadyWelcomed(user: UserJSON) {
  const metadata = user.private_metadata as Record<string, unknown> | undefined;
  return typeof metadata?.[welcomeSentKey] === "string";
}

async function markWelcomed(userId: string) {
  const clerk = await clerkClient();
  await clerk.users.updateUserMetadata(userId, {
    privateMetadata: { [welcomeSentKey]: new Date().toISOString() },
  });
}

async function sendWelcomeIfEligible(user: UserJSON) {
  if (alreadyWelcomed(user) || !isVerified(user)) return;

  const to = primaryEmail(user)?.email_address ?? "";
  const sent = await notifyWelcome({ to, firstName: user.first_name });
  if (!sent) return;

  try {
    await markWelcomed(user.id);
  } catch (error) {
    console.error("Could not record welcome email", error);
  }
}

/** Return the webhook quickly; send after the response so Clerk does not retry. */
export function scheduleWelcomeEmail(user: UserJSON) {
  after(() => sendWelcomeIfEligible(user));
}
