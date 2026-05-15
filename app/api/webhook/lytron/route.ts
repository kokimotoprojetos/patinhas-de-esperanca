import { NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/lib/telegram';

export async function POST(request: Request) {
  try {
    const body = await request.json();


    // Lytron usually sends an event like 'charge.paid' or similar
    // Check for payment confirmation
    if (body.status === 'PAID' || body.event === 'charge.paid') {
      const amount = body.amount || body.data?.amount;
      const name = body.customer?.name || body.data?.customer?.name || 'Doador Anônimo';
      
      const message = `✅ <b>Nova Doação Recebida!</b>\n\n` +
                      `👤 <b>Doador:</b> ${name}\n` +
                      `💰 <b>Valor:</b> R$ ${amount}\n` +
                      `🐾 <i>Obrigado por ajudar as Patinhas de Esperança!</i>`;
      
      await sendTelegramMessage(message);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
