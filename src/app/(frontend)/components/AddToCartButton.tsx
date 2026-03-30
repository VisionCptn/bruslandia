'use client'

import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { getRandomRotationClass } from '../utils/randomPosition'
import type { UIStrings } from '../utils/getTranslations'

interface AddToCartButtonProps {
  productId: string
  title: string
  image: string
  price: number
  sizes: string[]
  t: Pick<UIStrings, 'selectSize' | 'sizeLabel' | 'addToCart'>
}

export const AddToCartButton = ({
  productId,
  title,
  image,
  price,
  sizes,
  t,
}: AddToCartButtonProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const { items, addItem, openCart } = useCart()

  const inCart = items.some((item) => item.productId === productId)

  const handleClick = () => {
    if (inCart) {
      openCart()
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
          <label className="block text-sm font-medium mb-2">{t.sizeLabel}</label>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                className="px-4 py-2 border border-gray-300 hover:border-[#1a1a1a] transition-colors"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={handleClick}
        className={`relative overflow-hidden bg-[#1a1a1a] text-white px-12 py-4 text-xl lowercase ${getRandomRotationClass()} transition-transform active:scale-95`}
      >
        <span
          className={`block transition-all duration-300 ${inCart ? '-translate-y-full opacity-0 absolute inset-0 flex items-center justify-center' : 'translate-y-0 opacity-100'}`}
        >
          {t.addToCart}
        </span>
        <span
          className={`block transition-all duration-300 ${inCart ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 absolute inset-0 flex items-center justify-center'}`}
        >
          {'в корзині'}
        </span>
      </button>
    </div>
  )
}
