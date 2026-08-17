"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function HeaderMenu({
  align = "end",
  trigger,
  children,
}: {
  align?: "start" | "end";
  trigger: (opts: { open: boolean; menuId: string }) => ReactNode;
  children: ReactNode;
}) {
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative flex h-full items-center self-stretch"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex h-full items-center" onClick={() => setOpen((current) => !current)}>
        {trigger({ open, menuId })}
      </div>
      {open ? (
        <div
          id={menuId}
          role="menu"
          className={cn(
            "absolute top-full z-50 min-w-52 pt-3",
            align === "end" ? "end-0" : "start-0"
          )}
        >
          <div className="rounded-xl bg-ivory py-1.5 shadow-lg ring-1 ring-gold/20">
            {children}
          </div>
        </div>
      ) : null}
    </div>
  );
}
