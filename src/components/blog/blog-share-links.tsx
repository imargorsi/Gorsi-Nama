"use client";

import { usePathname } from "next/navigation";
import {
  FacebookIcon,
  TwitterIcon,
  WhatsAppIcon,
} from "@/components/icons/brand-icons";

export function BlogShareLinks({ title }: { title: string }) {
  const pathname = usePathname();
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}${pathname}`
      : pathname;

  const shareLinks = [
    {
      label: "Share on Facebook",
      icon: FacebookIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      label: "Share on Twitter",
      icon: TwitterIcon,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      label: "Share on WhatsApp",
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
