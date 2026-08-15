import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login | Gorsi Nama",
};

export default async function LoginPage({
  params,
}: PageProps<"/[locale]/auth/login">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <AuthShell mode="login">
      <LoginForm />
    </AuthShell>
  );
}
