import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/typography";

export const nativeSelectClassName =
  "h-11 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export function FieldError({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  if (!children) return null;
  return (
    <Text variant="error" className={className}>
      {children}
    </Text>
  );
}

export function FormField({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Label htmlFor={id}>{label}</Label>
        {hint ? <Text variant="meta">{hint}</Text> : null}
      </div>
      {children}
      <FieldError>{error}</FieldError>
    </div>
  );
}
