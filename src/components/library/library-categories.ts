import { FileText, ImageIcon, type LucideIcon } from "lucide-react";

export const libraryCategories = [
  {
    id: "documents",
    title: "Documents",
    eyebrow: "PDFs",
    description:
      "Letters, records, scanned books, and papers kept as PDF files.",
    cta: "Browse documents",
    image: "/icon-library-2.png",
    imageAlt: "Heritage still-life of maps, sealed letters, and archive papers",
    emptyTitle: "No Documents Yet",
    emptyMessage:
      "PDFs added from the archive — letters, records, and scanned papers — will appear here.",
    icon: FileText,
  },
  {
    id: "images",
    title: "Photographs",
    eyebrow: "Images",
    description:
      "Photographs and visual records of people, places, and occasions.",
    cta: "Browse photographs",
    image: "/icon-library-3.png",
    imageAlt: "Heritage still-life of a camera, photo albums, and prints",
    emptyTitle: "No Photographs Yet",
    emptyMessage:
      "JPEG, PNG, and WebP photographs added to the archive will appear here.",
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
  emptyTitle: string;
  emptyMessage: string;
  icon: LucideIcon;
}[];

export type LibraryCategoryId = (typeof libraryCategories)[number]["id"];
export type LibraryCategory = (typeof libraryCategories)[number];

export function getLibraryCategory(id: LibraryCategoryId) {
  const category = libraryCategories.find((item) => item.id === id);
  if (!category) throw new Error(`Unknown library category: ${id}`);
  return category;
}

export function isLibraryCategoryId(value: string): value is LibraryCategoryId {
  return libraryCategories.some((category) => category.id === value);
}
