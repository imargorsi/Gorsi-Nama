"use client";

import { useSignIn } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import type { ResetPasswordValues } from "./auth.schemas";

export function useResetPassword() {
  const { signIn } = useSignIn();

  return useMutation({
    mutationFn: async (values: ResetPasswordValues) => {
      const { error: verifyError } = await signIn.resetPasswordEmailCode.verifyCode({
        code: values.code,
      });
      if (verifyError) throw verifyError;

      const { error: submitError } = await signIn.resetPasswordEmailCode.submitPassword({
        password: values.password,
      });
      if (submitError) throw submitError;

      if (signIn.status !== "complete") {
        throw new Error("Additional verification is required to sign in.");
      }

      const { error: finalizeError } = await signIn.finalize();
      if (finalizeError) throw finalizeError;
    },
  });
}
