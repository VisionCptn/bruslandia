'use client'

import Image from 'next/image'
import { TrashIcon } from './icons'
import { formatPrice } from '../utils/formatPrice'
import type { CartItem } from '../context/CartContext'

interface CartPageItemProps {
  item: CartItem
  onUpdateQuantity: (id: string, delta: number) => void
  onRemove: (id: string) => void
}

export const CartPageItem = ({ item, onUpdateQuantity, onRemove }: CartPageItemProps) => {
  return (
    <div className="flex gap-8 pb-12 border-b border-gray-200 last:border-0">
      {/* Square image */}
      <div className="w-24 h-24 md:w-52 md:h-52 relative bg-gray-100 flex-shrink-0">
        <Image src={item.image} alt={item.title} fill className="object-cover" />
      </div>

      <div className="flex-1 flex flex-col justify-between py-2">
        {/* Title + size */}
        <div>
          <h3 className="text-base md:text-xl font-normal mb-3">{item.title}</h3>
          {item.size && (
            <p className="text-sm md:text-base text-gray-500">
              Розмір: {item.size.toUpperCase()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {/* Quantity row */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onUpdateQuantity(item.id, -1)}
              className="w-10 h-10 flex items-center justify-center bg-transparent border-none cursor-pointer text-2xl"
              aria-label="Зменшити кількість"
            >
              −
            </button>
            <span className="text-base md:text-xl w-6 text-center">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, 1)}
              className="w-10 h-10 flex items-center justify-center bg-transparent border-none cursor-pointer text-2xl"
              aria-label="Збільшити кількість"
            >
              +
            </button>
          </div>

          {/* Price + Trash row */}
          <div className="flex items-center gap-6">
            <span className="text-base md:text-xl font-normal">{formatPrice(item.price * item.quantity)}</span>
            <button
              onClick={() => onRemove(item.id)}
              className="bg-transparent border-none cursor-pointer p-1"
              aria-label="Видалити"
            >
              <TrashIcon width={24} height={24} className="text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
