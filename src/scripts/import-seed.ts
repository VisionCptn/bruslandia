/**
 * Import seed data into a fresh DB
 * Run: pnpm seed:import
 *
 * Notes:
 * - Media files must still exist in R2 (only DB records are restored)
 * - Existing records are skipped to avoid duplicates
 * - Run AFTER migrations
 */
import * as dotenv from 'dotenv'
dotenv.config()

import { getPayload } from 'payload'
import config from '../payload.config'
import { readFileSync } from 'fs'
import { resolve } from 'path'

async function importSeed() {
  const payload = await getPayload({ config })

  const seedPath = resolve(process.cwd(), 'src/scripts/seed.json')
  const seed = JSON.parse(readFileSync(seedPath, 'utf-8'))

  console.log(`Importing seed from ${seed.exportedAt}`)

  // 1. Media — restore records so IDs are reusable by categories/products
  console.log(`\nImporting ${seed.media.length} media records...`)
  const mediaIdMap: Record<number, number> = {} // old id → new id

  for (const item of seed.media) {
    const { id, updatedAt, createdAt, ...data } = item
    try {
      const created = await payload.create({
        collection: 'media',
        data: {
          ...data,
          // url and filename reference R2 — keep them as-is
        },
      })
      mediaIdMap[id] = created.id
      console.log(`  ✓ media ${id} → ${created.id} (${data.filename})`)
    } catch (err: any) {
      if (err?.message?.includes('unique')) {
        console.log(`  ~ media ${id} already exists, skipping`)
        // Try to find existing by filename to map the ID
        const existing = await payload.find({
          collection: 'media',
          where: { filename: { equals: data.filename } },
          limit: 1,
        })
        if (existing.docs[0]) mediaIdMap[id] = existing.docs[0].id
      } else {
        console.error(`  ✗ media ${id} failed:`, err?.message)
      }
    }
  }

  // 2. Categories
  console.log(`\nImporting ${seed.categories.length} categories...`)
  const categoryIdMap: Record<number, number> = {}

  for (const item of seed.categories) {
    const { id, updatedAt, createdAt, _status, ...data } = item

    // Remap image id
    const imageId = typeof data.image === 'object' ? data.image?.id : data.image
    const remappedImageId = mediaIdMap[imageId] ?? imageId

    try {
      const created = await payload.create({
        collection: 'categories',
        locale: 'uk',
        data: {
          ...data,
          image: remappedImageId,
          // Handle localized title
          title: typeof data.title === 'object' ? data.title?.uk ?? data.title?.en : data.title,
        },
      })
      categoryIdMap[id] = created.id
      console.log(`  ✓ category "${created.id}" (${data.slug})`)
    } catch (err: any) {
      if (err?.message?.includes('unique')) {
        console.log(`  ~ category ${data.slug} already exists, skipping`)
        const existing = await payload.find({
          collection: 'categories',
          where: { slug: { equals: data.slug } },
          limit: 1,
        })
        if (existing.docs[0]) categoryIdMap[id] = existing.docs[0].id
      } else {
        console.error(`  ✗ category ${data.slug} failed:`, err?.message)
      }
    }
  }

  // 3. Products
  console.log(`\nImporting ${seed.products.length} products...`)

  for (const item of seed.products) {
    const { id, updatedAt, createdAt, _status, ...data } = item

    // Remap category id
    const categoryId = typeof data.category === 'object' ? data.category?.id : data.category
    const remappedCategoryId = categoryIdMap[categoryId] ?? categoryId

    // Remap image ids in images array
    const remappedImages = (data.images ?? []).map((img: any) => {
      const imgId = typeof img.image === 'object' ? img.image?.id : img.image
      return { image: mediaIdMap[imgId] ?? imgId }
    })

    try {
      await payload.create({
        collection: 'products',
        locale: 'uk',
        data: {
          ...data,
          category: remappedCategoryId,
          images: remappedImages,
          title: typeof data.title === 'object' ? data.title?.uk ?? data.title?.en : data.title,
          description: typeof data.description === 'object' ? data.description?.uk ?? data.description?.en : data.description,
          materials: typeof data.materials === 'object' ? data.materials?.uk ?? data.materials?.en : data.materials,
        },
      })
      console.log(`  ✓ product "${data.slug}"`)
    } catch (err: any) {
      if (err?.message?.includes('unique')) {
        console.log(`  ~ product ${data.slug} already exists, skipping`)
      } else {
        console.error(`  ✗ product ${data.slug} failed:`, err?.message)
      }
    }
  }

  // 4. Settings global
  console.log(`\nImporting settings...`)
  try {
    const { id, updatedAt, createdAt, ...settingsData } = seed.settings
    await payload.updateGlobal({ slug: 'settings', data: settingsData })
    console.log(`  ✓ settings`)
  } catch (err: any) {
    console.error(`  ✗ settings failed:`, err?.message)
  }

  console.log(`\nDone!`)
  process.exit(0)
}

importSeed().catch((err) => {
  console.error(err)
  process.exit(1)
})
