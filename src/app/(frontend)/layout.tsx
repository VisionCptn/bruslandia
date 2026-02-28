import React from 'react'
import './globals.css'
import './styles.css'
import { cn } from '@/lib/utils'
import { Inter as FontSans } from 'next/font/google'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <AuthProvider>
          <CartProvider>
            <main>{children}</main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
