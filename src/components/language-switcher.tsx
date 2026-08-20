"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const localeLabels: Record<(typeof routing.locales)[number], string> = {
  en: "EN",
  ur: "اردو",
};

export function LanguageSwitcher({
  className,
  tone = "on-dark",
}: {
  className?: string;
  tone?: "on-dark" | "on-light";
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("LanguageSwitcher");

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={cn(
        "flex items-center rounded-full p-0.5 ring-1",
        tone === "on-dark" ? "ring-ivory/15" : "ring-espresso/16",
        className
      )}
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          aria-current={loc === locale}
          aria-label={t(loc)}
          className={cn(
            "min-h-11 rounded-full px-3 py-2 font-sans text-xs font-semibold tracking-wide whitespace-nowrap transition-colors",
            loc === "ur" && "[font-family:var(--font-urdu)] text-[0.8rem] leading-none",
            loc === locale
              ? "bg-gold text-espresso"
              : tone === "on-dark"
                ? "text-ivory/70 hover:text-gold"
                : "text-warm-gray hover:text-gold"
          )}
        >
          {localeLabels[loc]}
        </button>
      ))}
    </div>
  );
}
