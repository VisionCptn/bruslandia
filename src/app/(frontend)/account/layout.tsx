import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col mx-auto max-w-[1600px]">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </main>
  )
}
