export const blogCategories = [
  { id: "heritage", label: "Heritage" },
  { id: "community", label: "Community" },
  { id: "family", label: "Family" },
  { id: "history", label: "History" },
  { id: "traditions", label: "Traditions" },
] as const;

export type BlogCategoryId = (typeof blogCategories)[number]["id"];

export const blogCategoryIds = blogCategories.map((category) => category.id) as [
  BlogCategoryId,
  ...BlogCategoryId[],
];

export function getBlogCategory(id: BlogCategoryId) {
  return blogCategories.find((category) => category.id === id)!;
}
