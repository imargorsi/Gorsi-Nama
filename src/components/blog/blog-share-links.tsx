"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  FacebookIcon,
  TwitterIcon,
  WhatsAppIcon,
} from "@/components/icons/brand-icons";
import { siteOrigin } from "@/lib/site";

export function BlogShareLinks({ title }: { title: string }) {
  const t = useTranslations("Stories");
  const pathname = usePathname();
  const url = `${siteOrigin}${pathname}`;

  const shareLinks = [
    {
      label: t("shareFacebook"),
      icon: FacebookIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      label: t("shareTwitter"),
      icon: TwitterIcon,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      label: t("shareWhatsApp"),
      icon: WhatsAppIcon,
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
  ];

  return (
    <div className="flex items-center gap-3">
      {shareLinks.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex size-11 items-center justify-center rounded-lg bg-ivory text-espresso ring-1 ring-gold/25 transition-colors hover:bg-espresso/5 hover:ring-gold/50"
        >
          <Icon className="size-5" />
        </a>
      ))}
    </div>
  );
}
