import Link from 'next/link'
import { BrysLogo, EyesIcon } from './icons'
import { CartSheet } from './CartSheet'
import { getTranslations } from '../utils/getTranslations'
import { MenuSheet } from './MenuSheet'

interface HeaderProps {
  isHomepage?: boolean
}

export const Header = async ({ isHomepage = false }: HeaderProps) => {
  const t = await getTranslations()

  return (
    <header className="p-6">
      {isHomepage ? (
        <>
          {/* Homepage mobile: kebab | cart on top row, logo below */}
          <div className="md:hidden">
            <div className="flex justify-between items-center mb-2">
              {/* <button className="bg-transparent border-none cursor-pointer p-0">
                <KebabMenu width={48} height={44} className="text-black" />
              </button> */}
              <MenuSheet />
              <CartSheet t={t} />
            </div>
            <Link href="/">
              <BrysLogo width={700} height={300} className="text-black max-w-full h-auto" />
            </Link>
          </div>

          {/* Homepage desktop: logo + icons side by side */}
          <div className="hidden md:flex justify-between items-start">
            <Link href="/">
              <BrysLogo width={700} height={300} className="text-black max-w-full h-auto" />
            </Link>
            <div className="flex items-center gap-4">
              <CartSheet t={t} />
              {/* <button className="bg-transparent border-none cursor-pointer p-0">
                <KebabMenu width={48} height={44} className="text-black" />
              </button> */}
              <MenuSheet />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Mobile non-homepage: kebab | eyes | cart */}
          <div className="flex md:hidden justify-between items-center">
            {/* <button className="bg-transparent border-none cursor-pointer p-0">
              <KebabMenu width={48} height={44} className="text-black" />
            </button> */}
            <MenuSheet />
            <Link href="/">
              <EyesIcon width={80} height={45} className="text-black" />
            </Link>
            <CartSheet t={t} />
          </div>

          {/* Desktop non-homepage: logo | eyes | icons */}
          <div className="hidden md:flex justify-between items-start">
            <Link href="/">
              <BrysLogo width={200} height={86} className="text-black max-w-full h-auto" />
            </Link>
            <div className="group relative flex items-center">
              <EyesIcon width={80} height={45} className="text-black" />
              <span className="absolute font-extralight left-full top-1/2 ml-3 text-xs text-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none bg-[#D5D5D4] px-3 py-1.5">
                {t.eyesLabel}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <CartSheet t={t} />
              {/* <button className="bg-transparent border-none cursor-pointer p-0">
                <KebabMenu width={48} height={44} className="text-black" />
              </button> */}
              <MenuSheet />
            </div>
          </div>
        </>
      )}
    </header>
  )
}
