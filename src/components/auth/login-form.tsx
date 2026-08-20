"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { ArrowRight, KeyRound, Lock, Mail, ShieldCheck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/form-field";
import { Text } from "@/components/typography";
import { getErrorMessage } from "@/lib/get-error-message";
import { AuthContinueDivider, AuthHeading } from "./auth-shell";
import { IconInput, PasswordInput } from "./auth-fields";
import { GoogleContinueButton } from "./google-continue-button";
import { StepTransition } from "./step-transition";
import { useLogin, useGoogleSignIn } from "./use-login";
import { useForgotPassword } from "./use-forgot-password";
import { useResetPassword } from "./use-reset-password";
import {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  type LoginValues,
  type ForgotPasswordValues,
  type ResetPasswordValues,
} from "./auth.schemas";

function LoginStep({ onForgotPassword }: { onForgotPassword: () => void }) {
  const t = useTranslations("Auth");
  const router = useRouter();
  const login = useLogin();
  const googleSignIn = useGoogleSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (values: LoginValues) => {
    login.mutate(values, {
      onSuccess: () => {
        toast.success(t("loginSuccess"));
        router.push("/profile");
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, t("genericError")));
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <AuthHeading
        title={t("loginTitle")}
        description={t("loginDescription")}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
            autoComplete="current-password"
            placeholder={t("passwordPlaceholder")}
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
          <button
            type="button"
            onClick={onForgotPassword}
            className="self-end text-sm font-medium text-gold hover:underline"
          >
            {t("forgotPassword")}
          </button>
        </div>

        {/* Session persistence is managed by Clerk itself; this control is visual only. */}
        <label className="flex items-center gap-2">
          <Checkbox />
          <Text as="span" variant="small">
            {t("rememberMe")}
          </Text>
        </label>

        <Button
          type="submit"
          variant="gold"
          disabled={login.isPending}
          className="mt-2"
        >
          {login.isPending ? t("loggingIn") : t("login")}
          <ArrowRight className="size-4" />
        </Button>
      </form>

      <AuthContinueDivider />

      <GoogleContinueButton
        onClick={() => googleSignIn.mutate()}
        isPending={googleSignIn.isPending}
      />

      <div className="flex items-start gap-2">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-gold" />
        <Text variant="meta">
          {t("privacy1")}
          <br />
          {t("privacy2")}
        </Text>
      </div>
    </div>
  );
}

function ForgotPasswordStep({
  onCodeSent,
  onBack,
}: {
  onCodeSent: () => void;
  onBack: () => void;
}) {
  const t = useTranslations("Auth");
  const forgotPassword = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = (values: ForgotPasswordValues) => {
    forgotPassword.mutate(values, {
      onSuccess: () => {
        toast.success(t("codeSent"));
        onCodeSent();
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, t("genericError")));
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <AuthHeading
        title={t("forgotTitle")}
        description={t("forgotDescription")}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="forgot-email">{t("email")}</Label>
          <IconInput
            id="forgot-email"
            type="email"
            icon={Mail}
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </div>

        <Button
          type="submit"
          variant="gold"
          disabled={forgotPassword.isPending}
          className="mt-2"
        >
          {forgotPassword.isPending ? t("sendingCode") : t("sendResetCode")}
        </Button>
      </form>

      <button
        type="button"
        onClick={onBack}
        className="self-start text-sm font-medium text-gold hover:underline"
      >
        {t("backToLogin")}
      </button>
    </div>
  );
}

function ResetPasswordStep({
  onComplete,
  onBack,
}: {
  onComplete: () => void;
  onBack: () => void;
}) {
  const t = useTranslations("Auth");
  const router = useRouter();
  const resetPassword = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({ resolver: zodResolver(resetPasswordSchema) });

  const onSubmit = (values: ResetPasswordValues) => {
    resetPassword.mutate(values, {
      onSuccess: () => {
        toast.success(t("resetSuccess"));
        onComplete();
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
        title={t("resetTitle")}
        description={t("resetDescription")}
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

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="new-password">{t("newPassword")}</Label>
          <PasswordInput
            id="new-password"
            icon={Lock}
            autoComplete="new-password"
            placeholder={t("newPasswordPlaceholder")}
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirm-new-password">{t("confirmNewPassword")}</Label>
          <PasswordInput
            id="confirm-new-password"
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

        <Button
          type="submit"
          variant="gold"
          disabled={resetPassword.isPending}
          className="mt-2"
        >
          {resetPassword.isPending ? t("resetting") : t("resetPassword")}
        </Button>
      </form>

      <button
        type="button"
        onClick={onBack}
        className="self-start text-sm font-medium text-gold hover:underline"
      >
        {t("backToLogin")}
      </button>
    </div>
  );
}

export function LoginForm() {
  const [step, setStep] = useState<"login" | "forgot-password" | "reset-password">(
    "login"
  );

  return (
    <StepTransition stepKey={step}>
      {step === "forgot-password" ? (
        <ForgotPasswordStep
          onCodeSent={() => setStep("reset-password")}
          onBack={() => setStep("login")}
        />
      ) : step === "reset-password" ? (
        <ResetPasswordStep
          onComplete={() => setStep("login")}
          onBack={() => setStep("login")}
        />
      ) : (
        <LoginStep onForgotPassword={() => setStep("forgot-password")} />
      )}
    </StepTransition>
  );
}
