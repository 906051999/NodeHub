import { NextResponse } from 'next/server';

export function middleware(request) {
  const adminToken = request.cookies.get('admin_token');

  if (request.nextUrl.pathname.startsWith('/admin') && adminToken?.value !== 'true') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
