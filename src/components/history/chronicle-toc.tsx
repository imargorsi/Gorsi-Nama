"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ChevronDown } from "lucide-react";
import { HeritageCircleMark } from "@/components/heritage-ornaments";
import {
  chronicleToc,
  formatChapterIndex,
  type ChronicleChapter,
} from "@/data/history-chronicle";
import { cn } from "@/lib/utils";

type TocChapter = Pick<ChronicleChapter, "id" | "number" | "kicker">;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ChronicleToc({
  chapters = chronicleToc,
}: {
  chapters?: TocChapter[];
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const items =
    (Array.isArray(chapters) && chapters.length > 0 ? chapters : chronicleToc) ??
    [];
  const firstChapter = items[0];
  const [activeId, setActiveId] = useState(firstChapter?.id);
  const activeChapter =
    items.find((chapter) => chapter.id === activeId) ?? firstChapter;

  useEffect(() => {
    if (items.length === 0) return;

    const offset = 200;

    function updateActiveChapter() {
      let current = items[0]?.id;
      for (const chapter of items) {
        const heading = document.getElementById(chapter.id);
        if (heading && heading.getBoundingClientRect().top <= offset) {
          current = chapter.id;
        }
      }
      if (current) setActiveId(current);
    }

    updateActiveChapter();
    window.addEventListener("scroll", updateActiveChapter, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveChapter);
  }, [items]);

  if (!activeChapter) return null;

  function closeMobileToc() {
    detailsRef.current?.removeAttribute("open");
  }

  function goToChapter(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    closeMobileToc();
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", `#${id}`);
  }

  const links = (
    <ol className="border-s-2 border-gold/20">
      {items.map((chapter) => {
        const isActive = activeId === chapter.id;
        return (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              aria-current={isActive ? "location" : undefined}
              onClick={(event) => goToChapter(event, chapter.id)}
              className={cn(
                "-ms-0.5 flex min-h-11 items-start gap-2.5 border-s-2 px-3 py-2 text-sm transition-colors",
                isActive
                  ? "border-espresso bg-ivory/80 text-espresso"
                  : "border-transparent text-warm-gray hover:text-gold"
              )}
            >
              <span className="mt-0.5 font-heading text-sm font-light tracking-[0.08em] text-gold">
                {formatChapterIndex(chapter.number)}
              </span>
              <span className="leading-snug">{chapter.kicker}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <nav aria-label="On this page">
      <details
        ref={detailsRef}
        className="group rounded-xl bg-ivory/95 shadow-sm ring-1 ring-espresso/10 backdrop-blur-md lg:hidden"
      >
        <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 px-3 py-2.5 [&::-webkit-details-marker]:hidden">
          <HeritageCircleMark className="size-6" />
          <span className="min-w-0 flex-1">
            <span className="heritage-eyebrow block">
              On This Page ({items.length} chapters)
            </span>
            <span className="mt-0.5 block truncate text-sm text-espresso">
              {formatChapterIndex(activeChapter.number)} — {activeChapter.kicker}
            </span>
          </span>
          <ChevronDown
            className="size-4 shrink-0 text-gold transition-transform group-open:rotate-180"
            strokeWidth={1.75}
            aria-hidden
          />
        </summary>
        <div className="max-h-[min(24rem,70vh)] overflow-y-auto border-t border-espresso/10 px-2 py-2">
          {links}
        </div>
      </details>

      <div className="hidden lg:block">
        <p className="mb-4 flex items-center gap-2.5">
          <HeritageCircleMark className="size-6" />
          <span className="heritage-eyebrow">
            On This Page ({items.length} chapters)
          </span>
        </p>
        {links}
      </div>
    </nav>
  );
}
