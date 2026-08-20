import "server-only";

import {
  and,
  count,
  desc,
  eq,
  exists,
  ilike,
  inArray,
  ne,
  or,
  sql,
  type SQL,
} from "drizzle-orm";
import type { User } from "@clerk/nextjs/server";
import {
  emptyStoryCounts,
  isBlogCategoryCountKey,
  type BlogPost,
  type BlogPostValues,
  type StoryCategoryCounts,
  type StoryListQuery,
  type StoryListResponse,
} from "@/components/blog/blog.schemas";
import { db } from "@/lib/db";
import { stories, storyTags, tags, users, type Story } from "@/lib/db/schema";
import { ensureAppUser } from "@/lib/db/ensure-app-user";
import { HttpError } from "@/lib/http";
import { parseTags } from "@/lib/parse-tags";
import { slugify, uniqueSlug } from "@/lib/slugify";
import { canManageContent } from "@/lib/roles";
import {
  displayName,
  excerptFromContent,
  likePattern,
} from "@/lib/stories/format";
import { objectPublicUrl } from "@/lib/storage/r2";
import { revalidateStoryPaths } from "@/lib/stories/revalidate";

type StoryAuthor = {
  id: string;
  firstName: string | null;
  lastName: string | null;
};

type StoryRow = {
  story: Story;
  author: StoryAuthor;
};

function isOwnedCommunityImageKey(key: string, userId: string) {
  if (key.includes("..") || key.includes("\\") || key.includes("//")) {
    return false;
  }
  const prefix = `community/${userId}/`;
  if (!key.startsWith(prefix)) return false;
  const rest = key.slice(prefix.length);
  return rest.length > 0 && !rest.includes("/");
}

function resolveFeaturedImage(
  userId: string,
  values: Pick<BlogPostValues, "featuredImage" | "featuredImageKey">,
  existing?: Pick<Story, "featuredImageKey" | "featuredImageUrl">
) {
  const featuredImageKey = values.featuredImageKey?.trim() || null;

  if (!featuredImageKey) {
    if (values.featuredImage?.trim()) {
      throw new HttpError(400, "That image cannot be used.");
    }
    return { featuredImageUrl: null, featuredImageKey: null };
  }

  const isExisting = featuredImageKey === existing?.featuredImageKey;
  if (!isExisting && !isOwnedCommunityImageKey(featuredImageKey, userId)) {
    throw new HttpError(400, "That image cannot be used.");
  }

  const featuredImageUrl = objectPublicUrl(featuredImageKey);
  if (!featuredImageUrl) {
    throw new HttpError(503, "Image storage is not configured.");
  }

  return { featuredImageUrl, featuredImageKey };
}

function mapStory(row: StoryRow, tagLabels: string[]): BlogPost {
  return {
    id: row.story.id,
    slug: row.story.slug,
    title: row.story.title,
    excerpt: row.story.excerpt ?? "",
    content: row.story.content,
    categoryId: row.story.category,
    tags: tagLabels,
    featuredImage:
      (row.story.featuredImageKey
        ? objectPublicUrl(row.story.featuredImageKey)
        : undefined) ??
      row.story.featuredImageUrl ??
      undefined,
    featuredImageKey: row.story.featuredImageKey ?? undefined,
    status: row.story.status,
    authorName: displayName(row.author),
    authorId: row.story.authorId,
    publishedAt: row.story.publishedAt?.toISOString(),
    updatedAt: row.story.updatedAt.toISOString(),
  };
}

async function tagsByStoryId(storyIds: string[]) {
  const grouped = new Map<string, string[]>();
  if (storyIds.length === 0) return grouped;

  const rows = await db
    .select({
      storyId: storyTags.storyId,
      label: tags.label,
    })
    .from(storyTags)
    .innerJoin(tags, eq(storyTags.tagId, tags.id))
    .where(inArray(storyTags.storyId, storyIds));

  for (const row of rows) {
    const list = grouped.get(row.storyId) ?? [];
    list.push(row.label);
    grouped.set(row.storyId, list);
  }

  return grouped;
}

async function mapRows(rows: StoryRow[]): Promise<BlogPost[]> {
  const grouped = await tagsByStoryId(rows.map((row) => row.story.id));
  return rows.map((row) => mapStory(row, grouped.get(row.story.id) ?? []));
}

function publishedSearchCondition(pattern: string) {
  return or(
    ilike(stories.title, pattern),
    ilike(stories.excerpt, pattern),
    ilike(stories.content, pattern),
    ilike(users.firstName, pattern),
    ilike(users.lastName, pattern),
    ilike(
      sql<string>`concat_ws(' ', ${users.firstName}, ${users.lastName})`,
      pattern
    ),
    exists(
      db
        .select({ one: sql`1` })
        .from(storyTags)
        .innerJoin(tags, eq(storyTags.tagId, tags.id))
        .where(
          and(eq(storyTags.storyId, stories.id), ilike(tags.label, pattern))
        )
    )
  );
}

