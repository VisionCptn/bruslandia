import { CatIcon, MartaIcon } from './icons'
import { FooterTagline } from './FooterTagline'

interface FooterProps {
  showTagline?: boolean
}

export const Footer = ({ showTagline = false }: FooterProps) => {
  return (
    <footer className="py-10 px-6">
      {showTagline && <FooterTagline />}

      <div className="flex flex-col md:flex-row justify-between items-start flex-wrap gap-6">
        <MartaIcon width={120} height={75} className="text-black" />

        <div className="text-sm">
          <a href="/search" className="block text-inherit no-underline hover:underline">
            search
          </a>
          <a href="/privacy" className="block text-inherit no-underline hover:underline">
            privacy policy
          </a>
          <a href="/shipping" className="block text-inherit no-underline hover:underline">
            shipping and returns
          </a>
          <a href="/terms" className="block text-inherit no-underline hover:underline">
            terms or service
          </a>
          <a href="/contact" className="block text-inherit no-underline hover:underline">
            contact
          </a>
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
