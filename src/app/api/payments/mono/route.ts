import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

const MONO_API_BASE = 'https://api.monobank.ua'

export async function POST(request: Request) {
  try {
    const { orderId, amount, orderNumber, customerEmail, items } = (await request.json()) as {
      orderId: number
      amount: number
      orderNumber: string
      customerEmail: string
      items?: { name: string; qty: number; sum: number; unit: string; code: string }[]
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

    const monoResponse = await fetch(`${MONO_API_BASE}/api/merchant/invoice/create`, {
      method: 'POST',
      headers: {
        'X-Token': process.env.MONO_PAY_TOKEN!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // UAH → kopiyky
        ccy: 980,
        merchantPaymInfo: {
          reference: orderNumber,
          comment: `Замовлення ${orderNumber}`,
          customerEmails: [customerEmail],
          ...(items?.length ? { basketOrder: items } : {}),
        },
        redirectUrl: `${baseUrl}/checkout/success`,
        failUrl: `${baseUrl}/checkout?payment=failed`,
        webHookUrl: `${baseUrl}/api/webhooks/mono`,
      }),
    })

    if (!monoResponse.ok) {
      const err = await monoResponse.text()
      console.error('Mono API error:', monoResponse.status, err)
      return NextResponse.json({ error: 'Payment provider error' }, { status: 502 })
    }

    const { pageUrl, invoiceId } = (await monoResponse.json()) as {
      pageUrl: string
      invoiceId: string
    }

    // Save invoice ID on the order so the webhook can look it up
    const payload = await getPayload({ config })
    await payload.update({
      collection: 'orders',
      id: orderId,
      data: { monoInvoiceId: invoiceId, paymentStatus: 'created' },
    })

    return NextResponse.json({ pageUrl })
  } catch (error) {
    console.error('Error creating mono invoice:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
