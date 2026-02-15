import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import type { Order } from '@/payload-types'

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()

    const order = await payload.create({
      collection: 'orders',
      data: body as Omit<Order, 'id' | 'updatedAt' | 'createdAt'>,
      draft: false,
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
