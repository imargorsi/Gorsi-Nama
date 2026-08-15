import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
      <Link href="/" className={cn(buttonVariants({ className: "mt-2" }))}>
        <ArrowLeft />
        Back to Homepage
      </Link>
    </div>
  );
}
