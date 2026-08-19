import {
  Heart,
  Landmark,
  Languages,
  ScrollText,
  Users,
  type LucideIcon,
} from "lucide-react";

/** Locked story categories — must match Postgres `story_category` (`lib/db/schema/enums.ts`). */
export const blogCategories = [
  { id: "heritage", label: "Heritage", icon: Landmark },
  { id: "community", label: "Community", icon: Users },
  { id: "family", label: "Family", icon: Heart },
  { id: "history", label: "History", icon: ScrollText },
  { id: "traditions", label: "Traditions", icon: Languages },
] as const satisfies readonly {
  id: string;
  label: string;
  icon: LucideIcon;
}[];

export type BlogCategoryId = (typeof blogCategories)[number]["id"];

export const blogCategoryIds = blogCategories.map((category) => category.id) as [
  BlogCategoryId,
  ...BlogCategoryId[],
];

export function isBlogCategoryId(id: string | undefined): id is BlogCategoryId {
  return Boolean(id && blogCategoryIds.includes(id as BlogCategoryId));
}

export function getBlogCategory(id: BlogCategoryId) {
  return blogCategories.find((category) => category.id === id)!;
}
