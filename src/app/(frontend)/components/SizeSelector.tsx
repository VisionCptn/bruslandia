'use client'

import { useState } from 'react'

interface SizeSelectorProps {
  sizes: string[]
}

export const SizeSelector = ({ sizes }: SizeSelectorProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  return (
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
                /* Only border color changes on selection */
                ${isSelected ? 'border-black' : 'border-gray-300'}
                /* Alternating button rotation based on index */
                ${isEven ? 'rotate-3' : 'rotate-2'}
              `}
            >
              <span
                className={`
                transition-transform duration-200
                /* Text offset: moves opposite to the button rotation for a "hand-stamped" feel */
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
  )
}
