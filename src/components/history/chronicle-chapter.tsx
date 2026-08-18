import { Fragment, type ReactNode } from "react";
import { HeritageDiamond } from "@/components/heritage-ornaments";
import { Reveal } from "@/components/reveal";
import {
  formatChapterIndex,
  type ChronicleChapter as ChronicleChapterData,
  type ChronicleMarkerGroup,
} from "@/data/history-chronicle";

function renderEmphasis(text: string): ReactNode {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

function Prose({ children }: { children: string }) {
  return (
    <p className="text-sm leading-relaxed text-warm-gray sm:text-base">
      {renderEmphasis(children)}
    </p>
  );
}

function MarkerGroup({ group }: { group: ChronicleMarkerGroup }) {
  return (
    <div>
      <p className="heritage-eyebrow">{group.label}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li
            key={item}
            className="rounded-full bg-gold px-3 py-1.5 text-sm font-medium text-espresso"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ChronicleChapter({
  chapter,
}: {
  chapter: ChronicleChapterData;
}) {
  return (
    <Reveal amount={0.15}>
      <article
        id={chapter.id}
        className="scroll-mt-52 border-s-2 border-gold/30 ps-5 sm:ps-8 lg:scroll-mt-36"
      >
        <p className="font-heading text-2xl font-light tracking-[0.12em] text-gold">
          {formatChapterIndex(chapter.number)}
        </p>
        <p className="heritage-eyebrow mt-3">{chapter.kicker}</p>
        <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-espresso sm:text-3xl">
          {chapter.title}
        </h2>

        <div className="mt-6 flex flex-col gap-4">
          {chapter.paragraphs.map((paragraph) => (
            <Prose key={paragraph}>{paragraph}</Prose>
          ))}

          {chapter.callout ? (
            <aside className="border-s-2 border-gold bg-ivory px-4 py-3 text-sm leading-relaxed text-espresso sm:text-base">
              {chapter.callout}
            </aside>
          ) : null}

          {chapter.markers?.map((group) => (
            <MarkerGroup key={group.label} group={group} />
          ))}

          {chapter.list ? (
            <ul className="flex flex-col gap-2.5 ps-1">
              {chapter.list.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-warm-gray sm:text-base"
                >
                  <HeritageDiamond className="mt-1.5 size-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {chapter.afterList?.map((paragraph) => (
            <Prose key={paragraph}>{paragraph}</Prose>
          ))}

          {chapter.emphasized ? (
            <div className="mt-2 flex flex-col gap-1">
              {chapter.emphasized.map((line) => (
                <p
                  key={line}
                  className="font-heading text-xl font-semibold tracking-tight text-espresso sm:text-2xl"
                >
                  {line}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </article>
    </Reveal>
  );
}
