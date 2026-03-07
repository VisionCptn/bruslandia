import type { Payload } from 'payload'
import seedData from './scripts/seed.json'

export async function runSeedIfEmpty(payload: Payload) {
  let pageCount: number
  try {
    const result = await payload.find({ collection: 'pages', limit: 0 })
    pageCount = result.totalDocs
  } catch {
    // Tables don't exist yet — migrations haven't run
    payload.logger.info('Seed: DB not ready, skipping seed')
    return
  }

  if (pageCount > 0) {
    payload.logger.info('Seed: pages already exist, skipping')
    return
  }

  payload.logger.info('Seed: seeding pages, settings and navbar...')

  // Pages
  for (const item of seedData.pages) {
    const { id, updatedAt, createdAt, ...data } = item as any
    try {
      await payload.create({
        collection: 'pages',
        locale: 'uk',
        data: {
          ...data,
          title: typeof data.title === 'object' ? data.title?.uk ?? data.title?.en : data.title,
          content:
            typeof data.content === 'object' && !Array.isArray(data.content)
              ? data.content?.uk ?? data.content?.en ?? data.content
              : data.content,
        },
      })
      payload.logger.info(`Seed: created page "${data.slug}"`)
    } catch (err: any) {
      payload.logger.error(`Seed: failed to create page "${data.slug}": ${err?.message}`)
    }
  }

  // Settings
  try {
    const { id, updatedAt, createdAt, ...settingsData } = seedData.settings as any
    await payload.updateGlobal({ slug: 'settings', data: settingsData })
    payload.logger.info('Seed: settings imported')
  } catch (err: any) {
    payload.logger.error(`Seed: failed to import settings: ${err?.message}`)
  }

  // Navbar
  try {
    const { id, updatedAt, createdAt, ...navbarData } = seedData.navbar as any
    await payload.updateGlobal({ slug: 'navbar', data: navbarData })
    payload.logger.info('Seed: navbar imported')
  } catch (err: any) {
    payload.logger.error(`Seed: failed to import navbar: ${err?.message}`)
  }

  payload.logger.info('Seed: done')
}
