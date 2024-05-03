import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/", "/:path*"]);

const isPublicRoute = createRouteMatcher([
  "/sign-in/(.*)",
  "/sign-in",
  "/sign-up/(.*)",
  "/sign-up",
  "/api/:path*",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req) && !isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
