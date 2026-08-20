import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/auth/signup">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Auth" });
  return pageMetadata({
    locale,
    href: "/auth/signup",
    title: t("registerMetaTitle"),
    index: false,
  });
}

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
