import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";

export default async function SiteLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
