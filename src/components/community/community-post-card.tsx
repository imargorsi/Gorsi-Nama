"use client";

import type { ReactNode } from "react";
import { Bookmark, Heart, Pencil, Share2, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useCanManageContent } from "@/components/auth/use-can-manage-content";
import { CommunityAvatar } from "@/components/community/community-avatar";
import { CommunityLinkPreview } from "@/components/community/community-link-preview";
import { CommunityPhoto } from "@/components/community/community-photo";
import { CommunityPostBody } from "@/components/community/community-post-body";
import { getCommunityCategory } from "@/components/community/community-categories";
import { formatTag } from "@/lib/parse-tags";
import {
  extractPostLink,
  formatRelativeTime,
  type CommunityPost,
} from "@/data/community-posts";
import { cn } from "@/lib/utils";
import { motionEase } from "@/components/reveal";
import { surfaceClass } from "@/components/surface";

const COMPACT_TAG_LIMIT = 3;

export function CommunityPostCard({
  post,
  compact = false,
  isLiked,
  isSaved,
  onLike,
  onSave,
  onShare,
  onTagClick,
  onEdit,
  onDelete,
}: {
  post: CommunityPost;
  compact?: boolean;
  isLiked: boolean;
  isSaved: boolean;
  onLike: () => void;
  onSave: () => void;
  onShare: () => void;
  onTagClick: (tag: string) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const { canManage } = useCanManageContent(post.authorId);
  const category = getCommunityCategory(post.categoryId);
  const CategoryIcon = category.icon;
  const linkUrl = extractPostLink(post.body, post.linkUrl);
  const likeCount = post.likeCount + (isLiked ? 1 : 0);
  const saveCount = post.saveCount + (isSaved ? 1 : 0);
  const visibleTags = compact
    ? post.tags.slice(0, COMPACT_TAG_LIMIT)
    : post.tags;
  const hiddenTagCount = compact
    ? Math.max(0, post.tags.length - COMPACT_TAG_LIMIT)
    : 0;
  const images = compact ? post.images.slice(0, 1) : post.images;

  return (
    <article
      id={post.id}
      className={cn(
        surfaceClass,
        "flex min-w-0 flex-col p-3.5 sm:p-4",
        compact && "h-full"
      )}
    >
      <header className="flex min-w-0 items-start gap-3">
        <CommunityAvatar name={post.authorName} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-heading text-base font-semibold text-espresso">
            {post.authorName}
          </h3>
          <p className="mt-0.5 truncate text-xs text-warm-gray">
            {formatRelativeTime(post.createdAt)}
            <span className="mx-1.5">·</span>
            <span className="inline-flex items-center gap-1">
              <CategoryIcon
                className="size-3 text-gold"
                strokeWidth={1.75}
              />
              {category.label}
            </span>
          </p>
        </div>
      </header>

      <div className="mt-2.5 flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="min-w-0">
          <CommunityPostBody body={post.body} compact={compact} />
        </div>

        {compact || visibleTags.length > 0 ? (
          <ul className="mt-2.5 flex h-7 flex-wrap gap-1.5 overflow-hidden">
            {visibleTags.map((tag) => (
              <li key={tag}>
                <button
                  type="button"
                  onClick={() => onTagClick(tag)}
                  className="rounded-full bg-espresso/8 px-2.5 py-1 text-xs font-medium text-espresso transition-colors hover:bg-espresso/12"
                >
                  {formatTag(tag)}
                </button>
              </li>
            ))}
            {hiddenTagCount > 0 ? (
              <li className="px-1 py-1 text-xs text-warm-gray">
                +{hiddenTagCount}
              </li>
            ) : null}
          </ul>
        ) : null}

        {linkUrl && !compact ? (
          <div className="mt-3 min-w-0">
            <CommunityLinkPreview url={linkUrl} />
          </div>
        ) : null}

        {images.length > 0 ? (
          <PostImages images={images} compact={compact} />
        ) : compact ? (
          <div className="mt-3 aspect-4/3 rounded-lg bg-espresso/8" />
        ) : null}

        <footer className="-ms-2 mt-auto flex flex-wrap items-center gap-1 pt-2">
          <PostAction
            label={isLiked ? "Unlike" : "Like"}
            count={likeCount}
            isActive={isLiked}
            onClick={onLike}
          >
            <Heart
              className="size-4"
              strokeWidth={1.75}
              fill={isLiked ? "currentColor" : "none"}
            />
          </PostAction>
          <PostAction
            label={isSaved ? "Unsave" : "Save"}
            count={saveCount}
            isActive={isSaved}
            onClick={onSave}
          >
            <Bookmark
              className="size-4"
              strokeWidth={1.75}
              fill={isSaved ? "currentColor" : "none"}
            />
          </PostAction>
          <PostAction label="Share" onClick={onShare}>
            <Share2 className="size-4" strokeWidth={1.75} />
            Share
          </PostAction>
          {canManage && !compact && onEdit && onDelete ? (
            <>
              <PostAction label="Edit" onClick={onEdit}>
                <Pencil className="size-4" strokeWidth={1.75} />
                Edit
              </PostAction>
              <PostAction label="Delete" onClick={onDelete}>
                <Trash2 className="size-4" strokeWidth={1.75} />
                Delete
              </PostAction>
            </>
          ) : null}
        </footer>
      </div>
    </article>
  );
}

function PostImages({
  images,
  compact,
}: {
  images: string[];
  compact: boolean;
}) {
  if (images.length === 1) {
    return (
      <CommunityPhoto
        src={images[0]!}
        sizes="(min-width: 768px) 40vw, 100vw"
        variant={compact ? "compact" : "post"}
        className="mt-3"
      />
    );
  }

  return (
    <div
      className={cn(
        "mt-3 grid gap-0.5 overflow-hidden rounded-lg",
        images.length === 2 ? "grid-cols-2" : "grid-cols-3"
      )}
    >
      {images.slice(0, 3).map((src) => (
        <CommunityPhoto
          key={src}
          src={src}
          sizes="(min-width: 768px) 20vw, 33vw"
          variant="tile"
          className="rounded-none"
        />
      ))}
    </div>
  );
}

function PostAction({
  label,
  count,
  isActive,
  onClick,
  children,
}: {
  label: string;
  count?: number;
  isActive?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={isActive}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15, ease: motionEase }}
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2.5 text-sm transition-colors",
        isActive
          ? "text-gold"
          : "text-warm-gray hover:bg-espresso/5 hover:text-espresso"
      )}
    >
      {children}
      {typeof count === "number" ? (
        <span className="tabular-nums">{count}</span>
      ) : null}
    </motion.button>
  );
}
