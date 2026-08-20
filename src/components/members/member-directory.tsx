"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { MembershipCard } from "@/components/members/membership-card";
import { Stagger, StaggerItem } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import {
  memberDirectoryInitialCount,
  memberDirectoryLoadCount,
  placeholderMembers,
} from "@/data/members";
import { cn } from "@/lib/utils";

export function MemberDirectory() {
  const t = useTranslations("Members");
  const [visibleCount, setVisibleCount] = useState(memberDirectoryInitialCount);
  const visibleMembers = placeholderMembers.slice(0, visibleCount);
  const hasMore = visibleCount < placeholderMembers.length;

  return (
    <div>
      <Stagger
        mode="load"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
      >
        {visibleMembers.map((member, index) => (
          <StaggerItem key={member.id} index={index}>
            <MembershipCard
              name={member.name}
              membershipId={member.membershipId}
              image={member.image}
              href={`/member/${member.id}`}
            />
          </StaggerItem>
        ))}
      </Stagger>

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
              buttonVariants({ className: "gap-2" })
            )}
          >
            {t("showMore")}
            <ChevronDown className="size-4" strokeWidth={1.75} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
