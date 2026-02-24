import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // orders table: add new columns
  await db.run(sql`ALTER TABLE \`orders\` ADD COLUMN \`subscribe_to_newsletter\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD COLUMN \`shipping_address_first_name\` text;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD COLUMN \`shipping_address_middle_name\` text;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD COLUMN \`shipping_address_last_name\` text;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD COLUMN \`shipping_address_phone\` text;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD COLUMN \`payment_status\` text DEFAULT 'pending';`)
  await db.run(sql`ALTER TABLE \`orders\` ADD COLUMN \`mono_invoice_id\` text;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD COLUMN \`receipt\` text;`)

  // orders table: drop old columns that no longer exist in the schema
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`customer_name\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`customer_phone\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`shipping_address_street\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`shipping_address_nova_poshta\`;`)

  // orders_items table: add product_title column
  await db.run(sql`ALTER TABLE \`orders_items\` ADD COLUMN \`product_title\` text;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Reverse: restore old columns
  await db.run(sql`ALTER TABLE \`orders\` ADD COLUMN \`customer_name\` text;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD COLUMN \`customer_phone\` text;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD COLUMN \`shipping_address_street\` text;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD COLUMN \`shipping_address_nova_poshta\` text;`)

  // Remove new columns
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`subscribe_to_newsletter\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`shipping_address_first_name\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`shipping_address_middle_name\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`shipping_address_last_name\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`shipping_address_phone\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`payment_status\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`mono_invoice_id\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`receipt\`;`)

  await db.run(sql`ALTER TABLE \`orders_items\` DROP COLUMN \`product_title\`;`)
}
