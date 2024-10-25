import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function POST(request, { params }) {
  const { id } = params;

  try {
    const { data: subscription, error: fetchError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    const response = await fetch(subscription.url);
    const subscriptionData = await response.text();
    
    const { remainingTraffic, expirationDate } = parseSubscriptionData(subscriptionData);

    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({
        remaining_traffic: remainingTraffic,
        expiration_date: expirationDate,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({ message: 'Subscription updated successfully' });
  } catch (err) {
    console.error('Error updating subscription:', err);
    return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 });
  }
}

function parseSubscriptionData(subscriptionData) {
  // 这里我们需要根据实际的订阅链接返回格式来解析数据
  // 以下是一个示例实现，你需要根据实际情况进行调整

  let remainingTraffic = 0;
  let expirationDate = null;

  // 假设数据是以行分隔的
  const lines = subscriptionData.split('\n');

  for (const line of lines) {
    if (line.includes('upload=') && line.includes('download=')) {
      // 解析剩余流量
      const match = line.match(/upload=(\d+)&download=(\d+)/);
      if (match) {
        const upload = parseInt(match[1]);
        const download = parseInt(match[2]);
        remainingTraffic = upload + download;
      }
    } else if (line.includes('expire=')) {
      // 解析有效期
      const match = line.match(/expire=(\d+)/);
      if (match) {
        expirationDate = new Date(parseInt(match[1]) * 1000).toISOString();
      }
    }
  }

  return { remainingTraffic, expirationDate };
}
