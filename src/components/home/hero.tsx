import Image from "next/image";
import Link from "next/link";
import { BookOpen, PenLine, Users } from "lucide-react";

const tiles = [
  { href: "/library", label: "Library", icon: BookOpen, image: "/book.jpg" },
  { href: "/people", label: "People", icon: Users, image: "/people.jpg" },
  { href: "/blog", label: "Writing", icon: PenLine, image: "/writing.jpg" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/hero.jpg"
        alt=""
        fill
        priority
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/60" />

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-24 sm:px-6 sm:py-32">
        <h1 className="font-heading max-w-2xl text-4xl font-semibold text-white sm:text-5xl">
          Discover the Legacy of the Gorsi Nama — Unveiling Our Rich History
          and Traditions
        </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {tiles.map(({ href, label, icon: Icon, image }) => (
            <Link
              key={href}
              href={href}
              className="group relative isolate flex h-32 items-end overflow-hidden rounded-xl ring-1 ring-white/20 transition-transform hover:-translate-y-1"
            >
              <Image
                src={image}
                alt=""
                fill
                className="-z-10 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 -z-10 bg-black/40 transition-colors group-hover:bg-black/50" />
              <div className="flex items-center gap-2 p-4 text-white">
                <Icon className="size-5" />
                <span className="font-medium">{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
