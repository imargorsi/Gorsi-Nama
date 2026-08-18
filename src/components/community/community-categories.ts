export const communityCategories = [
  { id: "our-stories", label: "Our Stories" },
  { id: "discussions", label: "Discussions" },
  { id: "places-communities", label: "Places & Communities" },
  { id: "history-heritage", label: "History & Heritage" },
  { id: "language-traditions", label: "Language & Traditions" },
] as const;

export type CommunityCategoryId = (typeof communityCategories)[number]["id"];

export const communityCategoryIds = communityCategories.map(
  (category) => category.id
) as [CommunityCategoryId, ...CommunityCategoryId[]];

export function getCommunityCategory(id: CommunityCategoryId) {
  return communityCategories.find((category) => category.id === id)!;
}
