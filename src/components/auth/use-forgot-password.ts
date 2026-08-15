"use client";

import { useSignIn } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import type { ForgotPasswordValues } from "./auth.schemas";

export function useForgotPassword() {
  const { signIn } = useSignIn();

  return useMutation({
    mutationFn: async (values: ForgotPasswordValues) => {
      const { error } = await signIn.create({ identifier: values.email });
      if (error) throw error;

      const { error: sendError } = await signIn.resetPasswordEmailCode.sendCode();
      if (sendError) throw sendError;
    },
  });
}
