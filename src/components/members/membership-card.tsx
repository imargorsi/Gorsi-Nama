import Image from "next/image";

export function MembershipCard({
  name,
  membershipId,
}: {
  name: string;
  membershipId: string;
}) {
  return (
    <div className="relative flex items-center gap-4 overflow-hidden rounded-xl border p-4">
      <Image
        src="/trademarkgorsi.png"
        alt=""
        fill
        sizes="256px"
        className="object-contain opacity-5"
      />
      <div className="relative size-14 shrink-0 overflow-hidden rounded-full">
        <Image src="/default.jpg" alt="" fill sizes="56px" className="object-cover" />
      </div>
      <div className="relative flex flex-col">
        <p className="text-xs text-muted-foreground">
          Membership ID# {membershipId}
        </p>
        <h3 className="font-heading font-semibold">{name}</h3>
      </div>
    </div>
  );
}
