import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { HeritageRule } from "@/components/heritage-ornaments";
import { FadeIn } from "@/components/reveal";
import { Heading, Text } from "@/components/typography";
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
    <FadeIn className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
      <Image
        src="/trademarkgorsi.png"
        alt=""
        width={96}
        height={96}
        className="opacity-80"
      />
      <Heading as="h1" variant="h3">
        {heading}
      </Heading>
      <HeritageRule />
      <Text variant="muted">{text}</Text>
      <Link
        href="/"
        className={cn(buttonVariants({ className: "mt-2" }))}
      >
        <ArrowLeft className="size-4 rtl:rotate-180" />
        Back to Homepage
      </Link>
    </FadeIn>
  );
}
