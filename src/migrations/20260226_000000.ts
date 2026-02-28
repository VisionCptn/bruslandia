import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`navbar\` ADD COLUMN \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`ALTER TABLE \`settings\` ADD COLUMN \`_status\` text DEFAULT 'draft';`)

  await db.run(sql`CREATE TABLE \`_navbar_v\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`version_heading\` text,
    \`version__status\` text DEFAULT 'draft',
    \`version_updated_at\` text,
    \`version_created_at\` text,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`snapshot\` integer,
    \`published_locale\` text,
    \`latest\` integer,
    \`autosave\` integer
  );`)
  await db.run(sql`CREATE INDEX \`_navbar_v_version__status_idx\` ON \`_navbar_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_navbar_v_created_at_idx\` ON \`_navbar_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_navbar_v_updated_at_idx\` ON \`_navbar_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_navbar_v_snapshot_idx\` ON \`_navbar_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_navbar_v_published_locale_idx\` ON \`_navbar_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_navbar_v_latest_idx\` ON \`_navbar_v\` (\`latest\`);`)

  await db.run(sql`CREATE TABLE \`_navbar_v_version_menu_items\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`label\` text NOT NULL,
    \`link_type\` text DEFAULT 'page',
    \`link_new_tab\` integer DEFAULT false,
    \`link_url\` text,
    \`link_page_id\` integer,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`_navbar_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`)
  await db.run(sql`CREATE INDEX \`_navbar_v_version_menu_items_order_idx\` ON \`_navbar_v_version_menu_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_navbar_v_version_menu_items_parent_id_idx\` ON \`_navbar_v_version_menu_items\` (\`_parent_id\`);`)

  await db.run(sql`CREATE TABLE \`_navbar_v_version_menu_items_children\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` text NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`label\` text NOT NULL,
    \`link_type\` text DEFAULT 'page',
    \`link_new_tab\` integer DEFAULT false,
    \`link_url\` text,
    \`link_page_id\` integer,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`_navbar_v_version_menu_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`)
  await db.run(sql`CREATE INDEX \`_navbar_v_version_menu_items_children_order_idx\` ON \`_navbar_v_version_menu_items_children\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_navbar_v_version_menu_items_children_parent_id_idx\` ON \`_navbar_v_version_menu_items_children\` (\`_parent_id\`);`)

  await db.run(sql`CREATE TABLE \`_settings_v\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`version_instagram_url\` text,
    \`version_contact_email\` text,
    \`version__status\` text DEFAULT 'draft',
    \`version_updated_at\` text,
    \`version_created_at\` text,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`snapshot\` integer,
    \`published_locale\` text,
    \`latest\` integer,
    \`autosave\` integer
  );`)
  await db.run(sql`CREATE INDEX \`_settings_v_version__status_idx\` ON \`_settings_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_settings_v_created_at_idx\` ON \`_settings_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_settings_v_updated_at_idx\` ON \`_settings_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_settings_v_snapshot_idx\` ON \`_settings_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_settings_v_published_locale_idx\` ON \`_settings_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_settings_v_latest_idx\` ON \`_settings_v\` (\`latest\`);`)

  await db.run(sql`CREATE TABLE \`_settings_v_locales\` (
    \`site_title\` text DEFAULT 'brys',
    \`footer_text\` text,
    \`breadcrumbs\` text DEFAULT 'всі товари',
    \`ui_order_success_title\` text,
    \`ui_order_success_message\` text,
    \`ui_back_to_home\` text,
    \`ui_select_size\` text,
    \`ui_size_label\` text,
    \`ui_add_to_cart\` text,
    \`ui_category_empty\` text,
    \`ui_cart_empty\` text,
    \`ui_continue_shopping\` text,
    \`ui_cart_total\` text,
    \`ui_checkout\` text,
    \`ui_processing\` text,
    \`ui_subtotal\` text,
    \`ui_shipping\` text,
    \`ui_total\` text,
    \`ui_contact_info\` text,
    \`ui_subscribe_newsletter\` text,
    \`ui_country\` text,
    \`ui_first_name\` text,
    \`ui_last_name\` text,
    \`ui_middle_name\` text,
    \`ui_address\` text,
    \`ui_postal_code\` text,
    \`ui_city\` text,
    \`ui_phone\` text,
    \`ui_save_address\` text,
    \`ui_shipping_warning\` text,
    \`ui_payment_method\` text,
    \`ui_payment_secure\` text,
    \`id\` integer PRIMARY KEY NOT NULL,
    \`_locale\` text NOT NULL,
    \`_parent_id\` integer NOT NULL,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`)
  await db.run(sql`CREATE UNIQUE INDEX \`_settings_v_locales_locale_parent_id_unique\` ON \`_settings_v_locales\` (\`_locale\`,\`_parent_id\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`_navbar_v_version_menu_items_children\`;`)
  await db.run(sql`DROP TABLE \`_navbar_v_version_menu_items\`;`)
  await db.run(sql`DROP TABLE \`_navbar_v\`;`)
  await db.run(sql`DROP TABLE \`_settings_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_settings_v\`;`)
  await db.run(sql`ALTER TABLE \`navbar\` DROP COLUMN \`_status\`;`)
  await db.run(sql`ALTER TABLE \`settings\` DROP COLUMN \`_status\`;`)
}
