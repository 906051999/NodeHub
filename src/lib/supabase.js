import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_API_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function testSupabaseConnection() {
  console.log('开始测试 Supabase 连接...');
  console.log(`Supabase URL: ${supabaseUrl}`);
  
  try {
    console.log('尝试使用 Supabase 客户端查询 subscriptions 表...');
    const startTime = Date.now();
    const { data, error } = await supabase.from('subscriptions').select('count', { count: 'exact', head: true });
    const endTime = Date.now();
    
    if (error) {
      console.error('Supabase 查询出错:', error);
      throw error;
    }
    
    console.log('Supabase 查询成功');
    console.log(`查询耗时: ${endTime - startTime}ms`);
    console.log('查询结果:', data);
    
    return { 
      success: true, 
      data,
      responseTime: endTime - startTime,
      message: '连接成功并完成查询'
    };
  } catch (error) {
    console.error('Supabase 连接测试失败:', error);
    return { 
      success: false, 
      error: error.message,
      message: '连接失败或查询出错'
    };
  }
}
