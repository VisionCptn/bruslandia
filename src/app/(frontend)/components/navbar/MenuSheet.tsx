'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetHeader, SheetClose } from '@/components/ui/sheet'
import { KebabMenu } from '../icons/KebabMenu'
import { MainMenuContent } from './MainMenuContent'

type NavbarLink =
  | {
      type: 'page'
      page: null | {
        // adjust to your CMS schema
        slug?: string | null
        url?: string | null
      }
      url: string | null
      newTab: boolean
    }
  | {
      type: 'custom'
      page: null
      url: string | null
      newTab: boolean
    }

type PayloadChildItem = {
  id: string
  label: string
  link: NavbarLink
}

type PayloadNavItem = {
  id: string
  label: string
  link: NavbarLink
  children?: PayloadChildItem[]
}

type PayloadNavbar = {
  id: number
  heading?: string | null
  menuItems: PayloadNavItem[]
  updatedAt?: string
  createdAt?: string
  globalType?: string
}

export const MenuSheet = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [navbar, setNavbar] = useState<PayloadNavbar | null>(null)

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        // Adjust if your Payload lives on another domain:
        // const base = process.env.NEXT_PUBLIC_PAYLOAD_URL;
        // const res = await fetch(`${base}/api/globals/navbar?depth=2`, { cache: "no-store" });
        const res = await fetch(`/api/globals/navbar?depth=2`, { cache: 'no-store' })
        if (!res.ok) return

        const data = (await res.json()) as PayloadNavbar
        console.log(data)
        if (!cancelled) setNavbar(data)
      } catch {
        throw new Error('Failed to fetch Navbar data')
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-transparent border-none cursor-pointer p-0"
      >
        <KebabMenu width={48} height={44} className="text-black" />
      </button>

      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col"
        showCloseButton={false}
      >
        <SheetHeader className="p-6 pb-0">
          <div className="flex justify-end items-center">
            <SheetClose className="p-0 bg-transparent border-none cursor-pointer">
              <svg
                className="w-8 h-8"
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

        <div className="flex-1 p-8 lg:px-[80px] lg:pb-[50px] overflow-hidden">
          <MainMenuContent data={navbar} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
