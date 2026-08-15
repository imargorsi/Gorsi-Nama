"use client";

import { useSignUp } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import type { SignupValues } from "./auth.schemas";

export function useSignup() {
  const { signUp } = useSignUp();

  return useMutation({
    mutationFn: async (values: SignupValues) => {
      const { error } = await signUp.password({
        emailAddress: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      });
      if (error) throw error;

      const { error: codeError } = await signUp.verifications.sendEmailCode();
      if (codeError) throw codeError;
    },
  });
}
