import { Header, Footer } from '../components'
import { CartContent } from '../components/CartContent'

export default function CartPage() {
  return (
    <main className="min-h-screen flex flex-col mx-auto max-w-[1600px]">
      <Header />

      <section className="px-6 flex-1">
        <h1 className="text-2xl font-medium mb-8 lowercase">корзина</h1>

        <div className="max-w-2xl">
          <CartContent />
        </div>
      </section>

      <Footer />
    </main>
  )
}
