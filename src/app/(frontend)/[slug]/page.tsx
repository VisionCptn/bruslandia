import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Header, Footer } from '../components'
import { formatPrice } from '../utils/formatPrice'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs: categories } = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const category = categories[0]

  if (!category) {
    notFound()
  }

  const { docs: products } = await payload.find({
    collection: 'products',
    where: { category: { equals: category.id } },
    limit: 100,
  })

  return (
    <main className="min-h-screen flex flex-col mx-auto max-w-[1600px]">
      <Header />

      <section className="px-6 flex-1">
        <div className="mb-6">
          <Link href="/" className="text-sm text-gray-600 hover:underline">
            &larr; back
          </Link>
        </div>

        <h1 className="text-2xl font-medium mb-8">{category.title}</h1>

        {products.length === 0 ? (
          <p className="text-gray-500">No products in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const firstImage =
                product.images?.[0]?.image && typeof product.images[0].image === 'object'
                  ? product.images[0].image
                  : null
              const secondImage =
                product.images?.[1]?.image && typeof product.images[1].image === 'object'
                  ? product.images[1].image
                  : null
              console.log(secondImage)
              return (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="no-underline text-inherit group"
                >
                  <div className="relative aspect-square overflow-hidden mb-3">
                    {firstImage?.url && (
                      <Image
                        src={firstImage.url}
                        alt={product.title || ''}
                        fill
                        className={`object-cover transition-opacity duration-300 ${secondImage ? 'group-hover:opacity-0' : 'group-hover:scale-105 transition-transform'}`}
                      />
                    )}
                    {secondImage?.url && (
                      <Image
                        src={secondImage.url}
                        alt={product.title || ''}
                        fill
                        className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    )}
                  </div>
                  <span className="text-xl text-black block text-center font-bold">{product.title}</span>
                  <span className="text-sm text-[#A5A3A4] block text-center">
                    {formatPrice(product.pricing?.uah)}
                  </span>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}

export const dynamic = 'force-dynamic'

// Commenting out static generation for now since it doesn't work with D1 during build
// export async function generateStaticParams() {
//   const payload = await getPayload({ config })

//   const { docs: categories } = await payload.find({
//     collection: 'categories',
//     limit: 100,
//   })

//   return categories.map((category) => ({
//     slug: category.slug,
//   }))
// }
