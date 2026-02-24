'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import type { UIStrings } from '../../utils/getTranslations'

interface SuccessViewProps {
  t: UIStrings
}

export const SuccessView = ({ t }: SuccessViewProps) => {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md">
        <h1 className="text-2xl font-medium lowercase mb-4">{t.orderSuccessTitle}</h1>
        <p className="text-gray-600 mb-8 lowercase">{t.orderSuccessMessage}</p>
        <Link
          href="/"
          className="inline-block bg-[#1a1a1a] !text-white py-3 px-8 lowercase hover:bg-black transition-colors"
        >
          {t.backToHome}
        </Link>
      </div>
    </div>
  )
}
