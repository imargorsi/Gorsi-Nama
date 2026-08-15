"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/get-error-message";
import { useSignup } from "./use-signup";
import { useVerifyEmail } from "./use-verify-email";
import {
  signupSchema,
  verifyEmailSchema,
  type SignupValues,
  type VerifyEmailValues,
} from "./auth.schemas";

function SignupDetailsForm({ onVerificationSent }: { onVerificationSent: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const signup = useSignup();

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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="First name"
            aria-invalid={!!errors.firstName}
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-sm text-destructive">{errors.firstName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Last name"
            aria-invalid={!!errors.lastName}
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-sm text-destructive">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
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
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="At least 15 characters"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirmPassword">Confirm Your Password</Label>
        <Input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
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

      <Button type="submit" disabled={signup.isPending} className="mt-2">
        {signup.isPending ? "Registering..." : "Register"}
      </Button>
    </form>
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="code">Verification Code</Label>
        <Input
          id="code"
          type="text"
          inputMode="numeric"
          placeholder="Enter the code we emailed you"
          aria-invalid={!!errors.code}
          {...register("code")}
        />
        {errors.code && (
          <p className="text-sm text-destructive">{errors.code.message}</p>
        )}
      </div>

      <Button type="submit" disabled={verifyEmail.isPending} className="mt-2">
        {verifyEmail.isPending ? "Verifying..." : "Verify Email"}
      </Button>
    </form>
  );
}

export function SignupForm() {
  const [pendingVerification, setPendingVerification] = useState(false);

  if (pendingVerification) {
    return <VerifyEmailForm />;
  }

  return (
    <SignupDetailsForm onVerificationSent={() => setPendingVerification(true)} />
  );
}
