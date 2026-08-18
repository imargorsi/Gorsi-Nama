import { auth, currentUser } from "@clerk/nextjs/server";
import { canManageArchive } from "@/lib/roles";
import {
  createImageUploadUrl,
  isR2Configured,
  missingR2EnvKeys,
  objectKeyForUpload,
} from "@/lib/storage/r2";
import { createUploadSchema } from "@/lib/storage/upload.schemas";

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return jsonError("Unauthorized", 401);

  if (!isR2Configured()) {
    console.error(
      "Cloudflare R2 is not configured. Missing:",
      missingR2EnvKeys().join(", ")
    );
    return jsonError("Image storage is not configured.", 503);
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return jsonError("Invalid JSON", 400);
  }

  const parsed = createUploadSchema.safeParse(json);
  if (!parsed.success) {
    return jsonError("That file cannot be uploaded.", 400);
  }

  const { contentType, folder } = parsed.data;

  if (folder === "library") {
    const user = await currentUser();
    if (!canManageArchive(user?.publicMetadata.role)) {
      return jsonError("Forbidden", 403);
    }
  }

  const key = objectKeyForUpload({ folder, userId, contentType });

  try {
    const payload = await createImageUploadUrl({ key, contentType });
    return Response.json(payload);
  } catch {
    return jsonError("Could not start the upload.", 500);
  }
}
