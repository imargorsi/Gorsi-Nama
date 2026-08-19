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
      className="w-full bg-ivory"
    >
      <GoogleIcon className="size-4.5" />
      {isPending ? "Redirecting…" : "Continue with Google"}
    </Button>
  );
}
