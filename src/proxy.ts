import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const handleI18nRouting = createIntlMiddleware(routing);

// English is the default locale with no URL prefix (localePrefix: "as-needed"),
// so /profile and /ur/profile both need protecting.
const isProtectedRoute = createRouteMatcher(["/profile(.*)", "/ur/profile(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // API routes (e.g. the Clerk webhook) are not locale-prefixed — skip
  // i18n routing so external callers always hit a stable, unredirected URL.
  if (req.nextUrl.pathname.startsWith("/api")) {
    return;
  }

  return handleI18nRouting(req);
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
