import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await client.create(body);

    return NextResponse.json({ message: 'Order created successfully', result }, { status: 200 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
console.log('Using dataset:', client.config().dataset);
console.log('Token is set:', !!process.env.SANITY_API_TOKEN);

