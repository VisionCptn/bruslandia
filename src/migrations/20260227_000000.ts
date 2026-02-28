import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add firstName and lastName to users
  await db.run(sql`ALTER TABLE \`users\` ADD COLUMN \`first_name\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD COLUMN \`last_name\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD COLUMN \`role\` text DEFAULT 'user';`)

  // Create users_addresses sub-table
  await db.run(sql`CREATE TABLE \`users_addresses\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`label\` text,
    \`country\` text DEFAULT 'Україна',
    \`first_name\` text NOT NULL,
    \`last_name\` text NOT NULL,
    \`middle_name\` text,
    \`city\` text NOT NULL,
    \`postal_code\` text,
    \`phone\` text NOT NULL,
    \`is_default\` integer DEFAULT false,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`)
  await db.run(sql`CREATE INDEX \`users_addresses_order_idx\` ON \`users_addresses\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_addresses_parent_id_idx\` ON \`users_addresses\` (\`_parent_id\`);`)

  // Add user_id to orders
  await db.run(sql`ALTER TABLE \`orders\` ADD COLUMN \`user_id\` integer REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null;`)
  await db.run(sql`CREATE INDEX \`orders_user_idx\` ON \`orders\` (\`user_id\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX IF EXISTS \`orders_user_idx\`;`)
  await db.run(sql`DROP TABLE \`users_addresses\`;`)
  await db.run(sql`ALTER TABLE \`orders\` DROP COLUMN \`user_id\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`role\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`last_name\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`first_name\`;`)
}
