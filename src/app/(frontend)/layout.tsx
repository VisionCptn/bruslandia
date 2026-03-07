import React from 'react'
import Script from 'next/script'
import './globals.css'
import './styles.css'
import { cn } from '@/lib/utils'
import { Geologica } from 'next/font/google'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

export const metadata = {
  description: 'bryslandia.com',
  title: {
    default: 'brys - bryslandia.com',
    template: '%s - bryslandia.com',
  },
}

const fontSans = Geologica({
  subsets: ['latin', 'cyrillic'],
  weight: ['200', '300', '400', '700'],
  variable: '--font-sans',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-TCFEPQRSRD" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-TCFEPQRSRD');
        `}</Script>
        <AuthProvider>
          <CartProvider>
            <main>{children}</main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
