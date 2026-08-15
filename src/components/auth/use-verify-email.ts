"use client";

import { useSignUp } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import type { VerifyEmailValues } from "./auth.schemas";

export function useVerifyEmail() {
  const { signUp } = useSignUp();

  return useMutation({
    mutationFn: async (values: VerifyEmailValues) => {
      const { error } = await signUp.verifications.verifyEmailCode({
        code: values.code,
      });
      if (error) throw error;

      if (signUp.status !== "complete") {
        throw new Error("That code didn't work — check it and try again.");
      }

      const { error: finalizeError } = await signUp.finalize();
      if (finalizeError) throw finalizeError;
    },
  });
}
