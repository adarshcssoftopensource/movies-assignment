import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware() {
  try {
    // Your middleware logic
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.error();
  }
}



// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
}