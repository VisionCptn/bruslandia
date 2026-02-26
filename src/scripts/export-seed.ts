/**
 * Export current DB data to seed.json
 * Run: pnpm seed:export
 */
import * as dotenv from 'dotenv'
dotenv.config()

import { getPayload } from 'payload'
import config from '../payload.config'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

async function exportSeed() {
  const payload = await getPayload({ config })

  const [media, categories, products, settings] = await Promise.all([
    payload.find({ collection: 'media', limit: 10000, depth: 0 }),
    payload.find({ collection: 'categories', limit: 1000, locale: 'all', depth: 1 }),
    payload.find({ collection: 'products', limit: 1000, locale: 'all', depth: 1 }),
    payload.findGlobal({ slug: 'settings', locale: 'all' }),
  ])

  const seed = {
    exportedAt: new Date().toISOString(),
    media: media.docs,
    categories: categories.docs,
    products: products.docs,
    settings,
  }

  const outPath = resolve(process.cwd(), 'src/scripts/seed.json')
  writeFileSync(outPath, JSON.stringify(seed, null, 2))
  console.log(`Exported:`)
  console.log(`  ${media.totalDocs} media records`)
  console.log(`  ${categories.totalDocs} categories`)
  console.log(`  ${products.totalDocs} products`)
  console.log(`Saved to ${outPath}`)
  process.exit(0)
}

exportSeed().catch((err) => {
  console.error(err)
  process.exit(1)
})
