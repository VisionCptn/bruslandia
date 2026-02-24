'use client'

import { useRouter } from 'next/navigation'
import { CartPageItem } from '../components/CartPageItem'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'
import { getRandomRotationClass } from '../utils/randomPosition'
import type { UIStrings } from '../utils/getTranslations'

interface CartViewProps {
  t: UIStrings
}

export const CartView = ({ t }: CartViewProps) => {
  const { items, updateQuantity, removeItem, total } = useCart()
  const router = useRouter()

  return (
    <>
      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500 mb-8">{t.cartEmpty}</p>
          <button
            onClick={() => router.push('/')}
            className={`bg-[#1a1a1a] text-white px-8 py-4 text-lg lowercase hover:bg-black transition-colors ${getRandomRotationClass()} active:scale-95`}
          >
            {t.continueShopping}
          </button>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto">
          <div className="space-y-12 mb-16">
            {items.map((item) => (
              <CartPageItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          <div className="bg-gray-50 p-12 max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="flex justify-between items-center text-2xl">
                <span className="lowercase">{t.cartTotal}</span>
                <span className="font-medium">{formatPrice(total)}</span>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className={`w-full bg-[#1a1a1a] text-white py-5 px-8 text-xl lowercase hover:bg-black transition-colors ${getRandomRotationClass()} active:scale-95`}
              >
                {t.checkout}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
