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
      <div className="w-72 h-96 relative bg-gray-100 flex-shrink-0">
        <Image src={item.image} alt={item.title} fill className="object-cover" />
      </div>

      <div className="flex-1 flex flex-col justify-between py-4">
        <div>
          <h3 className="text-xl font-normal mb-4">{item.title}</h3>
          {item.size && (
            <p className="text-base text-gray-700 mb-2">
              Розмір: {item.size.toUpperCase()}
            </p>
          )}
          <p className="text-base text-gray-700">Color: Black</p>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => onUpdateQuantity(item.id, -1)}
              className="w-12 h-12 flex items-center justify-center bg-transparent border-none cursor-pointer text-2xl hover:bg-gray-50 transition-colors"
              aria-label="Зменшити кількість"
            >
              −
            </button>
            <span className="text-xl min-w-[3rem] text-center">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, 1)}
              className="w-12 h-12 flex items-center justify-center bg-transparent border-none cursor-pointer text-2xl hover:bg-gray-50 transition-colors"
              aria-label="Збільшити кількість"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-8">
            <span className="text-2xl font-normal">{formatPrice(item.price * item.quantity)}</span>
            <button
              onClick={() => onRemove(item.id)}
              className="bg-transparent border-none cursor-pointer p-2 hover:bg-gray-100 transition-colors"
              aria-label="Видалити"
            >
              <TrashIcon width={28} height={28} className="text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
