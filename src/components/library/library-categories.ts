export const libraryCategories = [
  {
    id: "books",
    title: "Books",
    eyebrow: "Publications",
    description: "Books and publications related to Gorsi history and heritage.",
    cta: "Browse Books",
    image: "/book.jpg",
    emptyMessage: "No books yet — check back soon.",
  },
  {
    id: "documents",
    title: "Documents",
    eyebrow: "Records & PDFs",
    description: "PDFs, letters, and historical papers from the Gorsi archive.",
    cta: "Browse Documents",
    image: "/writing.jpg",
    emptyMessage: "No documents yet — check back soon.",
  },
  {
    id: "images",
    title: "Images",
    eyebrow: "Photographs",
    description: "Photographs and visual records that preserve our shared memory.",
    cta: "Browse Images",
    image: "/history__image__4.jpg",
    emptyMessage: "No images yet — check back soon.",
  },
] as const;

export type LibraryCategoryId = (typeof libraryCategories)[number]["id"];

export function isLibraryCategoryId(value: string): value is LibraryCategoryId {
  return libraryCategories.some((category) => category.id === value);
}
