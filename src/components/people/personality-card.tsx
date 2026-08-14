import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PersonalityCard({
  name,
  bio,
  reverse,
}: {
  name: string;
  bio: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-8 sm:px-6 md:grid-cols-2",
        reverse && "md:[&>*:first-child]:order-2"
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <Image src="/people.jpg" alt="" fill className="object-cover" />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-xl font-semibold">{name}</h3>
        <p className="text-muted-foreground">{bio}</p>
        <Button variant="outline" className="w-fit">
          Read More
        </Button>
      </div>
    </div>
  );
}
