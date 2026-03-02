import React from 'react'
import './globals.css'
import './styles.css'
import { cn } from '@/lib/utils'
import { Inter as FontSans } from 'next/font/google'
import { CartProvider } from './context/CartContext'
import { Geologica } from "next/font/google";

const geologica = Geologica({
  subsets: ["latin"],
  variable: "--font-geologica",
  weight: ["200","300","400"],
});

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geologica:wght,CRSV@100..900,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('min-h-screen bg-background antialiased', geologica.variable)}>
        <CartProvider>
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  )
}
