"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallbackPage() {
  return (
    <div className="flex min-h-[60svh] items-center justify-center">
      <p className="text-sm text-muted-foreground">Completing sign-in…</p>
      <AuthenticateWithRedirectCallback
        signInFallbackRedirectUrl="/profile"
        signUpFallbackRedirectUrl="/profile"
      />
    </div>
  );
}
