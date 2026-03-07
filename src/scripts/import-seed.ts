/**
 * Import seed data into a fresh DB
 * Run: pnpm seed:import
 *
 * Notes:
 * - Existing pages are skipped (matched by slug)
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

  // 1. Pages
  console.log(`\nImporting ${seed.pages.length} pages...`)
  for (const item of seed.pages) {
    const { id, updatedAt, createdAt, ...data } = item
    try {
      await payload.create({
        collection: 'pages',
        locale: 'uk',
        data: {
          ...data,
          title: typeof data.title === 'object' ? data.title?.uk ?? data.title?.en : data.title,
          content: typeof data.content === 'object' && !Array.isArray(data.content)
            ? data.content?.uk ?? data.content?.en ?? data.content
            : data.content,
        },
      })
      console.log(`  ✓ page "${data.slug}"`)
    } catch (err: any) {
      if (err?.message?.includes('unique')) {
        console.log(`  ~ page "${data.slug}" already exists, skipping`)
      } else {
        console.error(`  ✗ page "${data.slug}" failed:`, err?.message)
      }
    }
  }

  // 2. Settings global
  console.log(`\nImporting settings...`)
  try {
    const { id, updatedAt, createdAt, ...settingsData } = seed.settings
    await payload.updateGlobal({ slug: 'settings', data: settingsData })
    console.log(`  ✓ settings`)
  } catch (err: any) {
    console.error(`  ✗ settings failed:`, err?.message)
  }

  // 3. Navbar global
  console.log(`\nImporting navbar...`)
  try {
    const { id, updatedAt, createdAt, ...navbarData } = seed.navbar
    await payload.updateGlobal({ slug: 'navbar', data: navbarData })
    console.log(`  ✓ navbar`)
  } catch (err: any) {
    console.error(`  ✗ navbar failed:`, err?.message)
  }

  console.log(`\nDone!`)
  process.exit(0)
}

importSeed().catch((err) => {
  console.error(err)
  process.exit(1)
})
