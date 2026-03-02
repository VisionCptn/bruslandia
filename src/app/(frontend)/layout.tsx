import React from 'react'
import './globals.css'
import './styles.css'
import { cn } from '@/lib/utils'
import { Inter as FontSans } from 'next/font/google'
import { CartProvider } from './context/CartContext'
import { Geologica } from 'next/font/google'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

const geologica = Geologica({
  weight: ['300', '400'],
  subsets: ['latin', 'cyrillic'],
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={geologica.className}>
      <body className={cn('min-h-screen bg-background antialiased')}>
        <CartProvider>
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  )
}
