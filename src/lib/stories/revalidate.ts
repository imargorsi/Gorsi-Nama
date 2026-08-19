import "server-only";

import { revalidatePath } from "next/cache";

export function revalidateStoryPaths(slug: string, previousSlug?: string) {
  const paths = ["/", "/blog", `/blog/${slug}`, "/profile"];
  if (previousSlug && previousSlug !== slug) {
    paths.push(`/blog/${previousSlug}`);
  }

  for (const path of paths) {
    revalidatePath(path);
    revalidatePath(path === "/" ? "/ur" : `/ur${path}`);
  }
}
