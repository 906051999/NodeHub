import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { createSubscriptionParser } from '@/lib/subscriptionParserFactory';

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
        
        const parser = createSubscriptionParser(subscriptionData);
        const { remainingTraffic, expirationDate, nodeCount } = parser.parse();

        await supabase
          .from('subscriptions')
          .update({
            remaining_traffic: remainingTraffic,
            expiration_date: expirationDate,
            node_count: nodeCount,
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
