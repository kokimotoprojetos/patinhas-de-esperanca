import { NextResponse } from 'next/server';
import { createLytronCharge } from '@/lib/lytron';

export async function POST(request: Request) {
  try {
    const { amount, name, cpf, email } = await request.json();

    if (!amount || !name || !cpf) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    const charge = await createLytronCharge({
      amount: Number(amount),
      description: `Doação Patinhas de Esperança - ${name}`,
      customer: {
        name,
        email: email || 'doador@patinhas.org',
        document: {
          type: 'cpf',
          number: cpf.replace(/\D/g, ''),
        },
      },
    });

    // Helper to find PIX data in nested response
    const findValue = (obj: any, keys: string[]): any => {
      if (!obj || typeof obj !== 'object') return null;
      for (const key of keys) {
        if (obj[key] && typeof obj[key] === 'string' && obj[key].length > 10) {
          return obj[key];
        }
      }
      const potentialPaths = ['data', 'attributes', 'charge', 'pix'];
      for (const path of potentialPaths) {
        if (obj[path] && obj[path] !== obj) {
          const result = findValue(obj[path], keys);
          if (result) return result;
        }
      }
      if (Array.isArray(obj.data) && obj.data.length > 0) {
        return findValue(obj.data[0], keys);
      }
      return null;
    };

    const qrcodeFields = ['qrcode', 'pix_code', 'pix_qr_code', 'pix_copy_paste', 'copyPaste', 'payload', 'qr_code', 'brcode', 'emv'];
    const copyPasteFields = ['copyPaste', 'pix_code', 'pix_copy_paste', 'qrcode', 'payload', 'brcode', 'emv'];

    const qrcode = findValue(charge, qrcodeFields);
    const copyPaste = findValue(charge, copyPasteFields);
    const id = charge.id || charge.txid || charge.data?.id;

    return NextResponse.json({
      success: true,
      id,
      qrcode,
      copyPaste,
    });
  } catch (error: any) {
    console.error('Lytron Checkout Error:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar doação' },
      { status: 500 }
    );
  }
}
