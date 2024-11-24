import {
  NextResponse,
  type MiddlewareConfig,
  type NextRequest,
} from 'next/server';
import { auth } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const session = await auth();
  const pathname = request.nextUrl.pathname;

  if (
    (pathname === '/login' ||
      pathname === '/api/auth/signin' ||
      pathname === '/api/auth/signout') &&
    session?.user
  ) {
    return NextResponse.redirect(new URL('/account', request.url));
  }

  if (pathname.startsWith('/account') && !session?.user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Don't let user to go to this route even if they're not logged in
  if (
    pathname.startsWith('/api/auth/') &&
    !pathname.startsWith('/api/auth/callback')
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ['/login', '/api/auth/:path*', '/account/:path*'],
};
