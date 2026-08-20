import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/auth/login">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Auth" });
  return pageMetadata({
    locale,
    href: "/auth/login",
    title: t("loginMetaTitle"),
    index: false,
  });
}

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
