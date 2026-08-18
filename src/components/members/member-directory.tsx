"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  MembershipCard,
  MembershipCardGrid,
} from "@/components/members/membership-card";
import { buttonVariants } from "@/components/ui/button";
import {
  memberDirectoryInitialCount,
  memberDirectoryLoadCount,
  placeholderMembers,
} from "@/data/members";
import { cn } from "@/lib/utils";

export function MemberDirectory() {
  const [visibleCount, setVisibleCount] = useState(memberDirectoryInitialCount);
  const visibleMembers = placeholderMembers.slice(0, visibleCount);
  const hasMore = visibleCount < placeholderMembers.length;

  return (
    <div>
      <MembershipCardGrid>
        {visibleMembers.map((member) => (
          <MembershipCard
            key={member.id}
            name={member.name}
            membershipId={member.membershipId}
            image={member.image}
            href={`/member/${member.id}`}
          />
        ))}
      </MembershipCardGrid>

      {hasMore ? (
        <div className="mt-10 flex justify-center sm:mt-12">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((count) =>
                Math.min(
                  count + memberDirectoryLoadCount,
                  placeholderMembers.length
                )
              )
            }
            className={cn(
              buttonVariants({
                className:
                  "h-11 gap-2 bg-espresso px-5 text-ivory hover:bg-espresso/90",
              })
            )}
          >
            Show more
            <ChevronDown className="size-4" strokeWidth={1.75} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
