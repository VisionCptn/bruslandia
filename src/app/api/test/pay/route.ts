/**
 * DEV-ONLY: Simulates a successful Mono webhook for a given invoiceId.
 * Use this to test payment status updates locally without ngrok.
 *
 * POST /api/test/pay
 * Body: { "invoiceId": "..." }
 */

import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }

  const { invoiceId } = (await request.json()) as { invoiceId?: string }

  if (!invoiceId) {
    return NextResponse.json({ error: 'invoiceId is required' }, { status: 400 })
  }

  // Forward to the real webhook handler as if Mono called it
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

  const res = await fetch(`${baseUrl}/api/webhooks/mono`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      invoiceId,
      status: 'success',
      amount: 0,
      ccy: 980,
      modifiedDate: Math.floor(Date.now() / 1000),
      paymentInfo: {
        maskedPan: '444403******1902',
        paymentSystem: 'Visa',
        approvalCode: 'TEST01',
      },
    }),
  })

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
