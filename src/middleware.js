import { NextResponse } from 'next/server';

export function middleware(request) {
  const adminToken = request.cookies.get('admin_token');

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (adminToken?.value !== 'true') {
      // 重定向到首页，并添加一个查询参数来触发登录模态框
      return NextResponse.redirect(new URL('/?login=true', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
