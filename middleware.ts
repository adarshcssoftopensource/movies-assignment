import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/login") {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/login", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
