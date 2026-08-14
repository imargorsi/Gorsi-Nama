import { Button } from "@/components/ui/button";

export function CallToAction({
  text,
  buttonText,
}: {
  text: string;
  buttonText: string;
}) {
  return (
    <section className="border-t bg-muted/40">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-14 text-center sm:px-6">
        <p className="text-muted-foreground">{text}</p>
        <Button>{buttonText}</Button>
      </div>
    </section>
  );
}
