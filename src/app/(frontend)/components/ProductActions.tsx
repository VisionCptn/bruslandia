'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useCart } from '../context/CartContext'
import { getRandomRotationClass } from '../utils/randomPosition'
import type { UIStrings } from '../utils/getTranslations'

interface ProductActionsProps {
  productId: string
  title: string
  image: string
  price: number
  sizes?: string[]
  t: Pick<UIStrings, 'selectSize' | 'sizeLabel' | 'addToCart'>
}

export const ProductActions = ({
  productId,
  title,
  image,
  price,
  sizes,
  t,
}: ProductActionsProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [showSizeChart, setShowSizeChart] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    if (sizes && sizes.length > 0 && !selectedSize) {
      alert(t.selectSize)
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
          <p className="font-medium mb-3 lowercase">{t.sizeLabel}</p>
          <div className="flex gap-4 flex-wrap">
            {sizes.map((size, index) => {
              const isSelected = selectedSize === size
              const isEven = index % 2 === 0

              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`
                    relative w-24 max-w-none! h-12 flex items-center justify-center transition-all duration-200
                    ${isSelected ? 'border-2 border-black' : 'border border-gray-300'}
                    ${getRandomRotationClass()}
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
          <button
            className="text-sm text-gray-600 mt-4 block lowercase underline cursor-pointer"
            onClick={() => setShowSizeChart(true)}
          >
            таблиця розмірів
          </button>
        </div>
      )}

      <Dialog open={showSizeChart} onOpenChange={setShowSizeChart}>
        <DialogContent className="p-0 max-w-fit">
          <DialogTitle className="sr-only">таблиця розмірів</DialogTitle>
          <Image
            src="/size_chart.png"
            alt="таблиця розмірів"
            width={800}
            height={600}
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </DialogContent>
      </Dialog>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        className={`mt-4 bg-[#1a1a1a] text-white px-12 py-4 text-xl lowercase ${getRandomRotationClass()} transition-transform active:scale-95`}
      >
        {t.addToCart}
      </button>
    </>
  )
}
