import { ChronicleChapter } from "@/components/history/chronicle-chapter";
import { ChronicleToc } from "@/components/history/chronicle-toc";
import {
  chronicleChapters,
  chronicleIntro,
  chronicleToc,
} from "@/data/history-chronicle";

export function Chronicle() {
  const [lead, context] = chronicleIntro;

  return (
    <div className="site-shell px-4 pt-8 pb-16 sm:px-0 sm:pt-10 sm:pb-20">
      <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16">
        <aside className="sticky top-28 z-20 sm:top-32 lg:static lg:col-span-3">
          <div className="lg:sticky lg:top-32 lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto lg:overscroll-contain">
            <ChronicleToc chapters={chronicleToc} />
          </div>
        </aside>

        <div className="mt-6 flex min-w-0 flex-col gap-16 lg:col-span-9 lg:mt-0 lg:gap-20">
          <header className="max-w-3xl">
            <p className="text-base leading-relaxed text-espresso sm:text-lg">
              {lead}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-warm-gray sm:text-base">
              {context}
            </p>
          </header>

          {chronicleChapters.map((chapter) => (
            <ChronicleChapter key={chapter.id} chapter={chapter} />
          ))}
        </div>
      </div>
    </div>
  );
}
