import { NextResponse } from 'next/server';

export function middleware(request) {
  const adminToken = request.cookies.get('admin_token');

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (adminToken?.value !== 'true') {
      // 重定向到首页，不添加查询参数
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
