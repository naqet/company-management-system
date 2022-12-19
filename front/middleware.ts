// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import isAuthValid from "./lib/auth/isAuthValid";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const isValid = await isAuthValid(request);
  // If any of auth paths, we redirect to dashboard
  if (
    request.nextUrl.pathname.startsWith("/signin") ||
    request.nextUrl.pathname.startsWith("/remindPassword") ||
    request.nextUrl.pathname.startsWith("/signup")
  ) {
    if (isValid) {
      const homePage = new URL("/", request.url);
      return NextResponse.redirect(homePage);
    }
    return NextResponse.next();
  }

  // If cookie is invalid
  if (!isValid) {
    const signInUrl = new URL("/signin", request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
