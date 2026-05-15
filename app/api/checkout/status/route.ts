import { NextResponse } from 'next/server';
import { getLytronCharge } from '@/lib/lytron';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID não informado' }, { status: 400 });
  }

  try {
    const charge = await getLytronCharge(id);
    
    // Check if status is paid. Lytron usually uses 'paid', 'approved', or 'active'.
    // We'll check for common success indicators.
    const isPaid = charge.status === 'PAID' || charge.status === 'APPROVED' || charge.paid === true;

    return NextResponse.json({
      success: true,
      status: charge.status,
      paid: isPaid,
    });
  } catch (error: any) {
    console.error('Status Check Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
