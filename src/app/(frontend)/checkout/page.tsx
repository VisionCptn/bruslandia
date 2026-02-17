import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { CheckoutForm } from '../components/CheckoutForm'
import { getTranslations } from '../utils/getTranslations'

export default async function CheckoutPage() {
  const t = await getTranslations()

  return (
    <main className="min-h-screen flex flex-col mx-auto max-w-[1600px]">
      <Header />

      <section className="px-6 py-8 flex-1">
        <CheckoutForm t={t} />
      </section>

      <Footer />
    </main>
  )
}
