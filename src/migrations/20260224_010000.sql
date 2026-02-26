-- Add _status column to categories and products (required for drafts)
ALTER TABLE `categories` ADD COLUMN `_status` text DEFAULT 'draft';
ALTER TABLE `products` ADD COLUMN `_status` text DEFAULT 'draft';

-- Add is_active column to categories
ALTER TABLE `categories` ADD COLUMN `is_active` integer DEFAULT true;

-- Create indexes for _status
CREATE INDEX `categories__status_idx` ON `categories` (`_status`);
CREATE INDEX `products__status_idx` ON `products` (`_status`);

-- Categories versions table
CREATE TABLE `_categories_v` (
  `id` integer PRIMARY KEY NOT NULL,
  `parent_id` integer,
  `version_slug` text NOT NULL,
  `version_image_id` integer,
  `version_order` numeric DEFAULT 0,
  `version_is_active` integer DEFAULT true,
  `version__status` text DEFAULT 'draft',
  `version_updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  `version_created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  `created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  `updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  `snapshot` integer,
  `published_locale` text,
  `latest` integer,
  `autosave` integer,
  FOREIGN KEY (`parent_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE set null,
  FOREIGN KEY (`version_image_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null
);
CREATE INDEX `_categories_v_parent_idx` ON `_categories_v` (`parent_id`);
CREATE INDEX `_categories_v_version_slug_idx` ON `_categories_v` (`version_slug`);
CREATE INDEX `_categories_v_version__status_idx` ON `_categories_v` (`version__status`);
CREATE INDEX `_categories_v_version_updated_at_idx` ON `_categories_v` (`version_updated_at`);
CREATE INDEX `_categories_v_version_created_at_idx` ON `_categories_v` (`version_created_at`);
CREATE INDEX `_categories_v_created_at_idx` ON `_categories_v` (`created_at`);
CREATE INDEX `_categories_v_updated_at_idx` ON `_categories_v` (`updated_at`);
CREATE INDEX `_categories_v_snapshot_idx` ON `_categories_v` (`snapshot`);
CREATE INDEX `_categories_v_published_locale_idx` ON `_categories_v` (`published_locale`);
CREATE INDEX `_categories_v_latest_idx` ON `_categories_v` (`latest`);

-- Categories versions locales table
CREATE TABLE `_categories_v_locales` (
  `title` text NOT NULL,
  `id` integer PRIMARY KEY NOT NULL,
  `_locale` text NOT NULL,
  `_parent_id` integer NOT NULL,
  FOREIGN KEY (`_parent_id`) REFERENCES `_categories_v`(`id`) ON UPDATE no action ON DELETE cascade
);
CREATE UNIQUE INDEX `_categories_v_locales_locale_parent_id_unique` ON `_categories_v_locales` (`_locale`,`_parent_id`);

-- Products versions table
CREATE TABLE `_products_v` (
  `id` integer PRIMARY KEY NOT NULL,
  `parent_id` integer,
  `version_slug` text NOT NULL,
  `version_pricing_uah` numeric NOT NULL,
  `version_pricing_eur` numeric,
  `version_pricing_usd` numeric,
  `version_category_id` integer,
  `version_in_stock` integer DEFAULT true,
  `version__status` text DEFAULT 'draft',
  `version_updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  `version_created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  `created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  `updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  `snapshot` integer,
  `published_locale` text,
  `latest` integer,
  `autosave` integer,
  FOREIGN KEY (`parent_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE set null,
  FOREIGN KEY (`version_category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE set null
);
CREATE INDEX `_products_v_parent_idx` ON `_products_v` (`parent_id`);
CREATE INDEX `_products_v_version_slug_idx` ON `_products_v` (`version_slug`);
CREATE INDEX `_products_v_version__status_idx` ON `_products_v` (`version__status`);
CREATE INDEX `_products_v_version_updated_at_idx` ON `_products_v` (`version_updated_at`);
CREATE INDEX `_products_v_version_created_at_idx` ON `_products_v` (`version_created_at`);
CREATE INDEX `_products_v_created_at_idx` ON `_products_v` (`created_at`);
CREATE INDEX `_products_v_updated_at_idx` ON `_products_v` (`updated_at`);
CREATE INDEX `_products_v_snapshot_idx` ON `_products_v` (`snapshot`);
CREATE INDEX `_products_v_published_locale_idx` ON `_products_v` (`published_locale`);
CREATE INDEX `_products_v_latest_idx` ON `_products_v` (`latest`);

-- Products versions locales table
CREATE TABLE `_products_v_locales` (
  `title` text NOT NULL,
  `description` text,
  `materials` text,
  `id` integer PRIMARY KEY NOT NULL,
  `_locale` text NOT NULL,
  `_parent_id` integer NOT NULL,
  FOREIGN KEY (`_parent_id`) REFERENCES `_products_v`(`id`) ON UPDATE no action ON DELETE cascade
);
CREATE UNIQUE INDEX `_products_v_locales_locale_parent_id_unique` ON `_products_v_locales` (`_locale`,`_parent_id`);

-- Products versions images sub-table
CREATE TABLE `_products_v_version_images` (
  `_order` integer NOT NULL,
  `_parent_id` integer NOT NULL,
  `id` text PRIMARY KEY NOT NULL,
  `image_id` integer,
  FOREIGN KEY (`image_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null,
  FOREIGN KEY (`_parent_id`) REFERENCES `_products_v`(`id`) ON UPDATE no action ON DELETE cascade
);
CREATE INDEX `_products_v_version_images_order_idx` ON `_products_v_version_images` (`_order`);
CREATE INDEX `_products_v_version_images_parent_id_idx` ON `_products_v_version_images` (`_parent_id`);
CREATE INDEX `_products_v_version_images_image_idx` ON `_products_v_version_images` (`image_id`);

-- Products versions sizes sub-table
CREATE TABLE `_products_v_version_sizes` (
  `order` integer NOT NULL,
  `parent_id` integer NOT NULL,
  `value` text,
  `id` integer PRIMARY KEY NOT NULL,
  FOREIGN KEY (`parent_id`) REFERENCES `_products_v`(`id`) ON UPDATE no action ON DELETE cascade
);
CREATE INDEX `_products_v_version_sizes_order_idx` ON `_products_v_version_sizes` (`order`);
CREATE INDEX `_products_v_version_sizes_parent_idx` ON `_products_v_version_sizes` (`parent_id`);

-- Add version FK columns to payload_locked_documents_rels
ALTER TABLE `payload_locked_documents_rels` ADD COLUMN `_categories_v_id` integer REFERENCES `_categories_v`(`id`) ON DELETE cascade;
ALTER TABLE `payload_locked_documents_rels` ADD COLUMN `_products_v_id` integer REFERENCES `_products_v`(`id`) ON DELETE cascade;
CREATE INDEX `payload_locked_documents_rels__categories_v_id_idx` ON `payload_locked_documents_rels` (`_categories_v_id`);
CREATE INDEX `payload_locked_documents_rels__products_v_id_idx` ON `payload_locked_documents_rels` (`_products_v_id`);

-- Mark migration as applied
INSERT INTO payload_migrations (name, batch, updated_at, created_at) VALUES ('20260224_010000', 3, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'), strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
