"use client";

import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Link, useRouter } from "@/i18n/navigation";
import { useCanManageContent } from "@/components/auth/use-can-manage-content";
import { deleteMemberStory } from "@/components/blog/member-stories";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/data/blog-posts";

export function StoryActions({ story }: { story: BlogPost }) {
  const { canManage } = useCanManageContent(story.authorId);
  const router = useRouter();

  if (!canManage) return null;

  function onDelete() {
    if (!window.confirm("Delete this story? This cannot be undone on this device.")) {
      return;
    }
    deleteMemberStory(story.id);
    toast.success("Story deleted.");
    router.push("/blog");
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
        onClick={onDelete}
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
