// /app/api/saveOrder/route.ts
import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(req: Request) {
  try {
    const orderData = await req.json();
    const result = await client.create(orderData);

    return NextResponse.json({ success: true, result });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: false, error: 'Unknown error occurred' }, { status: 500 });
  }
}
