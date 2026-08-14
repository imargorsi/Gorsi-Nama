import Image from "next/image";

const BOOKS = [
  {
    href: "/documents/gujjar-history-by-rana-ali-hassan-chauhan-pdf-free.pdf",
    cover: "/pdf.png",
    title: "Gujjar History — Rana Ali Hassan Chauhan",
  },
  {
    href: "/documents/gujjar-tribe.pdf",
    cover: "/pdf2.png",
    title: "Gujjar Tribe",
  },
];

export function BookGallery() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
      {BOOKS.map((book) => (
        <a
          key={book.href}
          href={book.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 text-center"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg ring-1 ring-border">
            <Image src={book.cover} alt="" fill className="object-cover" />
          </div>
          <span className="text-sm text-muted-foreground">{book.title}</span>
        </a>
      ))}
    </div>
  );
}
