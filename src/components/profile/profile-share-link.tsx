"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function subscribe() {
  return () => {};
}

function getOrigin() {
  return window.location.origin;
}

function getServerOrigin() {
  return "";
}

export function ProfileShareLink({ path }: { path: string }) {
  const t = useTranslations("Profile");
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<number | null>(null);
  const origin = useSyncExternalStore(subscribe, getOrigin, getServerOrigin);
  const url = origin ? `${origin}${path}` : path;

  useEffect(() => {
    return () => {
      if (copiedTimer.current !== null) window.clearTimeout(copiedTimer.current);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${path}`);
      setCopied(true);
      toast.success(t("linkCopied"));
      if (copiedTimer.current !== null) window.clearTimeout(copiedTimer.current);
      copiedTimer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t("copyError"));
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        readOnly
        value={url}
        aria-label={t("shareAria")}
        className="min-w-0 text-sm md:text-xs"
      />
      <Button
        type="button"
        variant="outline"
        size="icon-lg"
        onClick={copy}
        aria-label={copied ? t("copied") : t("copyLink")}
        className="shrink-0"
      >
        {copied ? <Check /> : <Copy />}
      </Button>
    </div>
  );
}
