import { BookMarked, FileText, ImageIcon, type LucideIcon } from "lucide-react";

export const libraryCategories = [
  {
    id: "books",
    title: "Books",
    eyebrow: "Publications",
    description:
      "Bound volumes on Gorsi history, genealogy, and the life of the tribe.",
    cta: "Browse books",
    image: "/icon-library-1.png",
    imageAlt: "Heritage still-life of books, a scroll, and a quill",
    emptyMessage: "No books yet — check back soon.",
    icon: BookMarked,
  },
  {
    id: "documents",
    title: "Documents",
    eyebrow: "Records",
    description: "Letters, papers, and PDFs kept from the family archive.",
    cta: "Browse records",
    image: "/icon-library-2.png",
    imageAlt: "Heritage still-life of maps, sealed letters, and archive papers",
    emptyMessage: "No documents yet — check back soon.",
    icon: FileText,
  },
  {
    id: "images",
    title: "Images",
    eyebrow: "Photographs",
    description:
      "Photographs and visual records of people, places, and occasions.",
    cta: "Browse photographs",
    image: "/icon-library-3.png",
    imageAlt: "Heritage still-life of a camera, photo albums, and prints",
    emptyMessage: "No images yet — check back soon.",
    icon: ImageIcon,
  },
] as const satisfies readonly {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  cta: string;
  image: string;
  imageAlt: string;
  emptyMessage: string;
  icon: LucideIcon;
}[];

export type LibraryCategoryId = (typeof libraryCategories)[number]["id"];
export type LibraryCategory = (typeof libraryCategories)[number];

export function isLibraryCategoryId(value: string): value is LibraryCategoryId {
  return libraryCategories.some((category) => category.id === value);
}
