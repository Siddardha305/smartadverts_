import { NextRequest, NextResponse } from 'next/server';

/**
 * Edge-level route protection middleware for Workspace Dashboard.
 * Redirects unauthenticated users to /login before dashboard page code runs.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get('session');

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!session?.value) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('from', pathname); // Preserve intended destination
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Only run middleware on dashboard routes
  matcher: ['/dashboard/:path*'],
};
