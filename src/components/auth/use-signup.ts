"use client";

import { useSignUp } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { googleSsoRedirects } from "@/lib/auth-redirect";
import type { SignupValues } from "./auth.schemas";

export function useSignup() {
  const { signUp } = useSignUp();

  return useMutation({
    mutationFn: async (values: SignupValues) => {
      const [firstName, ...rest] = values.fullName.trim().split(/\s+/);
      const lastName = rest.join(" ") || undefined;

      const { error } = await signUp.password({
        emailAddress: values.email,
        password: values.password,
        firstName,
        lastName,
      });
      if (error) throw error;

      const { error: codeError } = await signUp.verifications.sendEmailCode();
      if (codeError) throw codeError;
    },
  });
}

export function useGoogleSignUp() {
  const { signUp } = useSignUp();
  const locale = useLocale();

  return useMutation({
    mutationFn: async () => {
      const { error } = await signUp.sso({
        strategy: "oauth_google",
        ...googleSsoRedirects(locale),
      });
      if (error) throw error;
    },
  });
}
