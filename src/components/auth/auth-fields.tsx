"use client";

import { useState, type ComponentProps } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function IconInput({
  icon: Icon,
  className,
  ...props
}: ComponentProps<typeof Input> & { icon: LucideIcon }) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input className={cn("ps-10", className)} {...props} />
    </div>
  );
}

export function PasswordInput({
  icon: Icon,
  className,
  ...props
}: ComponentProps<typeof Input> & { icon: LucideIcon }) {
  const t = useTranslations("Auth");
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type={visible ? "text" : "password"}
        className={cn("ps-10 pe-10", className)}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        className="absolute inset-e-1 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center text-muted-foreground hover:text-foreground"
        aria-label={visible ? t("hidePassword") : t("showPassword")}
      >
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}
