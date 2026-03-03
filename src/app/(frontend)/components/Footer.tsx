import Link from 'next/link'
import { CatIcon, MartaIcon } from './icons'

interface FooterProps {
  showTagline?: boolean
  taglineContent?: React.ReactNode
}

export const Footer = ({ showTagline = false, taglineContent }: FooterProps) => {
  return (
    <footer className="py-10 px-6">
      {/* Tagline + eyes — shown only on homepage, centered */}
      {showTagline && taglineContent}

      {/* Mobile layout: stacked. Desktop: single row */}
      <div className="md:hidden flex flex-col gap-6">
        {/* Instagram centered */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center text-inherit no-underline text-sm hover:underline"
        >
          instagram
        </a>

        {/* Nav links left-aligned */}
        <div className="text-sm">
          <Link href="/pages/public-offer" className="block text-inherit no-underline hover:underline">public offer agreement</Link>
          <Link href="/pages/privacy-policy" className="block text-inherit no-underline hover:underline">privacy policy</Link>
          <Link href="/pages/delivery-returns" className="block text-inherit no-underline hover:underline">delivery & returns</Link>
          <Link href="/pages/contact" className="block text-inherit no-underline hover:underline">contact</Link>
        </div>

        {/* Marta + cat side by side */}
        <div className="flex justify-between items-end">
          <MartaIcon width={120} height={75} className="text-black" />
          <CatIcon width={80} height={50} className="text-black" />
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex justify-between items-start flex-wrap gap-6">
        <MartaIcon width={120} height={75} className="text-black" />

        <div className="text-sm">
          <Link href="/pages/public-offer" className="block text-inherit no-underline hover:underline">public offer agreement</Link>
          <Link href="/pages/privacy-policy" className="block text-inherit no-underline hover:underline">privacy policy</Link>
          <Link href="/pages/delivery-returns" className="block text-inherit no-underline hover:underline">delivery & returns</Link>
          <Link href="/pages/contact" className="block text-inherit no-underline hover:underline">contact</Link>
        </div>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-inherit no-underline text-sm hover:underline"
        >
          instagram
        </a>

        <CatIcon width={80} height={50} className="text-black" />
      </div>
    </footer>
  )
}
