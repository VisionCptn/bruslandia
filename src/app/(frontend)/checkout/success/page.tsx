'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useCart } from '../../context/CartContext'

export default function CheckoutSuccessPage() {
  const { items } = useCart()

  // Clear cart on success page load (backup in case CheckoutForm didn't clear it)
  useEffect(() => {
    if (items.length > 0) {
      localStorage.removeItem('brys-cart')
      window.location.reload()
    }
  }, [items.length])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md">
        <h1 className="text-2xl font-medium lowercase mb-4">дякуємо за замовлення!</h1>
        <p className="text-gray-600 mb-8 lowercase">
          ми отримали ваше замовлення і зв&apos;яжемося з вами найближчим часом для підтвердження.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#1a1a1a] text-white py-3 px-8 lowercase hover:bg-black transition-colors"
        >
          повернутися на головну
        </Link>
      </div>
    </div>
  )
}
