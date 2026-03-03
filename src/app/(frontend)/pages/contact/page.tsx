import { getPayload } from 'payload'
import config from '@payload-config'
import { Header, Footer } from '../../components'
import { CatIcon } from '../../components/icons'
import { getRandomRotationClass } from '../../utils/randomPosition'

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'settings' })

  return (
    <main className="min-h-screen flex flex-col mx-auto max-w-[1600px]">
      <Header />

      <section className="flex-1 flex flex-col items-center justify-center gap-8 py-24 text-xl">
        {settings.contactEmail && (
          <a
            href={`mailto:${settings.contactEmail}`}
            className={`text-inherit no-underline hover:underline ${getRandomRotationClass()}`}
          >
            {settings.contactEmail}
          </a>
        )}

        {settings.instagramUrl && (
          <a
            href={settings.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-inherit no-underline hover:underline ${getRandomRotationClass()}`}
          >
            інстаграм
          </a>
        )}

        <CatIcon width={80} height={50} className={`text-black mt-8 ${getRandomRotationClass(500, false)}`} />
      </section>

      <Footer />
    </main>
  )
}
