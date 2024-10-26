import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { createSubscriptionParser } from '@/lib/subscriptionParserFactory';

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
    
    const parser = createSubscriptionParser(subscriptionData);
    const { remainingTraffic, expirationDate, nodeCount } = parser.parse();

    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({
        remaining_traffic: remainingTraffic,
        expiration_date: expirationDate,
        node_count: nodeCount,
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
