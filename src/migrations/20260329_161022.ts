import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`products\` ADD \`show_size_chart\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_show_size_chart\` integer DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`products\` DROP COLUMN \`show_size_chart\`;`)
  await db.run(sql`ALTER TABLE \`_products_v\` DROP COLUMN \`version_show_size_chart\`;`)
}
