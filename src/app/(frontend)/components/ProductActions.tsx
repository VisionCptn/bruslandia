'use client'

import { useState } from 'react'
import { useCart } from '../context/CartContext'

interface ProductActionsProps {
  productId: string
  title: string
  image: string
  price: number
  sizes?: string[]
}

export const ProductActions = ({ productId, title, image, price, sizes }: ProductActionsProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    if (sizes && sizes.length > 0 && !selectedSize) {
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
    <>
      {/* Sizes */}
      {sizes && sizes.length > 0 && (
        <div className="mb-6">
          <p className="font-medium mb-3 lowercase">розмір</p>
          <div className="flex gap-4 flex-wrap">
            {sizes.map((size, index) => {
              const isSelected = selectedSize === size
              const isEven = index % 2 === 0

              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`
                    relative w-24 h-12 flex items-center justify-center ml-3 border-2 transition-all duration-200
                    ${isSelected ? 'border-black' : 'border-gray-300'}
                    ${isEven ? 'rotate-3' : 'rotate-2'}
                  `}
                >
                  <span
                    className={`
                      transition-transform duration-200
                      ${isEven ? 'translate-x-1 -translate-y-0.5' : '-translate-x-1 translate-y-0.5'}
                    `}
                  >
                    {size.toLocaleUpperCase()}
                  </span>
                </button>
              )
            })}
          </div>
          <button className="text-sm text-gray-600 mt-4 block lowercase">таблиця розмірів</button>
        </div>
      )}

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-[#1a1a1a] text-white px-12 py-4 text-xl lowercase -rotate-2 transition-transform active:scale-95"
      >
        додати в корзину
      </button>
    </>
  )
}
