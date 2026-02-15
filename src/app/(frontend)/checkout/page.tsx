import { Header, Footer } from '../components'
import { CheckoutForm } from '../components/CheckoutForm'

export default function CheckoutPage() {
  return (
    <main className="min-h-screen flex flex-col mx-auto max-w-[1600px]">
      <Header />

      <section className="px-6 flex-1">
        <h1 className="text-2xl font-medium mb-8 lowercase">оформлення замовлення</h1>

        <div className="max-w-2xl">
          <CheckoutForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
