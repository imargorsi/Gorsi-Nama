import { Link } from "@/i18n/navigation";
import { Archive, ArrowRight, PenLine, Scroll, Users } from "lucide-react";
import { SectionHeading } from "./section-heading";

const links = [
  {
    title: "Our History",
    description: "Trace our journey across generations.",
    href: "/history",
    cta: "Explore History",
    icon: Scroll,
  },
  {
    title: "Our Stories",
    description: "Read stories and memories shared by the community.",
    href: "/blog",
    cta: "Explore Stories",
    icon: PenLine,
  },
  {
    title: "Our People",
    description: "Discover the people who make up our community.",
    href: "/member",
    cta: "Meet the Community",
    icon: Users,
  },
  {
    title: "Our Archive",
    description: "Explore books, documents, photographs and resources.",
    href: "/library",
    cta: "Explore Library",
    icon: Archive,
  },
];

export function ExploreGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading
        title="Explore Gorsi Nama"
        description="Discover the stories, people, history and knowledge that make up our shared heritage."
      />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {links.map(({ title, description, href, cta, icon: Icon }) => (
          <div
            key={href}
            className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Icon className="size-5" />
            </span>
            <h3 className="font-heading font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
            <Link
              href={href}
              className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              {cta}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
