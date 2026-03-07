import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token')

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    const { docs } = await payload.find({
      collection: 'newsletter',
      where: { unsubscribeToken: { equals: token } },
      limit: 1,
    })

    if (docs.length === 0) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 404 })
    }

    await payload.delete({
      collection: 'newsletter',
      id: docs[0].id,
    })

    return NextResponse.redirect(new URL('/?unsubscribed=1', req.url))
  } catch {
    return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 })
  }
}
