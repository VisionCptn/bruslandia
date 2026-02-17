import Link from 'next/link'
import { CatIcon, MartaIcon } from './icons'

interface FooterProps {
  showTagline?: boolean
  taglineContent?: React.ReactNode
}

export const Footer = ({ showTagline = false, taglineContent }: FooterProps) => {
  return (
    <footer className="py-10 px-6">
      {showTagline && taglineContent}

      <div className="flex flex-col md:flex-row justify-between items-start flex-wrap gap-6">
        <MartaIcon width={120} height={75} className="text-black" />

        <div className="text-sm">
          <Link href="/search" className="block text-inherit no-underline hover:underline">
            search
          </Link>
          <Link href="/privacy" className="block text-inherit no-underline hover:underline">
            privacy policy
          </Link>
          <Link href="/shipping" className="block text-inherit no-underline hover:underline">
            shipping and returns
          </Link>
          <Link href="/terms" className="block text-inherit no-underline hover:underline">
            terms or service
          </Link>
          <Link href="/contact" className="block text-inherit no-underline hover:underline">
            contact
          </Link>
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
