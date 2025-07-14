import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 测试数据库连接函数
export async function testSupabaseConnection() {
  try {
    // 假设有一个名为 'test' 的表
    const { data, error } = await supabase.from('articles').select('*')
    if (error) {
      console.error('Supabase 连接失败:', error.message);
    } else {
      console.log('Supabase 连接成功，数据示例:', data);
    }
  } catch (err) {
    console.error('Supabase 连接异常:', err);
  }
} 