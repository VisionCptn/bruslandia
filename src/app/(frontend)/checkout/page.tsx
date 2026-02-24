import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { CheckoutForm } from '../components/CheckoutForm'
import { getTranslations } from '../utils/getTranslations'

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ payment?: string }>
}) {
  const [t, params] = await Promise.all([getTranslations(), searchParams])
  const paymentFailed = params.payment === 'failed'

  return (
    <main className="min-h-screen flex flex-col mx-auto max-w-[1600px]">
      <Header />

      <section className="px-6 py-8 flex-1">
        <CheckoutForm t={t} paymentFailed={paymentFailed} />
      </section>

      <Footer />
    </main>
  )
}