function publishedListWhere(query: StoryListQuery) {
  const filters: SQL[] = [eq(stories.status, "publish")];
  if (query.category) filters.push(eq(stories.category, query.category));

  const pattern = query.q ? likePattern(query.q) : undefined;
  if (pattern) {
    const search = publishedSearchCondition(pattern);
    if (search) filters.push(search);
  }

  return and(...filters);
}

async function countPublishedByCategory(): Promise<StoryCategoryCounts> {
  const counts = emptyStoryCounts();
  const rows = await db
    .select({
      category: stories.category,
      value: count(),
    })
    .from(stories)
    .where(eq(stories.status, "publish"))
    .groupBy(stories.category);

  for (const row of rows) {
    if (isBlogCategoryCountKey(row.category)) {
      counts[row.category] = Number(row.value);
    }
  }

  return counts;
}

async function allocateSlug(desired: string, exceptId?: string) {
  const taken: string[] = [];
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const candidate = uniqueSlug(desired, taken);
    const [row] = await db
      .select({ id: stories.id })
      .from(stories)
      .where(eq(stories.slug, candidate))
      .limit(1);

    if (!row || row.id === exceptId) return candidate;
    taken.push(candidate);
  }

  throw new HttpError(409, "Could not allocate a unique permalink.");
}

function tagEntries(raw: string | undefined) {
  const bySlug = new Map<string, string>();
  for (const label of parseTags(raw ?? "")) {
    const slug = slugify(label);
    if (!slug) continue;
    if (!bySlug.has(slug)) bySlug.set(slug, label);
  }
  return [...bySlug.entries()];
}

async function replaceStoryTags(storyId: string, rawTags: string | undefined) {
  await db.delete(storyTags).where(eq(storyTags.storyId, storyId));

  const entries = tagEntries(rawTags);
  if (entries.length === 0) return;

  const rows: { storyId: string; tagId: string }[] = [];
  for (const [slug, label] of entries) {
    const [tag] = await db
      .insert(tags)
      .values({ slug, label })
      .onConflictDoUpdate({
        target: tags.slug,
        set: { label },
      })
      .returning();

    if (!tag) continue;
    rows.push({ storyId, tagId: tag.id });
  }

  if (rows.length > 0) {
    await db.insert(storyTags).values(rows);
  }
}

function isUniqueSlugViolation(error: unknown) {
  if (!error || typeof error !== "object") return false;
  if ("code" in error && error.code === "23505") return true;
  const message =
    "message" in error && typeof error.message === "string" ? error.message : "";
  return message.includes("stories_slug") || message.includes("duplicate key");
}

const storyAuthorSelect = {
  story: stories,
  author: {
    id: users.id,
    firstName: users.firstName,
    lastName: users.lastName,
  },
} as const;

export async function listPublishedStories(
  query: StoryListQuery
): Promise<StoryListResponse> {
  const where = publishedListWhere(query);

  const [totalRow] = await db
    .select({ value: count() })
    .from(stories)
    .innerJoin(users, eq(stories.authorId, users.id))
    .where(where);

  const rows = await db
    .select(storyAuthorSelect)
    .from(stories)
    .innerJoin(users, eq(stories.authorId, users.id))
    .where(where)
    .orderBy(desc(stories.publishedAt), desc(stories.createdAt))
    .limit(query.limit)
    .offset(query.offset);

  return {
    stories: await mapRows(rows),
    total: Number(totalRow?.value ?? 0),
    counts: await countPublishedByCategory(),
  };
}

export async function listRelatedStories(slug: string, limit = 4) {
  const rows = await db
    .select(storyAuthorSelect)
    .from(stories)
    .innerJoin(users, eq(stories.authorId, users.id))
    .where(and(eq(stories.status, "publish"), ne(stories.slug, slug)))
    .orderBy(desc(stories.publishedAt), desc(stories.createdAt))
    .limit(limit);

  return mapRows(rows);
}

export async function listOwnStories(userId: string): Promise<BlogPost[]> {
  const rows = await db
    .select(storyAuthorSelect)
    .from(stories)
    .innerJoin(users, eq(stories.authorId, users.id))
    .where(eq(stories.authorId, userId))
    .orderBy(desc(stories.updatedAt))
    .limit(100);

  return mapRows(rows);
}

