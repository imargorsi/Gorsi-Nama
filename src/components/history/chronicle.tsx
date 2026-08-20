import { ChronicleChapter } from "@/components/history/chronicle-chapter";
import { ChronicleToc } from "@/components/history/chronicle-toc";
import { Reveal } from "@/components/reveal";
import { Text } from "@/components/typography";
import {
  chronicleChapters,
  type ChronicleChapter as ChronicleChapterData,
} from "@/data/history-chronicle";
import { getTranslations } from "next-intl/server";

function localizeChapter(
  chapter: ChronicleChapterData,
  copy: unknown
): ChronicleChapterData {
  if (!copy || typeof copy !== "object") return chapter;
  return {
    ...chapter,
    ...(copy as Omit<ChronicleChapterData, "id" | "number">),
    id: chapter.id,
    number: chapter.number,
  };
}

export async function Chronicle() {
  const t = await getTranslations("History");
  const chapters = chronicleChapters.map((chapter) =>
    localizeChapter(chapter, t.raw(`chapters.${chapter.id}`))
  );

  return (
    <div className="site-shell px-4 pt-8 pb-16 sm:px-0 sm:pt-10 sm:pb-20">
      <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16">
        <aside className="sticky top-28 z-20 sm:top-32 lg:static lg:col-span-3">
          <Reveal mode="load" className="lg:sticky lg:top-32 lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto lg:overscroll-contain">
            <ChronicleToc
              chapters={chapters.map(({ id, number, kicker }) => ({
                id,
                number,
                kicker,
              }))}
            />
          </Reveal>
        </aside>

        <div className="mt-6 flex min-w-0 flex-col gap-16 lg:col-span-9 lg:mt-0 lg:gap-20">
          <Reveal mode="load" as="header" className="max-w-3xl">
            <Text className="sm:text-lg">{t("intro.lead")}</Text>
            <Text variant="muted" className="mt-4">
              {t("intro.context")}
            </Text>
          </Reveal>

          {chapters.map((chapter) => (
            <ChronicleChapter key={chapter.id} chapter={chapter} />
          ))}
        </div>
      </div>
    </div>
  );
}
