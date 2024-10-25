import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function GET() {
  try {
    const { data: subscriptions, error } = await supabase
      .from('subscriptions')
      .select('*');

    if (error) {
      throw error;
    }

    for (const subscription of subscriptions) {
      try {
        const response = await fetch(subscription.url);
        const subscriptionData = await response.text();
        
        // 这里需要根据实际的订阅链接返回格式来解析数据
        // 以下仅为示例
        const remainingTraffic = parseRemainingTraffic(subscriptionData);
        const expirationDate = parseExpirationDate(subscriptionData);

        await supabase
          .from('subscriptions')
          .update({
            remaining_traffic: remainingTraffic,
            expiration_date: expirationDate,
            updated_at: new Date().toISOString()
          })
          .eq('id', subscription.id);

      } catch (err) {
        console.error(`Error updating subscription ${subscription.id}:`, err);
      }
    }

    return NextResponse.json({ message: 'Subscriptions updated successfully' });
  } catch (err) {
    console.error('Error updating subscriptions:', err);
    return NextResponse.json({ error: 'Failed to update subscriptions' }, { status: 500 });
  }
}

function parseRemainingTraffic(subscriptionData) {
  // 实现解析剩余流量的逻辑
  return 0; // 临时返回值
}

function parseExpirationDate(subscriptionData) {
  // 实现解析有效期的逻辑
  return new Date().toISOString(); // 临时返回值
}
