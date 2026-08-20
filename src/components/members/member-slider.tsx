"use client";

import { useTranslations } from "next-intl";
import { MembershipCard } from "@/components/members/membership-card";
import {
  PagedSlider,
  chunkPages,
  usePagedSliderPageSize,
} from "@/components/paged-slider";
import { placeholderMembers } from "@/data/members";

const dummyMembers = placeholderMembers.slice(0, 12);

export function MemberSlider() {
  const t = useTranslations("Home.members");
  const pageSize = usePagedSliderPageSize();
  const pages = chunkPages(dummyMembers, pageSize);

  return (
    <PagedSlider
      tablistLabel={t("pagesAria")}
      pageClassName="grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
      getPageLabel={(index) =>
        t("pageLabel", {
          from: index * pageSize + 1,
          to: Math.min((index + 1) * pageSize, dummyMembers.length),
        })
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
