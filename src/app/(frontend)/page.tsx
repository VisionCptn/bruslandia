import { Header, Categories, Footer, FooterTagline } from './components'

export const metadata = {
  title: 'brys - bryslandia.com',
}

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  return (
    <main className="min-h-screen flex flex-col mx-auto max-w-[1600px]">
      <Header isHomepage />
      <Categories />
      <Footer showTagline taglineContent={<FooterTagline />} />
    </main>
  )
}