export async function getStoryBySlug(slug: string): Promise<BlogPost | undefined> {
  const [row] = await db
    .select(storyAuthorSelect)
    .from(stories)
    .innerJoin(users, eq(stories.authorId, users.id))
    .where(eq(stories.slug, slug))
    .limit(1);

  if (!row) return undefined;
  const [mapped] = await mapRows([row]);
  return mapped;
}

export async function getPublishedStoryBySlug(slug: string) {
  const story = await getStoryBySlug(slug);
  if (!story || story.status !== "publish") return undefined;
  return story;
}

export async function listPublishedStorySitemapRows() {
  return db
    .select({
      slug: stories.slug,
      updatedAt: stories.updatedAt,
    })
    .from(stories)
    .where(eq(stories.status, "publish"))
    .orderBy(desc(stories.publishedAt), desc(stories.updatedAt));
}

export async function getVisibleStoryBySlug(
  slug: string,
  viewer?: { userId?: string | null; role?: unknown }
) {
  const story = await getStoryBySlug(slug);
  if (!story) return undefined;
  if (story.status === "publish") return story;
  if (
    canManageContent({
      authorId: story.authorId,
      userId: viewer?.userId,
      role: viewer?.role,
    })
  ) {
    return story;
  }
  return undefined;
}

async function persistStory(
  writer: User,
  values: BlogPostValues,
  existing?: Story
) {
  await ensureAppUser(writer);

  const slug = await allocateSlug(values.slug, existing?.id);
  const excerpt = values.excerpt?.trim() || excerptFromContent(values.content);
  const featured = resolveFeaturedImage(writer.id, values, existing);
  const now = new Date();
  const publishedAt =
    values.status === "publish"
      ? (existing?.publishedAt ?? now)
      : existing?.publishedAt ?? null;

  const fields = {
    title: values.title,
    slug,
    excerpt,
    content: values.content,
    category: values.categoryId,
    status: values.status,
    featuredImageKey: featured.featuredImageKey,
    featuredImageUrl: featured.featuredImageUrl,
    publishedAt,
    updatedAt: now,
  };

  return { fields, slug };
}

export async function createStory(writer: User, values: BlogPostValues) {
  const { fields } = await persistStory(writer, values);
  let created: Story | undefined;

  try {
    const [row] = await db
      .insert(stories)
      .values({
        authorId: writer.id,
        ...fields,
      })
      .returning();
    created = row;
  } catch (error) {
    if (isUniqueSlugViolation(error)) {
      throw new HttpError(409, "That permalink is already in use.");
    }
    throw error;
  }

  if (!created) throw new HttpError(500, "Could not save this story.");

  try {
    await replaceStoryTags(created.id, values.tags);
  } catch (error) {
    await db.delete(stories).where(eq(stories.id, created.id));
    throw error;
  }

  revalidateStoryPaths(created.slug);
  const story = await getStoryBySlug(created.slug);
  if (!story) throw new HttpError(500, "Could not load the saved story.");
  return story;
}

export async function updateStory(
  writer: User,
  slug: string,
  values: BlogPostValues
) {
  const [existing] = await db
    .select()
    .from(stories)
    .where(eq(stories.slug, slug))
    .limit(1);

  if (!existing) throw new HttpError(404, "Story not found.");

  if (
    !canManageContent({
      authorId: existing.authorId,
      userId: writer.id,
      role: writer.publicMetadata.role,
    })
  ) {
    throw new HttpError(403, "You cannot edit this story.");
  }

  const { fields } = await persistStory(writer, values, existing);

  try {
    await db
      .update(stories)
      .set(fields)
      .where(eq(stories.id, existing.id));
  } catch (error) {
    if (isUniqueSlugViolation(error)) {
      throw new HttpError(409, "That permalink is already in use.");
    }
    throw error;
  }

  await replaceStoryTags(existing.id, values.tags);
  revalidateStoryPaths(fields.slug, existing.slug);

  const story = await getStoryBySlug(fields.slug);
  if (!story) throw new HttpError(500, "Could not load the saved story.");
  return story;
}

export async function deleteStory(writer: User, slug: string) {
  const [existing] = await db
    .select({
      id: stories.id,
      slug: stories.slug,
      authorId: stories.authorId,
    })
    .from(stories)
    .where(eq(stories.slug, slug))
    .limit(1);

  if (!existing) throw new HttpError(404, "Story not found.");

  if (
    !canManageContent({
      authorId: existing.authorId,
      userId: writer.id,
      role: writer.publicMetadata.role,
    })
  ) {
    throw new HttpError(403, "You cannot delete this story.");
  }

  await db.delete(stories).where(eq(stories.id, existing.id));
  revalidateStoryPaths(existing.slug);
}
