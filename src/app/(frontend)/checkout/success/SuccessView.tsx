'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import type { UIStrings } from '../../utils/getTranslations'
import { getRandomRotationClass } from '../../utils/randomPosition'

interface SuccessViewProps {
  t: UIStrings
}

export const SuccessView = ({ t }: SuccessViewProps) => {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="w-full text-left" style={{ maxWidth: '382px' }}>
        <p
          className={`text-xl font-regular lowercase mb-2 leading-snug ${getRandomRotationClass()}`}
        >
          {t.orderSuccessTitle}
        </p>
        <p
          className={`text-xl font-regular lowercase mb-2 leading-snug float-right lg:-mr-10 ${getRandomRotationClass()}`}
        >
          {t.orderSuccessTitleTwo}
        </p>

        <div className="relative">
          <Image
            src="/thank-you-creature.png"
            alt=""
            width={560}
            height={480}
            className="w-full"
            priority
          />
          <Link
            href="/"
            className={`absolute bottom-0 right-0 w-full bg-[#1a1a1a] !text-white py-4 px-4 lowercase
              text-lg lg:text-xl font-medium text-center block hover:bg-black transition-colors ${getRandomRotationClass()}`}
          >
            {t.backToHome}
          </Link>
        </div>
      </div>
    </div>
  )
}
