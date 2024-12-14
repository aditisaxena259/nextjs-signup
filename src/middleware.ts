import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public (unprotected) routes
  const isPublicPath = path === '/login' || path === '/signup';

  // Get token from cookies
  const token = request.cookies.get('token')?.value || '';

  // Redirect authenticated users away from public routes
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // Redirect unauthenticated users away from protected routes
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // Allow access to the requested route
  return NextResponse.next();
}

// Config: Match all relevant routes for middleware
export const config = {
  matcher: ['/', '/profile', '/login', '/signup'], // Add more paths as needed
};
