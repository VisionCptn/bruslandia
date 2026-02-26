-- Add _status to navbar and settings for draft support
ALTER TABLE `navbar` ADD COLUMN `_status` text DEFAULT 'draft';
ALTER TABLE `settings` ADD COLUMN `_status` text DEFAULT 'draft';

-- Navbar versions table
CREATE TABLE `_navbar_v` (
  `id` integer PRIMARY KEY NOT NULL,
  `version_heading` text,
  `version__status` text DEFAULT 'draft',
  `version_updated_at` text,
  `version_created_at` text,
  `created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  `updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  `snapshot` integer,
  `published_locale` text,
  `latest` integer,
  `autosave` integer
);
CREATE INDEX `_navbar_v_version__status_idx` ON `_navbar_v` (`version__status`);
CREATE INDEX `_navbar_v_created_at_idx` ON `_navbar_v` (`created_at`);
CREATE INDEX `_navbar_v_updated_at_idx` ON `_navbar_v` (`updated_at`);
CREATE INDEX `_navbar_v_snapshot_idx` ON `_navbar_v` (`snapshot`);
CREATE INDEX `_navbar_v_published_locale_idx` ON `_navbar_v` (`published_locale`);
CREATE INDEX `_navbar_v_latest_idx` ON `_navbar_v` (`latest`);

-- Navbar versions menu_items sub-table
CREATE TABLE `_navbar_v_version_menu_items` (
  `_order` integer NOT NULL,
  `_parent_id` integer NOT NULL,
  `id` text PRIMARY KEY NOT NULL,
  `label` text NOT NULL,
  `link_type` text DEFAULT 'page',
  `link_new_tab` integer DEFAULT false,
  `link_url` text,
  `link_page_id` integer,
  FOREIGN KEY (`_parent_id`) REFERENCES `_navbar_v`(`id`) ON UPDATE no action ON DELETE cascade
);
CREATE INDEX `_navbar_v_version_menu_items_order_idx` ON `_navbar_v_version_menu_items` (`_order`);
CREATE INDEX `_navbar_v_version_menu_items_parent_id_idx` ON `_navbar_v_version_menu_items` (`_parent_id`);

-- Navbar versions menu_items_children sub-table
CREATE TABLE `_navbar_v_version_menu_items_children` (
  `_order` integer NOT NULL,
  `_parent_id` text NOT NULL,
  `id` text PRIMARY KEY NOT NULL,
  `label` text NOT NULL,
  `link_type` text DEFAULT 'page',
  `link_new_tab` integer DEFAULT false,
  `link_url` text,
  `link_page_id` integer,
  FOREIGN KEY (`_parent_id`) REFERENCES `_navbar_v_version_menu_items`(`id`) ON UPDATE no action ON DELETE cascade
);
CREATE INDEX `_navbar_v_version_menu_items_children_order_idx` ON `_navbar_v_version_menu_items_children` (`_order`);
CREATE INDEX `_navbar_v_version_menu_items_children_parent_id_idx` ON `_navbar_v_version_menu_items_children` (`_parent_id`);

-- Settings versions table
CREATE TABLE `_settings_v` (
  `id` integer PRIMARY KEY NOT NULL,
  `version_instagram_url` text,
  `version_contact_email` text,
  `version__status` text DEFAULT 'draft',
  `version_updated_at` text,
  `version_created_at` text,
  `created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  `updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  `snapshot` integer,
  `published_locale` text,
  `latest` integer,
  `autosave` integer
);
CREATE INDEX `_settings_v_version__status_idx` ON `_settings_v` (`version__status`);
CREATE INDEX `_settings_v_created_at_idx` ON `_settings_v` (`created_at`);
CREATE INDEX `_settings_v_updated_at_idx` ON `_settings_v` (`updated_at`);
CREATE INDEX `_settings_v_snapshot_idx` ON `_settings_v` (`snapshot`);
CREATE INDEX `_settings_v_published_locale_idx` ON `_settings_v` (`published_locale`);
CREATE INDEX `_settings_v_latest_idx` ON `_settings_v` (`latest`);

-- Settings versions locales table
CREATE TABLE `_settings_v_locales` (
  `site_title` text DEFAULT 'brys',
  `footer_text` text,
  `breadcrumbs` text DEFAULT 'всі товари',
  `ui_order_success_title` text,
  `ui_order_success_message` text,
  `ui_back_to_home` text,
  `ui_select_size` text,
  `ui_size_label` text,
  `ui_add_to_cart` text,
  `ui_category_empty` text,
  `ui_cart_empty` text,
  `ui_continue_shopping` text,
  `ui_cart_total` text,
  `ui_checkout` text,
  `ui_processing` text,
  `ui_subtotal` text,
  `ui_shipping` text,
  `ui_total` text,
  `ui_contact_info` text,
  `ui_subscribe_newsletter` text,
  `ui_country` text,
  `ui_first_name` text,
  `ui_last_name` text,
  `ui_middle_name` text,
  `ui_address` text,
  `ui_postal_code` text,
  `ui_city` text,
  `ui_phone` text,
  `ui_save_address` text,
  `ui_shipping_warning` text,
  `ui_payment_method` text,
  `ui_payment_secure` text,
  `id` integer PRIMARY KEY NOT NULL,
  `_locale` text NOT NULL,
  `_parent_id` integer NOT NULL,
  FOREIGN KEY (`_parent_id`) REFERENCES `_settings_v`(`id`) ON UPDATE no action ON DELETE cascade
);
CREATE UNIQUE INDEX `_settings_v_locales_locale_parent_id_unique` ON `_settings_v_locales` (`_locale`,`_parent_id`);

-- Mark migration as applied
INSERT INTO payload_migrations (name, batch, updated_at, created_at) VALUES ('20260226_000000', 4, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'), strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
