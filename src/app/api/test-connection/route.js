import { testSupabaseConnection } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  console.log('开始测试 Supabase 连接...');
  const startTime = Date.now();
  
  const results = await testSupabaseConnection();
  
  const responseTime = Date.now() - startTime;

  console.log('测试结果:', JSON.stringify(results, null, 2));

  return NextResponse.json({
    status: 'completed',
    message: '测试完成',
    responseTime,
    results,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_API_URL,
  });
}
