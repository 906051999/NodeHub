import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  const { username, password } = await request.json();

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    cookies().set('admin_token', 'true', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, error: '用户名或密码错误' }, { status: 401 });
  }
}
