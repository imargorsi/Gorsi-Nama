"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { ArrowRight, KeyRound, Lock, Mail, User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/form-field";
import { getErrorMessage } from "@/lib/get-error-message";
import { AuthContinueDivider, AuthHeading } from "./auth-shell";
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
  const t = useTranslations("Auth");
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
        toast.success(t("verificationSent"));
        onVerificationSent();
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, t("genericError")));
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <AuthHeading
        title={t("signupTitle")}
        description={t("signupDescription")}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fullName">{t("fullName")}</Label>
          <IconInput
            id="fullName"
            type="text"
            icon={User}
            autoComplete="name"
            placeholder={t("fullNamePlaceholder")}
            aria-invalid={!!errors.fullName}
            {...register("fullName")}
          />
          {errors.fullName && (
            <FieldError>{errors.fullName.message}</FieldError>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">{t("email")}</Label>
          <IconInput
            id="email"
            type="email"
            icon={Mail}
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">{t("password")}</Label>
          <PasswordInput
            id="password"
            icon={Lock}
            autoComplete="new-password"
            placeholder={t("signupPasswordPlaceholder")}
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
          <PasswordInput
            id="confirmPassword"
            icon={Lock}
            autoComplete="new-password"
            placeholder={t("confirmPasswordPlaceholder")}
            aria-invalid={!!errors.confirmPassword}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <FieldError>{errors.confirmPassword.message}</FieldError>
          )}
        </div>

        {/* Clerk's bot-protection widget mounts into this element during signUp.create(). */}
        <div id="clerk-captcha" />

        <Button
          type="submit"
          variant="gold"
          disabled={signup.isPending}
          className="mt-2"
        >
          {signup.isPending ? t("registering") : t("register")}
          <ArrowRight className="size-4" />
        </Button>
      </form>

      <AuthContinueDivider />

      <GoogleContinueButton
        onClick={() => googleSignUp.mutate()}
        isPending={googleSignUp.isPending}
      />
    </div>
  );
}

function VerifyEmailForm() {
  const t = useTranslations("Auth");
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
        toast.success(t("accountCreated"));
        router.push("/profile");
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, t("invalidCode")));
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <AuthHeading
        title={t("verifyTitle")}
        description={t("verifyDescription")}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="code">{t("codeLabel")}</Label>
          <IconInput
            id="code"
            type="text"
            inputMode="numeric"
            icon={KeyRound}
            autoComplete="one-time-code"
            placeholder={t("codePlaceholder")}
            aria-invalid={!!errors.code}
            {...register("code")}
          />
          {errors.code && <FieldError>{errors.code.message}</FieldError>}
        </div>

        <Button
          type="submit"
          variant="gold"
          disabled={verifyEmail.isPending}
          className="mt-2"
        >
          {verifyEmail.isPending ? t("verifying") : t("verifyEmail")}
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
