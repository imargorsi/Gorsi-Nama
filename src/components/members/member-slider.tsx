"use client";

import { MembershipCard } from "@/components/members/membership-card";
import {
  PagedSlider,
  chunkPages,
  pagedSliderPageSize,
} from "@/components/paged-slider";
import { placeholderMembers } from "@/data/members";

const dummyMembers = placeholderMembers.slice(0, 12);
const memberSliderPageSize = pagedSliderPageSize;

export function MemberSlider() {
  const pages = chunkPages(dummyMembers, memberSliderPageSize);

  return (
    <PagedSlider
      tablistLabel="Member pages"
      pageClassName="grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
      getPageLabel={(index) =>
        `Members ${index * memberSliderPageSize + 1} to ${Math.min((index + 1) * memberSliderPageSize, dummyMembers.length)}`
      }
      pages={pages.map((pageMembers, pageIndex) => ({
        key: pageMembers[0]?.id ?? String(pageIndex),
        content: pageMembers.map((member) => (
          <MembershipCard
            key={member.id}
            name={member.name}
            membershipId={member.membershipId}
            image={member.image}
            href={`/member/${member.id}`}
          />
        )),
      }))}
    />
  );
}
