"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";
import { ArrowRight, KeyRound, Lock, Mail, User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/get-error-message";
import { AuthHeading } from "./auth-shell";
import { IconInput, PasswordInput } from "./auth-fields";
import { GoogleContinueButton } from "./google-continue-button";
import { StepTransition } from "./step-transition";
import { useSignup, useGoogleSignUp } from "./use-signup";
import { useVerifyEmail } from "./use-verify-email";
import {
  signupSchema,
  verifyEmailSchema,
  type SignupValues,
  type VerifyEmailValues,
} from "./auth.schemas";

function SignupDetailsForm({ onVerificationSent }: { onVerificationSent: () => void }) {
  const signup = useSignup();
  const googleSignUp = useGoogleSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValues>({ resolver: zodResolver(signupSchema) });

  const onSubmit = (values: SignupValues) => {
    signup.mutate(values, {
      onSuccess: () => {
        toast.success("Check your email for a verification code.");
        onVerificationSent();
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, "Something went wrong, try again."));
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <AuthHeading
        title="Create Account"
        description="Join Gorsi Nama and start your journey with us"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fullName">Full Name</Label>
          <IconInput
            id="fullName"
            type="text"
            icon={User}
            autoComplete="name"
            placeholder="Enter your full name"
            aria-invalid={!!errors.fullName}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-sm text-destructive">{errors.fullName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <IconInput
            id="email"
            type="email"
            icon={Mail}
            autoComplete="email"
            placeholder="Enter your email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            icon={Lock}
            autoComplete="new-password"
            placeholder="Enter a password"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirmPassword">Confirm Your Password</Label>
          <PasswordInput
            id="confirmPassword"
            icon={Lock}
            autoComplete="new-password"
            placeholder="Enter your password again"
            aria-invalid={!!errors.confirmPassword}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Clerk's bot-protection widget mounts into this element during signUp.create(). */}
        <div id="clerk-captcha" />

        <Button
          type="submit"
          disabled={signup.isPending}
          className="mt-2 h-11 bg-gold text-espresso hover:bg-gold/90"
        >
          {signup.isPending ? "Registering..." : "Register"}
          <ArrowRight className="size-4" />
        </Button>
      </form>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or continue with</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <GoogleContinueButton
        onClick={() => googleSignUp.mutate()}
        isPending={googleSignUp.isPending}
      />
    </div>
  );
}

function VerifyEmailForm() {
  const router = useRouter();
  const verifyEmail = useVerifyEmail();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailValues>({ resolver: zodResolver(verifyEmailSchema) });

  const onSubmit = (values: VerifyEmailValues) => {
    verifyEmail.mutate(values, {
      onSuccess: () => {
        toast.success("Account created.");
        router.push("/profile");
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, "Invalid code, try again."));
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <AuthHeading
        title="Verify Your Email"
        description="Enter the 6-digit code we sent to your email address"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="code">Verification Code</Label>
          <IconInput
            id="code"
            type="text"
            inputMode="numeric"
            icon={KeyRound}
            autoComplete="one-time-code"
            placeholder="Enter the code we emailed you"
            aria-invalid={!!errors.code}
            {...register("code")}
          />
          {errors.code && (
            <p className="text-sm text-destructive">{errors.code.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={verifyEmail.isPending}
          className="mt-2 h-11 bg-gold text-espresso hover:bg-gold/90"
        >
          {verifyEmail.isPending ? "Verifying..." : "Verify Email"}
        </Button>
      </form>
    </div>
  );
}

export function SignupForm() {
  const [pendingVerification, setPendingVerification] = useState(false);

  return (
    <StepTransition stepKey={pendingVerification ? "verify" : "details"}>
      {pendingVerification ? (
        <VerifyEmailForm />
      ) : (
        <SignupDetailsForm onVerificationSent={() => setPendingVerification(true)} />
      )}
    </StepTransition>
  );
}
