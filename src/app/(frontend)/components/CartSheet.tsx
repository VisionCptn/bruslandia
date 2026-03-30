'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'
import { BasketIcon, BasketFilledIcon } from './icons'
import { CartContent } from './CartContent'
import { useCart } from '../context/CartContext'
import type { UIStrings } from '../utils/getTranslations'

interface CartSheetProps {
  t: Pick<UIStrings, 'cartEmpty' | 'cartTotal' | 'checkout' | 'sizeLabel'>
}

export const CartSheet = ({ t }: CartSheetProps) => {
  const { items, isCartOpen, openCart, closeCart } = useCart()
  const hasItems = items.length > 0

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => (open ? openCart() : closeCart())}>
      <button
        onClick={openCart}
        className="bg-transparent border-none cursor-pointer p-0"
      >
        {hasItems ? (
          <BasketFilledIcon width={48} height={51} className="text-black" />
        ) : (
          <BasketIcon width={48} height={51} className="text-black" />
        )}
      </button>

      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col" showCloseButton={false}>
        <SheetHeader className="p-6 pb-0">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-xl font-normal lowercase">корзина</SheetTitle>
            <SheetClose className="p-0 bg-transparent border-none cursor-pointer">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="flex-1 px-6 py-4 overflow-hidden">
          <CartContent onCheckout={closeCart} t={t} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
