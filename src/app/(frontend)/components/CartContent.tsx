'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { TrashIcon } from './icons'
import { formatPrice } from '../utils/formatPrice'
import { useCart } from '../context/CartContext'
import { getRandomRotationClass } from '../utils/randomPosition'

interface CartContentProps {
  showCheckoutButton?: boolean
  onCheckout?: () => void
}

export const CartContent = ({ showCheckoutButton = true, onCheckout }: CartContentProps) => {
  const { items, updateQuantity, removeItem, total } = useCart()
  const router = useRouter()

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout()
    }
    router.push('/checkout')
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        {items.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Корзина порожня</p>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="space-y-2">
                <h3 className="font-medium lowercase text-center">{item.title}</h3>
                <div className="flex gap-4">
                  <div className="w-32 h-32 relative bg-gray-100 flex-shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer text-xl"
                      >
                        −
                      </button>
                      <span className="text-lg">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer text-xl"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-2 bg-transparent border-none cursor-pointer p-0"
                      >
                        <TrashIcon width={20} height={20} className="text-black" />
                      </button>
                    </div>
                    {item.size && (
                      <div className="text-sm text-gray-600 lowercase">
                        розмір {item.size.toUpperCase()}
                      </div>
                    )}
                    <div className="text-sm">{formatPrice(item.price)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t mt-6">
        <div className="w-full space-y-4">
          <div className="flex justify-between items-center">
            <span className="lowercase">разом</span>
            <span>{formatPrice(total)}</span>
          </div>
          {showCheckoutButton && (
            <button
              onClick={handleCheckout}
              className={`w-full bg-[#1a1a1a] text-white py-4 px-6 text-lg lowercase hover:bg-black transition-colors ${getRandomRotationClass()} active:scale-95`}
            >
              оформити замовлення
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
