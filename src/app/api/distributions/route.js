import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { suffix, node_ids } = await request.json();

  const { data, error } = await supabase
    .from('custom_distributions')
    .insert({ suffix, node_ids })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data[0]);
}

export async function GET() {
  const { data, error } = await supabase
    .from('custom_distributions')
    .select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}
