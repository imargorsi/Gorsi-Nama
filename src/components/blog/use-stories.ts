"use client";

import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  storyDtoSchema,
  storyListResponseSchema,
  storyMineResponseSchema,
  type BlogPost,
  type BlogPostValues,
  type StoryListQuery,
} from "@/components/blog/blog.schemas";

export const storiesQueryKey = {
  all: ["stories"] as const,
  list: (filters: Pick<StoryListQuery, "category" | "q">) =>
    ["stories", "list", filters] as const,
  home: ["stories", "home"] as const,
  mine: ["stories", "mine"] as const,
  detail: (slug: string) => ["stories", "detail", slug] as const,
};

async function readError(response: Response) {
  try {
    const body: unknown = await response.json();
    if (body && typeof body === "object" && "error" in body) {
      const message = (body as { error: unknown }).error;
      if (typeof message === "string") return message;
    }
  } catch {
    // fall through
  }
  return "Something went wrong, try again.";
}

async function parseJson<T>(
  response: Response,
  parse: (data: unknown) => T,
  fallback: string
): Promise<T> {
  if (response.status === 204) throw new Error(fallback);
  if (!response.ok) throw new Error(await readError(response));
  return parse(await response.json());
}

function listSearchParams(
  query: Partial<StoryListQuery> & { limit?: number; offset?: number }
) {
  const params = new URLSearchParams();
  if (query.category) params.set("category", query.category);
  if (query.q) params.set("q", query.q);
  if (query.limit) params.set("limit", String(query.limit));
  if (query.offset) params.set("offset", String(query.offset));
  const encoded = params.toString();
  return encoded ? `?${encoded}` : "";
}

async function fetchStoryList(query: Partial<StoryListQuery> = {}) {
  return parseJson(
    await fetch(`/api/stories${listSearchParams(query)}`, {
      credentials: "same-origin",
    }),
    (data) => storyListResponseSchema.parse(data),
    "Could not load stories."
  );
}

async function fetchMyStories() {
  return parseJson(
    await fetch("/api/stories/mine", { credentials: "same-origin" }),
    (data) => storyMineResponseSchema.parse(data),
    "Could not load your stories."
  );
}

async function fetchStory(slug: string) {
  return parseJson(
    await fetch(`/api/stories/${encodeURIComponent(slug)}`, {
      credentials: "same-origin",
    }),
    (data) => storyDtoSchema.parse(data),
    "Could not load this story."
  );
}

async function createStory(values: BlogPostValues) {
  return parseJson(
    await fetch("/api/stories", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }),
    (data) => storyDtoSchema.parse(data),
    "Could not save this story."
  );
}

async function updateStory({
  slug,
  values,
}: {
  slug: string;
  values: BlogPostValues;
}) {
  return parseJson(
    await fetch(`/api/stories/${encodeURIComponent(slug)}`, {
      method: "PATCH",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }),
    (data) => storyDtoSchema.parse(data),
    "Could not save this story."
  );
}

async function deleteStory(slug: string) {
  const response = await fetch(`/api/stories/${encodeURIComponent(slug)}`, {
    method: "DELETE",
    credentials: "same-origin",
  });
  if (!response.ok) throw new Error(await readError(response));
}

function setStoryCaches(
  queryClient: ReturnType<typeof useQueryClient>,
  story: BlogPost,
  previousSlug?: string
) {
  queryClient.setQueryData(storiesQueryKey.detail(story.slug), story);
  if (previousSlug && previousSlug !== story.slug) {
    queryClient.removeQueries({ queryKey: storiesQueryKey.detail(previousSlug) });
  }
  void queryClient.invalidateQueries({ queryKey: storiesQueryKey.all });
}

const listPageSize = 24;

export function usePublishedStories(
  filters: Pick<StoryListQuery, "category" | "q">,
  enabled = true
) {
  return useInfiniteQuery({
    queryKey: storiesQueryKey.list(filters),
    queryFn: ({ pageParam }) =>
      fetchStoryList({
        ...filters,
        limit: listPageSize,
        offset: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const loaded = pages.reduce((total, page) => total + page.stories.length, 0);
      return loaded < lastPage.total ? loaded : undefined;
    },
    enabled,
    placeholderData: keepPreviousData,
  });
}

export function useHomeStories() {
  return useQuery({
    queryKey: storiesQueryKey.home,
    queryFn: () => fetchStoryList({ limit: 3, offset: 0 }),
  });
}

export function useMyStories(enabled = true) {
  return useQuery({
    queryKey: storiesQueryKey.mine,
    queryFn: fetchMyStories,
    enabled,
  });
}

export function useStory(slug: string, enabled = true) {
  return useQuery({
    queryKey: storiesQueryKey.detail(slug),
    queryFn: () => fetchStory(slug),
    enabled: enabled && Boolean(slug),
  });
}

export function useCreateStory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStory,
    onSuccess: (story) => {
      setStoryCaches(queryClient, story);
    },
  });
}

export function useUpdateStory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStory,
    onSuccess: (story, { slug }) => {
      setStoryCaches(queryClient, story, slug);
    },
  });
}

export function useDeleteStory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStory,
    onSuccess: (_data, slug) => {
      queryClient.removeQueries({ queryKey: storiesQueryKey.detail(slug) });
      void queryClient.invalidateQueries({ queryKey: storiesQueryKey.all });
    },
  });
}
