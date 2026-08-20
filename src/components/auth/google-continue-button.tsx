"use client";

import { GoogleIcon } from "@/components/icons/brand-icons";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function GoogleContinueButton({
  onClick,
  isPending,
}: {
  onClick: () => void;
  isPending: boolean;
}) {
  const t = useTranslations("Auth");

  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      disabled={isPending}
      className="w-full bg-ivory"
    >
      <GoogleIcon className="size-4.5" />
      {isPending ? t("googlePending") : t("google")}
    </Button>
  );
}
