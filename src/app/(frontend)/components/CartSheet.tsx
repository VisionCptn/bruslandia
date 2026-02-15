'use client'

import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'
import { BasketIcon } from './icons'
import { CartContent } from './CartContent'

export const CartSheet = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-transparent border-none cursor-pointer p-0"
      >
        <BasketIcon width={48} height={44} className="text-black" />
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
          <CartContent onCheckout={() => setIsOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
