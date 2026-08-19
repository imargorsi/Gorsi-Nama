import { handleRoute } from "@/lib/http";
import { requireCurrentUser } from "@/lib/require-user";
import { listOwnStories } from "@/lib/stories/queries";

export async function GET() {
  return handleRoute(async () => {
    const user = await requireCurrentUser();
    const stories = await listOwnStories(user.id);
    return Response.json({ stories });
  }, "Could not load your stories.");
}
