import { Link } from "@/i18n/navigation";
import { ArrowRight, BookMarked, FileText, Landmark } from "lucide-react";
import { SectionHeading } from "./section-heading";

const categories = [
  {
    title: "Books",
    description: "Books and publications related to Gorsi history and heritage.",
    icon: BookMarked,
  },
  {
    title: "Documents",
    description: "Historical documents and records.",
    icon: FileText,
  },
  {
    title: "Resources",
    description: "Research, references and useful material.",
    icon: Landmark,
  },
];

export function LibraryPreview() {
  return (
    <section className="site-shell px-4 py-16 sm:px-0">
      <SectionHeading
        title="The Gorsi Library"
        description="A growing collection of books, documents and resources preserving knowledge for generations to come."
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {categories.map(({ title, description, icon: Icon }) => (
          <div
            key={title}
            className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Icon className="size-5" />
            </span>
            <h3 className="font-heading font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>

      <Link
        href="/library"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        Explore the Library
        <ArrowRight className="size-4" />
      </Link>
    </section>
  );
}
