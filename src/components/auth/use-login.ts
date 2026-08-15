"use client";

import { useSignIn } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import type { LoginValues } from "./auth.schemas";

export function useLogin() {
  const { signIn } = useSignIn();

  return useMutation({
    mutationFn: async (values: LoginValues) => {
      const { error } = await signIn.password({
        identifier: values.email,
        password: values.password,
      });
      if (error) throw error;

      if (signIn.status !== "complete") {
        throw new Error("Additional verification is required to sign in.");
      }

      const { error: finalizeError } = await signIn.finalize();
      if (finalizeError) throw finalizeError;
    },
  });
}
