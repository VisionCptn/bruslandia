'use client'

import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { getRandomRotationClass } from '../utils/randomPosition'

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
    <div className="mt-4">
      {sizes.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Розмір:</label>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border transition-colors ${
                  selectedSize === size
                    ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                    : 'bg-white text-black border-gray-300 hover:border-[#1a1a1a]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={handleAddToCart}
        className={`bg-[#1a1a1a] text-white px-12 py-4 text-xl lowercase ${getRandomRotationClass()} transition-transform active:scale-95`}
      >
        додати в корзину
      </button>
    </div>
  )
}
