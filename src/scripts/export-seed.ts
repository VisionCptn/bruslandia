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

  const [pages, settings, navbar] = await Promise.all([
    payload.find({ collection: 'pages', limit: 1000, locale: 'all' }),
    payload.findGlobal({ slug: 'settings', locale: 'all' }),
    payload.findGlobal({ slug: 'navbar', locale: 'all' }),
  ])

  const seed = {
    exportedAt: new Date().toISOString(),
    pages: pages.docs,
    settings,
    navbar,
  }

  const outPath = resolve(process.cwd(), 'src/scripts/seed.json')
  writeFileSync(outPath, JSON.stringify(seed, null, 2))
  console.log(`Exported:`)
  console.log(`  ${pages.totalDocs} pages`)
  console.log(`  settings`)
  console.log(`  navbar`)
  console.log(`Saved to ${outPath}`)
  process.exit(0)
}

exportSeed().catch((err) => {
  console.error(err)
  process.exit(1)
})
