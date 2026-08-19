import { blogPostSchema } from "@/components/blog/blog.schemas";
import { handleRoute, HttpError, readRequestJson } from "@/lib/http";
import { getCurrentUser, requireCurrentUser } from "@/lib/require-user";
import {
  deleteStory,
  getVisibleStoryBySlug,
  updateStory,
} from "@/lib/stories/queries";

export async function GET(
  _request: Request,
  ctx: RouteContext<"/api/stories/[slug]">
) {
  return handleRoute(async () => {
    const { slug } = await ctx.params;
    const user = await getCurrentUser();
    const story = await getVisibleStoryBySlug(slug, {
      userId: user?.id,
      role: user?.publicMetadata.role,
    });

    if (!story) throw new HttpError(404, "Story not found.");
    return Response.json(story);
  }, "Could not load this story.");
}

export async function PATCH(
  request: Request,
  ctx: RouteContext<"/api/stories/[slug]">
) {
  return handleRoute(async () => {
    const { slug } = await ctx.params;
    const user = await requireCurrentUser();
    const parsed = blogPostSchema.safeParse(await readRequestJson(request));
    if (!parsed.success) {
      throw new HttpError(400, "Validation failed");
    }

    const story = await updateStory(user, slug, parsed.data);
    return Response.json(story);
  }, "Could not save this story.");
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/stories/[slug]">
) {
  return handleRoute(async () => {
    const { slug } = await ctx.params;
    const user = await requireCurrentUser();
    await deleteStory(user, slug);
    return new Response(null, { status: 204 });
  }, "Could not delete this story.");
}
