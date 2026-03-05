import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

export const Categories = async () => {
  const payload = await getPayload({ config })

  const { docs: categories } = await payload.find({
    collection: 'categories',
    sort: 'order',
    limit: 100,
  })

  if (categories.length === 0) {
    return null
  }

  return (
    <section className="px-6 flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-1">
        {categories.map((category) => {
          const image = typeof category.image === 'object' ? category.image : null

          const inactive = category.isActive === false

          return inactive ? (
            <div
              key={category.id}
              className="no-underline text-inherit opacity-40 cursor-not-allowed pointer-events-none"
            >
              <p className="mb-2 font-bold text-black">{category.title}</p>
              <div className="relative w-full overflow-hidden">
                {image?.url && (
                  <Image
                    src={image.url}
                    alt={category.title || ''}
                    width={image.width ?? 800}
                    height={image.height ?? 1000}
                    className="w-full h-auto object-cover"
                  />
                )}
              </div>
            </div>
          ) : (
            <Link
              key={category.id}
              href={`/${category.slug}`}
              className="no-underline text-inherit"
            >
              <p className="mb-2 font-bold text-black">{category.title}</p>
              <div className="relative w-full overflow-hidden">
                {image?.url && (
                  <Image
                    src={image.url}
                    alt={category.title || ''}
                    width={image.width ?? 800}
                    height={image.height ?? 1000}
                    className="w-full h-auto object-cover"
                  />
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
