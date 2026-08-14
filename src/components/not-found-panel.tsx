import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFoundPanel({
  heading,
  text,
}: {
  heading: string;
  text: string;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
      <Image
        src="/trademarkgorsi.png"
        alt=""
        width={96}
        height={96}
        className="opacity-80"
      />
      <h2 className="font-heading text-2xl font-semibold">{heading}</h2>
      <p className="text-muted-foreground">{text}</p>
      <Button render={<Link href="/" />} className="mt-2">
        <ArrowLeft />
        Back to Homepage
      </Button>
    </div>
  );
}
