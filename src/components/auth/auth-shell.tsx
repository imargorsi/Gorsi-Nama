import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AuthShell({
  mode,
  children,
}: {
  mode: "login" | "signup";
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col overflow-hidden rounded-xl ring-1 ring-foreground/10 sm:my-12 sm:flex-row">
      <div className="relative hidden sm:block sm:w-1/2">
        <Image
          src="/history2.png"
          alt=""
          fill
          sizes="(min-width: 640px) 448px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex w-full flex-col gap-6 p-6 sm:w-1/2 sm:p-8">
        <div className="flex rounded-lg bg-muted p-1">
          <Link
            href="/auth/login"
            className={cn(
              "flex-1 rounded-md py-1.5 text-center text-sm font-medium transition-colors",
              mode === "login"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className={cn(
              "flex-1 rounded-md py-1.5 text-center text-sm font-medium transition-colors",
              mode === "signup"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Register
          </Link>
        </div>

        {children}
      </div>
    </div>
  );
}
