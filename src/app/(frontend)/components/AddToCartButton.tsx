'use client'

import { useState } from 'react'
import { useCart } from '../context/CartContext'

interface AddToCartButtonProps {
  productId: string
  title: string
  image: string
  price: number
  sizes: string[]
}

export const AddToCartButton = ({
  productId,
  title,
  image,
  price,
  sizes,
}: AddToCartButtonProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    if (!selectedSize && sizes.length > 0) {
      alert('Будь ласка, оберіть розмір')
      return
    }

    addItem({
      productId,
      title,
      image,
      price,
      size: selectedSize || 'one size',
    })
  }

  return (
    <button
      onClick={handleAddToCart}
      className="mt-4 bg-[#1a1a1a] text-white px-12 py-4 text-xl lowercase -rotate-2 transition-transform active:scale-95"
    >
      додати в корзину
    </button>
  )
}
