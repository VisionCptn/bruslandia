import Link from 'next/link'
import { BrysLogo, EyesIcon, SearchIcon } from './icons'
import { CartSheet } from './CartSheet'
import { getTranslations } from '../utils/getTranslations'
import { MenuSheet } from './MenuSheet'

interface HeaderProps {
  isHomepage?: boolean
}

export const Header = async ({ isHomepage = false }: HeaderProps) => {
  const t = await getTranslations()

  return (
    <header className="flex justify-between items-start p-6">
      <Link href="/">
        <BrysLogo
          width={isHomepage ? 700 : 200}
          height={isHomepage ? 300 : 86}
          className="text-black max-w-full h-auto"
        />
      </Link>
      {!isHomepage && <EyesIcon width={80} height={45} className="text-black" />}
      <div className="flex items-center gap-4">
        <button className="bg-transparent border-none cursor-pointer p-0">
          <SearchIcon width={48} height={44} className="text-black" />
        </button>
        <CartSheet />
        <MenuSheet />
      </div>
    </header>
  )
}
