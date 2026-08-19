import type { NextRequest } from "next/server";
import { blogPostSchema, storyListQuerySchema } from "@/components/blog/blog.schemas";
import { handleRoute, HttpError, readRequestJson } from "@/lib/http";
import { requireCurrentUser } from "@/lib/require-user";
import { createStory, listPublishedStories } from "@/lib/stories/queries";

export async function GET(request: NextRequest) {
  return handleRoute(async () => {
    const raw = Object.fromEntries(request.nextUrl.searchParams);
    if (!raw.category) delete raw.category;
    if (!raw.q) delete raw.q;

    const parsed = storyListQuerySchema.safeParse(raw);
    if (!parsed.success) {
      throw new HttpError(400, "Invalid query");
    }

    const result = await listPublishedStories(parsed.data);
    return Response.json(result);
  }, "Could not load stories.");
}

export async function POST(request: Request) {
  return handleRoute(async () => {
    const user = await requireCurrentUser();
    const parsed = blogPostSchema.safeParse(await readRequestJson(request));
    if (!parsed.success) {
      throw new HttpError(400, "Validation failed");
    }

    const story = await createStory(user, parsed.data);
    return Response.json(story, { status: 201 });
  }, "Could not save this story.");
}
