import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Protected routes matcher
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/forum(.*)"]);

// Main middleware function
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

// Configuration for path matching
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Add public routes that need to be handled by Clerk
    "/((?!.*\\..*|_next).*)",
    "/",
  ],
};
