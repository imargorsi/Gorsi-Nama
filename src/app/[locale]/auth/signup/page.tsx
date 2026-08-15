import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Register | Gorsi Nama",
};

export default async function SignupPage({
  params,
}: PageProps<"/[locale]/auth/signup">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <AuthShell mode="signup">
      <SignupForm />
    </AuthShell>
  );
}
