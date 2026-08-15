import { GoogleIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";

export function GoogleContinueButton({
  onClick,
  isPending,
}: {
  onClick: () => void;
  isPending: boolean;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      disabled={isPending}
      className="h-11 w-full gap-2.5 border-input bg-ivory text-sm font-medium text-foreground hover:bg-muted"
    >
      <GoogleIcon className="size-4.5" />
      {isPending ? "Redirecting…" : "Continue with Google"}
    </Button>
  );
}
