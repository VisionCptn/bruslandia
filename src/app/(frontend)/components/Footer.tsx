import Link from 'next/link'
import { CatIcon, MartaIcon } from './icons'
import { getRandomRotationClass, generateGroupedOffsetsX } from '../utils/randomPosition'
import { getPayload } from 'payload'
import config from '@payload-config'

interface FooterProps {
  showTagline?: boolean
  taglineContent?: React.ReactNode
}

const offsets = generateGroupedOffsetsX(10, 100)

export const Footer = async ({ showTagline = false, taglineContent }: FooterProps) => {
  let instagramUrl = 'https://instagram.com'
  try {
    const payload = await getPayload({ config })
    const settings = await payload.findGlobal({ slug: 'settings' })
    instagramUrl = settings.instagramUrl ?? instagramUrl
  } catch {
    // DB not ready or settings missing — use fallback
  }

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
          <Link
            href="/pages/public-offer"
            className={`block text-inherit no-underline hover:underline ${getRandomRotationClass()}`}
            style={{ marginLeft: offsets[0] }}
          >
            public offer agreement
          </Link>
          <Link
            href="/pages/privacy-policy"
            className={`block text-inherit no-underline hover:underline ${getRandomRotationClass()}`}
            style={{ marginLeft: offsets[1] }}
          >
            privacy policy
          </Link>
          <Link
            href="/pages/delivery-returns"
            className={`block text-inherit no-underline hover:underline ${getRandomRotationClass()}`}
            style={{ marginLeft: offsets[2] }}
          >
            delivery & returns
          </Link>
          <Link
            href="/pages/terms-of-use"
            className={`block text-inherit no-underline hover:underline ${getRandomRotationClass()}`}
            style={{ marginLeft: offsets[3] }}
          >
            Terms of Use
          </Link>
          <Link
            href="/pages/contact"
            className={`block text-inherit no-underline hover:underline ${getRandomRotationClass()}`}
            style={{ marginLeft: offsets[4] }}
          >
            contact
          </Link>
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
          <Link
            href="/pages/public-offer"
            className={`block text-inherit no-underline hover:underline ${getRandomRotationClass()}`}
            style={{ marginLeft: offsets[0] }}
          >
            public offer agreement
          </Link>
          <Link
            href="/pages/privacy-policy"
            className={`block text-inherit no-underline hover:underline ${getRandomRotationClass()}`}
            style={{ marginLeft: offsets[1] }}
          >
            privacy policy
          </Link>
          <Link
            href="/pages/delivery-returns"
            className={`block text-inherit no-underline hover:underline ${getRandomRotationClass()}`}
            style={{ marginLeft: offsets[2] }}
          >
            delivery & returns
          </Link>
          <Link
            href="/pages/contact"
            className={`block text-inherit no-underline hover:underline ${getRandomRotationClass()}`}
            style={{ marginLeft: offsets[3] }}
          >
            contact
          </Link>
        </div>

        <a
          href={instagramUrl}
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
