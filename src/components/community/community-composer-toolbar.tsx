"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ComposerIcon({
  label,
  onClick,
  isDisabled,
  isActive,
  children,
}: {
  label: string;
  onClick: () => void;
  isDisabled?: boolean;
  isActive?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isActive}
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-lg text-gold transition-colors hover:bg-espresso/5 hover:text-espresso disabled:pointer-events-none disabled:opacity-50",
        isActive && "bg-gold/20 text-espresso"
      )}
    >
      {children}
    </button>
  );
}
