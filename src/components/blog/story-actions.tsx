"use client";

import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Link, useRouter } from "@/i18n/navigation";
import { useCanManageContent } from "@/components/auth/use-can-manage-content";
import type { BlogPost } from "@/components/blog/blog.schemas";
import { useDeleteStory } from "@/components/blog/use-stories";
import { buttonVariants } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/get-error-message";
import { cn } from "@/lib/utils";

export function StoryActions({ story }: { story: BlogPost }) {
  const { canManage } = useCanManageContent(story.authorId);
  const router = useRouter();
  const deleteStory = useDeleteStory();

  if (!canManage) return null;

  async function onDelete() {
    if (!window.confirm("Delete this story? This cannot be undone.")) {
      return;
    }

    try {
      await deleteStory.mutateAsync(story.slug);
      toast.success("Story deleted.");
      router.push("/blog");
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not delete this story."));
    }
  }

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
        Edit
      </Link>
      <button
        type="button"
        onClick={() => void onDelete()}
        disabled={deleteStory.isPending}
        className={cn(
          buttonVariants({
            variant: "ghost",
            className: "w-full text-destructive hover:text-destructive",
          })
        )}
      >
        <Trash2 className="size-4" />
        Delete
      </button>
    </div>
  );
}
