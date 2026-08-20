"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Link, useRouter } from "@/i18n/navigation";
import { useCanManageContent } from "@/components/auth/use-can-manage-content";
import type { BlogPost } from "@/components/blog/blog.schemas";
import { useDeleteStory } from "@/components/blog/use-stories";
import { buttonVariants } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/get-error-message";
import { cn } from "@/lib/utils";

function useStoryDelete(slug: string, afterDeleteHref?: string) {
  const router = useRouter();
  const t = useTranslations("Stories");
  const deleteStory = useDeleteStory();

  async function onDelete() {
    if (!window.confirm(t("deleteConfirm"))) {
      return;
    }

    try {
      await deleteStory.mutateAsync(slug);
      toast.success(t("deleted"));
      if (afterDeleteHref) router.push(afterDeleteHref);
    } catch (error) {
      toast.error(getErrorMessage(error, t("deleteError")));
    }
  }

  return { onDelete, isPending: deleteStory.isPending };
}

const rowActionClass = cn(
  buttonVariants({ variant: "link", size: "sm" }),
  "h-11 gap-1.5 px-2.5 no-underline hover:underline"
);

export function StoryRowActions({ story }: { story: BlogPost }) {
  const t = useTranslations("Stories");
  const { onDelete, isPending } = useStoryDelete(story.slug);

  return (
    <div className="flex flex-wrap items-center">
      {story.status === "publish" ? (
        <Link
          href={`/blog/${story.slug}`}
          className={cn(rowActionClass, "text-gold")}
        >
          <Eye className="size-4" strokeWidth={1.75} />
          {t("view")}
        </Link>
      ) : null}
      <Link href={`/blog/${story.slug}/edit`} className={rowActionClass}>
        <Pencil className="size-4" strokeWidth={1.75} />
        {t("edit")}
      </Link>
      <button
        type="button"
        onClick={() => void onDelete()}
        disabled={isPending}
        className={cn(rowActionClass, "text-destructive hover:text-destructive")}
      >
        <Trash2 className="size-4" strokeWidth={1.75} />
        {t("delete")}
      </button>
    </div>
  );
}

export function StoryActions({ story }: { story: BlogPost }) {
  const t = useTranslations("Stories");
  const { canManage } = useCanManageContent(story.authorId);
  const { onDelete, isPending } = useStoryDelete(story.slug, "/blog");

  if (!canManage) return null;

  return (
    <div className="flex flex-col gap-2">
      <Link
        href={`/blog/${story.slug}/edit`}
        className={cn(
          buttonVariants({
            variant: "outline",
            className: "w-full",
          })
        )}
      >
        <Pencil className="size-4" />
        {t("edit")}
      </Link>
      <button
        type="button"
        onClick={() => void onDelete()}
        disabled={isPending}
        className={cn(
          buttonVariants({
            variant: "ghost",
            className: "w-full text-destructive hover:text-destructive",
          })
        )}
      >
        <Trash2 className="size-4" />
        {t("delete")}
      </button>
    </div>
  );
}
