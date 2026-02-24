import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { buildOrderConfirmationEmail } from '@/email/orderConfirmation'

type MonoPaymentStatus =
  | 'created'
  | 'processing'
  | 'hold'
  | 'success'
  | 'failure'
  | 'reversed'
  | 'expired'
  | 'cancel'

type MonoWebhookPayload = {
  invoiceId: string
  status: MonoPaymentStatus
  amount: number
  ccy: number
  finalAmount?: number
  reference?: string
  modifiedDate: number
  paymentInfo?: {
    maskedPan?: string
    approvalCode?: string
    rrn?: string
    paymentSystem?: string
    bank?: string
    tranId?: string
  }
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as MonoWebhookPayload
    const payload = await getPayload({ config })

    // Find the order by its Monobank invoice ID
    const result = await payload.find({
      collection: 'orders',
      where: { monoInvoiceId: { equals: data.invoiceId } },
      limit: 1,
    })

    if (result.docs.length === 0) {
      return NextResponse.json({ ok: true })
    }

    const order = result.docs[0]

    // Update paymentStatus (and promote order status on success)
    await payload.update({
      collection: 'orders',
      id: order.id,
      data: {
        paymentStatus: data.status,
        ...(data.status === 'success' ? { status: 'processing' } : {}),
      },
    })

    // Fetch receipt from Mono and save to order on success
    if (data.status === 'success') {
      try {
        console.log('receipt request')
        const MONO_API_BASE = 'https://api.monobank.ua'
        const receiptUrl = new URL(`${MONO_API_BASE}/api/merchant/invoice/receipt`)
        receiptUrl.searchParams.set('invoiceId', data.invoiceId)
        receiptUrl.searchParams.set('email', order.customerEmail)

        const receiptRes = await fetch(receiptUrl.toString(), {
          headers: { 'X-Token': process.env.MONO_PAY_TOKEN! },
        })

        let receipt: unknown = null
        if (receiptRes.ok) {
          receipt = await receiptRes.json()
          await payload.update({
            collection: 'orders',
            id: order.id,
            data: { receipt: receipt as Record<string, unknown> },
          })
        }
      } catch (receiptErr) {
        payload.logger.error({ err: receiptErr }, 'Failed to fetch Mono receipt')
        console.log('receipt request error')
      }

      try {
        await payload.sendEmail({
          to: order.customerEmail,
          subject: `замовлення ${order.orderNumber} підтверджено`,
          html: buildOrderConfirmationEmail({
            orderNumber: order.orderNumber,
            customerEmail: order.customerEmail,
            items: (order.items ?? []) as Parameters<
              typeof buildOrderConfirmationEmail
            >[0]['items'],
            shippingAddress: order.shippingAddress ?? {},
            total: order.total,
          }),
        })
      } catch (emailErr) {
        payload.logger.error({ err: emailErr }, 'Failed to send order confirmation email')
      }
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Mono webhook error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
