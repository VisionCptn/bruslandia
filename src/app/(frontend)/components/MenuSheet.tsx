"use client"

import { useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
  } from '@/components/ui/sheet'
import { KebabMenu } from './icons/KebabMenu'
import { MainMenuContent } from './MainMenuContent'

export const MenuSheet = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <button onClick={() => setIsOpen(true)} className="bg-transparent border-none cursor-pointer p-0">
                <KebabMenu width={48} height={44} className="text-black" />
            </button>
            <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col" showCloseButton={false}>
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
                <MainMenuContent
                    heading = "все шо є"
                    sections={[
                        {
                            title: "мерч",
                            items: [
                                { label: "футболки", href: "/merch/t-shirts" },
                                { label: "постери", href: "/merch/posters" },
                                { label: "дрібне блискуче", href: "/merch/small-shiny" },
                            ],
                            },
                        {
                            title: "подарунки",
                            items: [
                                { label: "пакувальний папір", href: "/gifts/wrapping-paper" },
                                { label: "подарункові пакети", href: "/gifts/bags" },
                                { label: "тішью", href: "/gifts/tissue" },
                                { label: "листівки", href: "/gifts/cards" },
                            ],
                        },
                        {
                            title: "домашні ритуали",
                            items: [
                                { label: "текстиль", href: "/home/textile" },
                                { label: "форми для печива", href: "/home/cookie-molds" },
                            ],
                        },
                    ]}
                    aboutLink={{ label: "про проєкт", href: "/about" }}
                    instagram={{ label: "Instagram", href: "https://www.instagram.com/brys_ua/" }}
                />
            </div>
        </SheetContent>
      </Sheet>
    )
}