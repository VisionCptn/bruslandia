-- Add user profile fields
ALTER TABLE `users` ADD COLUMN `first_name` text;
ALTER TABLE `users` ADD COLUMN `last_name` text;
ALTER TABLE `users` ADD COLUMN `role` text DEFAULT 'user';

-- User addresses sub-table
CREATE TABLE `users_addresses` (
  `_order` integer NOT NULL,
  `_parent_id` integer NOT NULL,
  `id` text PRIMARY KEY NOT NULL,
  `label` text,
  `country` text DEFAULT 'Україна',
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `middle_name` text,
  `city` text NOT NULL,
  `postal_code` text,
  `phone` text NOT NULL,
  `is_default` integer DEFAULT false,
  FOREIGN KEY (`_parent_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
CREATE INDEX `users_addresses_order_idx` ON `users_addresses` (`_order`);
CREATE INDEX `users_addresses_parent_id_idx` ON `users_addresses` (`_parent_id`);

-- Add user relationship to orders
ALTER TABLE `orders` ADD COLUMN `user_id` integer REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null;
CREATE INDEX `orders_user_idx` ON `orders` (`user_id`);

-- Mark migration as applied
INSERT INTO payload_migrations (name, batch, updated_at, created_at) VALUES ('20260227_000000', 5, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'), strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
