import {
  BookOpen,
  Landmark,
  Languages,
  MapPin,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";

export const communityCategories = [
  { id: "our-stories", label: "Our Stories", icon: BookOpen },
  { id: "discussions", label: "Discussions", icon: MessagesSquare },
  { id: "places-communities", label: "Places & Communities", icon: MapPin },
  { id: "history-heritage", label: "History & Heritage", icon: Landmark },
  { id: "language-traditions", label: "Language & Traditions", icon: Languages },
] as const satisfies readonly {
  id: string;
  label: string;
  icon: LucideIcon;
}[];

export const communityDescription =
  "A shared space for Gujjar families to exchange memories, ask questions, share photographs, and stay connected through the stories that bring us together.";

export type CommunityCategoryId = (typeof communityCategories)[number]["id"];

export const communityCategoryIds = communityCategories.map(
  (category) => category.id
) as [CommunityCategoryId, ...CommunityCategoryId[]];

export function getCommunityCategory(id: CommunityCategoryId) {
  return communityCategories.find((category) => category.id === id)!;
}

export function isCommunityCategoryId(
  value: string | undefined
): value is CommunityCategoryId {
  return communityCategoryIds.includes(value as CommunityCategoryId);
}
