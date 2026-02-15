import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Breadcrumbs, Header, Footer, ProductActions, ProductImageCarousel } from '../../components'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { formatPrice } from '../../utils/formatPrice'
import { generateGroupedOffsetsX } from '../../utils/randomPosition'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs: products } = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const product = products[0]

  if (!product) {
    notFound()
  }

  const category = typeof product.category === 'object' ? product.category : null

  const settings = await payload.findGlobal({ slug: 'settings' })

  // Get related products from same category
  const { docs: relatedProducts } = await payload.find({
    collection: 'products',
    where: {
      and: [{ category: { equals: category?.id } }, { id: { not_equals: product.id } }],
    },
    limit: 4,
  })

  const images = product.images || []

  const offsets = generateGroupedOffsetsX(3, 100)

  return (
    <main className="min-h-screen flex flex-col mx-auto max-w-[1600px]">
      <Header />

      <section className="px-6 flex-1">
        <Breadcrumbs
          items={[
            { label: settings.breadcrumbs || 'всі товари', href: '/' },
            ...(category ? [{ label: category.title || '', href: `/${category.slug}` }] : []),
            { label: product.title || '' },
          ]}
        />

        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <ProductImageCarousel
            images={images
              .map((item) => {
                const image = typeof item.image === 'object' ? item.image : null
                return image?.url ? { url: image.url, alt: product.title || '' } : null
              })
              .filter((img): img is { url: string; alt: string } => img !== null)}
          />

          {/* Product Info */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            {category && (
              <span
                className="text-[#A5A3A4] text-sm mb-1 block"
                style={{ marginLeft: offsets[0] }}
              >
                {category.title}
              </span>
            )}
            <h2 className="text-2xl font-medium mb-2" style={{ marginLeft: offsets[1] }}>
              {product.title}
            </h2>
            <p className="text-xl text-[#A5A3A4] mb-6" style={{ marginLeft: offsets[2] }}>
              {formatPrice(product.pricing?.uah)}
            </p>

            <ProductActions
              productId={String(product.id)}
              title={product.title || ''}
              image={images[0]?.image && typeof images[0].image === 'object' ? images[0].image.url || '' : ''}
              price={product.pricing?.uah || 0}
              sizes={product.sizes}
            />

            {/* Description */}
            {product.description && (
              <div className="mb-6">
                <h2 className="font-medium mt-5 mb-3">інформація</h2>
                <div className="text-sm text-gray-700 prose prose-sm">
                  <RichText data={product.description} />
                </div>
              </div>
            )}

            {/* Materials */}
            {product.materials && (
              <div className="mb-6">
                <h2 className="font-medium ml-10">матеріали</h2>
                <div className="text-sm text-gray-700 prose prose-sm">
                  <RichText data={product.materials} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 mb-12">
            <h2 className="text-lg mb-6">вам також можуть сподобатись</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => {
                const firstImage =
                  relatedProduct.images?.[0]?.image &&
                  typeof relatedProduct.images[0].image === 'object'
                    ? relatedProduct.images[0].image
                    : null

                return (
                  <Link
                    key={relatedProduct.id}
                    href={`/product/${relatedProduct.slug}`}
                    className="no-underline text-inherit group"
                  >
                    <div className="relative aspect-square overflow-hidden mb-2">
                      {firstImage?.url && (
                        <Image
                          src={firstImage.url}
                          alt={relatedProduct.title || ''}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <p className="text-sm font-medium text-center">{relatedProduct.title}</p>
                    <p className="text-sm text-gray-600 text-center">
                      {formatPrice(relatedProduct.pricing?.uah)}
                    </p>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 1000,
  })

  return products.map((product) => ({
    slug: product.slug,
  }))
}
