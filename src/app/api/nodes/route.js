import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { subscription_id, name, type, server, port, password } = await request.json();

  const { data, error } = await supabase
    .from('nodes')
    .insert({ subscription_id, name, type, server, port, password })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data[0]);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const subscription_id = searchParams.get('subscription_id');

  let query = supabase.from('nodes').select('*');
  if (subscription_id) {
    query = query.eq('subscription_id', subscription_id);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}
