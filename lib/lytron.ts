import crypto from 'crypto';

/**
 * Generates the Transaction-Hash required by Lytron Pay.
 * @param body The raw string body of the request.
 * @param secret The secret hash provided by Lytron Pay.
 */
export function generateLytronHash(body: string, secret: string): string {
  return crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
}

export async function createLytronCharge(data: {
  amount: number;
  description: string;
  customer: {
    name: string;
    email: string;
    document: {
      type: 'cpf' | 'cnpj';
      number: string;
    };
  };
}) {
  const apiKey = process.env.LYTRON_API_KEY;
  const secretHash = process.env.LYTRON_SECRET_HASH;

  if (!apiKey || !secretHash) {
    throw new Error('Lytron Pay credentials are not configured.');
  }

  const body = JSON.stringify(data);
  const hash = generateLytronHash(body, secretHash);

  const response = await fetch('https://api.lytronpay.com/api/v1/charges', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Access-Key': apiKey,
      'Transaction-Hash': hash,
    },
    body,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create Lytron Pay charge');
  }

  return response.json();
}

export async function getLytronCharge(id: string) {
  const apiKey = process.env.LYTRON_API_KEY;
  const secretHash = process.env.LYTRON_SECRET_HASH;

  if (!apiKey || !secretHash) {
    throw new Error('Lytron Pay credentials are not configured.');
  }

  const response = await fetch(`https://api.lytronpay.com/api/v1/charges/${id}`, {
    method: 'GET',
    headers: {
      'Api-Access-Key': apiKey,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch Lytron Pay charge');
  }

  return response.json();
}

