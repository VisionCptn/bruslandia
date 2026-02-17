import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { getTranslations } from '../utils/getTranslations'
import { CartView } from './CartView'

export default async function CartPage() {
  const t = await getTranslations()

  return (
    <main className="min-h-screen flex flex-col mx-auto max-w-[1600px]">
      <Header />
      <section className="px-6 py-12 flex-1">
        <CartView t={t} />
      </section>
      <Footer />
    </main>
  )
}
