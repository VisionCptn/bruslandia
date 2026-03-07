CREATE TABLE "users_addresses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" text PRIMARY KEY NOT NULL,
  	"label" text,
  	"country" text DEFAULT 'Україна',
  	"first_name" text NOT NULL,
  	"last_name" text NOT NULL,
  	"middle_name" text,
  	"city" text NOT NULL,
  	"delivery_address" text,
  	"postal_code" text,
  	"phone" text NOT NULL,
  	"is_default" integer DEFAULT false
  );
CREATE INDEX "users_addresses_order_idx" ON "users_addresses" ("_order");
CREATE INDEX "users_addresses_parent_id_idx" ON "users_addresses" ("_parent_id");
CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" text PRIMARY KEY NOT NULL,
  	"created_at" text,
  	"expires_at" text NOT NULL
  );
CREATE INDEX "users_sessions_order_idx" ON "users_sessions" ("_order");
CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" ("_parent_id");
CREATE TABLE "users" (
  	"id" integer PRIMARY KEY NOT NULL,
  	"role" text DEFAULT 'user' NOT NULL,
  	"first_name" text,
  	"last_name" text,
  	"updated_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	"created_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	"email" text NOT NULL,
  	"reset_password_token" text,
  	"reset_password_expiration" text,
  	"salt" text,
  	"hash" text,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" text
  );
CREATE INDEX "users_updated_at_idx" ON "users" ("updated_at");
CREATE INDEX "users_created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX "users_email_idx" ON "users" ("email");
CREATE TABLE "media" (
  	"id" integer PRIMARY KEY NOT NULL,
  	"alt" text NOT NULL,
  	"updated_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	"created_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	"url" text,
  	"thumbnail_u_r_l" text,
  	"filename" text,
  	"mime_type" text,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric
  );
CREATE INDEX "media_updated_at_idx" ON "media" ("updated_at");
CREATE INDEX "media_created_at_idx" ON "media" ("created_at");
CREATE UNIQUE INDEX "media_filename_idx" ON "media" ("filename");
CREATE TABLE "categories" (
  	"id" integer PRIMARY KEY NOT NULL,
  	"slug" text,
  	"image_id" integer,
  	"order" numeric DEFAULT 0,
  	"is_active" integer DEFAULT true,
  	"updated_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	"created_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	"_status" text DEFAULT 'draft'
  );
CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" ("slug");
CREATE INDEX "categories_image_idx" ON "categories" ("image_id");
CREATE INDEX "categories_updated_at_idx" ON "categories" ("updated_at");
CREATE INDEX "categories_created_at_idx" ON "categories" ("created_at");
CREATE INDEX "categories__status_idx" ON "categories" ("_status");
CREATE TABLE "categories_locales" (
  	"title" text,
  	"id" integer PRIMARY KEY NOT NULL,
  	"_locale" text NOT NULL,
  	"_parent_id" integer NOT NULL
  );
CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" ("_locale","_parent_id");
CREATE TABLE "_categories_v" (
  	"id" integer PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" text,
  	"version_image_id" integer,
  	"version_order" numeric DEFAULT 0,
  	"version_is_active" integer DEFAULT true,
  	"version_updated_at" text,
  	"version_created_at" text,
  	"version__status" text DEFAULT 'draft',
  	"created_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	"updated_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	"snapshot" integer,
  	"published_locale" text,
  	"latest" integer
  );
CREATE INDEX "_categories_v_parent_idx" ON "_categories_v" ("parent_id");
CREATE INDEX "_categories_v_version_version_slug_idx" ON "_categories_v" ("version_slug");
CREATE INDEX "_categories_v_version_version_image_idx" ON "_categories_v" ("version_image_id");
CREATE INDEX "_categories_v_version_version_updated_at_idx" ON "_categories_v" ("version_updated_at");
CREATE INDEX "_categories_v_version_version_created_at_idx" ON "_categories_v" ("version_created_at");
CREATE INDEX "_categories_v_version_version__status_idx" ON "_categories_v" ("version__status");
CREATE INDEX "_categories_v_created_at_idx" ON "_categories_v" ("created_at");
CREATE INDEX "_categories_v_updated_at_idx" ON "_categories_v" ("updated_at");
CREATE INDEX "_categories_v_snapshot_idx" ON "_categories_v" ("snapshot");
CREATE INDEX "_categories_v_published_locale_idx" ON "_categories_v" ("published_locale");
CREATE INDEX "_categories_v_latest_idx" ON "_categories_v" ("latest");
CREATE TABLE "_categories_v_locales" (
  	"version_title" text,
  	"id" integer PRIMARY KEY NOT NULL,
  	"_locale" text NOT NULL,
  	"_parent_id" integer NOT NULL
  );
CREATE UNIQUE INDEX "_categories_v_locales_locale_parent_id_unique" ON "_categories_v_locales" ("_locale","_parent_id");
CREATE TABLE "products_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" text PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
CREATE INDEX "products_images_order_idx" ON "products_images" ("_order");
CREATE INDEX "products_images_parent_id_idx" ON "products_images" ("_parent_id");
CREATE INDEX "products_images_image_idx" ON "products_images" ("image_id");
CREATE TABLE "products_sizes" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" text,
  	"id" integer PRIMARY KEY NOT NULL
  );
CREATE INDEX "products_sizes_order_idx" ON "products_sizes" ("order");
CREATE INDEX "products_sizes_parent_idx" ON "products_sizes" ("parent_id");
CREATE TABLE "products" (
  	"id" integer PRIMARY KEY NOT NULL,
  	"slug" text,
  	"pricing_uah" numeric,
  	"pricing_eur" numeric,
  	"pricing_usd" numeric,
  	"category_id" integer,
  	"in_stock" integer DEFAULT true,
  	"updated_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	"created_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	"_status" text DEFAULT 'draft'
  );
CREATE UNIQUE INDEX "products_slug_idx" ON "products" ("slug");
CREATE INDEX "products_category_idx" ON "products" ("category_id");
CREATE INDEX "products_updated_at_idx" ON "products" ("updated_at");
CREATE INDEX "products_created_at_idx" ON "products" ("created_at");
CREATE INDEX "products__status_idx" ON "products" ("_status");
CREATE TABLE "products_locales" (
  	"title" text,
  	"description" text,
  	"materials" text,
  	"id" integer PRIMARY KEY NOT NULL,
  	"_locale" text NOT NULL,
  	"_parent_id" integer NOT NULL
  );
CREATE UNIQUE INDEX "products_locales_locale_parent_id_unique" ON "products_locales" ("_locale","_parent_id");
CREATE TABLE "_products_v_version_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" integer PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" text
  );
CREATE INDEX "_products_v_version_images_order_idx" ON "_products_v_version_images" ("_order");
CREATE INDEX "_products_v_version_images_parent_id_idx" ON "_products_v_version_images" ("_parent_id");
CREATE INDEX "_products_v_version_images_image_idx" ON "_products_v_version_images" ("image_id");
CREATE TABLE "_products_v_version_sizes" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" text,
  	"id" integer PRIMARY KEY NOT NULL
  );
CREATE INDEX "_products_v_version_sizes_order_idx" ON "_products_v_version_sizes" ("order");
CREATE INDEX "_products_v_version_sizes_parent_idx" ON "_products_v_version_sizes" ("parent_id");
CREATE TABLE "_products_v" (
  	"id" integer PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" text,
  	"version_pricing_uah" numeric,
  	"version_pricing_eur" numeric,
  	"version_pricing_usd" numeric,
  	"version_category_id" integer,
  	"version_in_stock" integer DEFAULT true,
  	"version_updated_at" text,
  	"version_created_at" text,
  	"version__status" text DEFAULT 'draft',
  	"created_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	"updated_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	"snapshot" integer,
  	"published_locale" text,
  	"latest" integer
  );
CREATE INDEX "_products_v_parent_idx" ON "_products_v" ("parent_id");
CREATE INDEX "_products_v_version_version_slug_idx" ON "_products_v" ("version_slug");
CREATE INDEX "_products_v_version_version_category_idx" ON "_products_v" ("version_category_id");
CREATE INDEX "_products_v_version_version_updated_at_idx" ON "_products_v" ("version_updated_at");
CREATE INDEX "_products_v_version_version_created_at_idx" ON "_products_v" ("version_created_at");
CREATE INDEX "_products_v_version_version__status_idx" ON "_products_v" ("version__status");
CREATE INDEX "_products_v_created_at_idx" ON "_products_v" ("created_at");
CREATE INDEX "_products_v_updated_at_idx" ON "_products_v" ("updated_at");
CREATE INDEX "_products_v_snapshot_idx" ON "_products_v" ("snapshot");
CREATE INDEX "_products_v_published_locale_idx" ON "_products_v" ("published_locale");
CREATE INDEX "_products_v_latest_idx" ON "_products_v" ("latest");
CREATE TABLE "_products_v_locales" (
  	"version_title" text,
  	"version_description" text,
  	"version_materials" text,
  	"id" integer PRIMARY KEY NOT NULL,
  	"_locale" text NOT NULL,
  	"_parent_id" integer NOT NULL
  );
CREATE UNIQUE INDEX "_products_v_locales_locale_parent_id_unique" ON "_products_v_locales" ("_locale","_parent_id");
CREATE TABLE "orders_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" text PRIMARY KEY NOT NULL,
  	"product_id" integer NOT NULL,
  	"product_title" text,
  	"quantity" numeric DEFAULT 1 NOT NULL,
  	"size" text,
  	"price_at_purchase" numeric NOT NULL
  );
CREATE INDEX "orders_items_order_idx" ON "orders_items" ("_order");
CREATE INDEX "orders_items_parent_id_idx" ON "orders_items" ("_parent_id");
CREATE INDEX "orders_items_product_idx" ON "orders_items" ("product_id");
CREATE TABLE "orders" (
  	"id" integer PRIMARY KEY NOT NULL,
  	"order_number" text NOT NULL,
  	"status" text DEFAULT 'pending' NOT NULL,
  	"customer_email" text NOT NULL,
  	"subscribe_to_newsletter" integer DEFAULT false,
  	"shipping_address_country" text DEFAULT 'Україна' NOT NULL,
  	"shipping_address_first_name" text NOT NULL,
  	"shipping_address_middle_name" text,
  	"shipping_address_last_name" text NOT NULL,
  	"shipping_address_city" text NOT NULL,
  	"shipping_address_delivery_address" text,
  	"shipping_address_postal_code" text,
  	"shipping_address_phone" text NOT NULL,
  	"total" numeric NOT NULL,
  	"payment_status" text DEFAULT 'pending',
  	"user_id" integer,
  	"mono_invoice_id" text,
  	"receipt" text,
  	"notes" text,
  	"updated_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	"created_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
CREATE UNIQUE INDEX "orders_order_number_idx" ON "orders" ("order_number");
CREATE INDEX "orders_user_idx" ON "orders" ("user_id");
CREATE INDEX "orders_updated_at_idx" ON "orders" ("updated_at");
CREATE INDEX "orders_created_at_idx" ON "orders" ("created_at");
CREATE TABLE "pages" (
  	"id" integer PRIMARY KEY NOT NULL,
  	"slug" text NOT NULL,
  	"updated_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	"created_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" ("slug");
CREATE INDEX "pages_updated_at_idx" ON "pages" ("updated_at");
CREATE INDEX "pages_created_at_idx" ON "pages" ("created_at");
CREATE TABLE "pages_locales" (
  	"title" text NOT NULL,
  	"content" text NOT NULL,
  	"id" integer PRIMARY KEY NOT NULL,
  	"_locale" text NOT NULL,
  	"_parent_id" integer NOT NULL
  );
CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" ("_locale","_parent_id");
CREATE TABLE "newsletter" (
  	"id" integer PRIMARY KEY NOT NULL,
  	"email" text NOT NULL,
  	"subscribed_at" text,
  	"unsubscribe_token" text,
  	"updated_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	"created_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
CREATE UNIQUE INDEX "newsletter_email_idx" ON "newsletter" ("email");
CREATE INDEX "newsletter_updated_at_idx" ON "newsletter" ("updated_at");
CREATE INDEX "newsletter_created_at_idx" ON "newsletter" ("created_at");
CREATE TABLE "payload_kv" (
  	"id" integer PRIMARY KEY NOT NULL,
  	"key" text NOT NULL,
  	"data" text NOT NULL
  );
CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" ("key");
CREATE TABLE "payload_locked_documents" (
  	"id" integer PRIMARY KEY NOT NULL,
  	"global_slug" text,
  	"updated_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	"created_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" ("global_slug");
CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" ("updated_at");
CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" ("created_at");
CREATE TABLE "payload_locked_documents_rels" (
  	"id" integer PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" text NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"products_id" integer,
  	"orders_id" integer,
  	"pages_id" integer,
  	"newsletter_id" integer
  );
CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" ("order");
CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" ("parent_id");
CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" ("path");
CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" ("users_id");
CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" ("media_id");
CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" ("categories_id");
CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" ("products_id");
CREATE INDEX "payload_locked_documents_rels_orders_id_idx" ON "payload_locked_documents_rels" ("orders_id");
CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" ("pages_id");
CREATE INDEX "payload_locked_documents_rels_newsletter_id_idx" ON "payload_locked_documents_rels" ("newsletter_id");
CREATE TABLE "payload_preferences" (
  	"id" integer PRIMARY KEY NOT NULL,
  	"key" text,
  	"value" text,
  	"updated_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	"created_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" ("key");
CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" ("updated_at");
CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");
CREATE TABLE "payload_preferences_rels" (
  	"id" integer PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" text NOT NULL,
  	"users_id" integer
  );
CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" ("users_id");
CREATE TABLE "payload_migrations" (
  	"id" integer PRIMARY KEY NOT NULL,
  	"name" text,
  	"batch" numeric,
  	"updated_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	"created_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" ("updated_at");
CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" ("created_at");
CREATE TABLE "settings" (
  	"id" integer PRIMARY KEY NOT NULL,
  	"instagram_url" text DEFAULT 'https://www.instagram.com/martaleshak/',
  	"contact_email" text DEFAULT 'hello@bryslandia.com',
  	"_status" text DEFAULT 'draft',
  	"updated_at" text,
  	"created_at" text
  );
CREATE INDEX "settings__status_idx" ON "settings" ("_status");
CREATE TABLE "settings_locales" (
  	"site_title" text DEFAULT 'brys',
  	"footer_text" text DEFAULT 'це місце, де мерч дрепає тебе по серцю, поки пакується твій подарунок, а домашні дрібниці муркочуть у кутку й дивляться на тебе з інтелігентною підозрою.',
  	"breadcrumbs" text DEFAULT 'всі товари',
  	"eyes_label" text DEFAULT 'ця рись бачить тебе наскрізь',
  	"ui_order_success_title" text DEFAULT 'Брись дякує за ваше замовлення,',
  	"ui_order_success_title_two" text DEFAULT 'і ви собі теж подякуйте',
  	"ui_back_to_home" text DEFAULT 'повернутися на головну',
  	"ui_select_size" text DEFAULT 'Будь ласка, оберіть розмір',
  	"ui_size_label" text DEFAULT 'Розмір:',
  	"ui_add_to_cart" text DEFAULT 'додати в корзину',
  	"ui_category_empty" text DEFAULT 'В цій категорії ще немає товарів',
  	"ui_cart_empty" text DEFAULT 'Корзина порожня',
  	"ui_continue_shopping" text DEFAULT 'продовжити покупки',
  	"ui_cart_total" text DEFAULT 'Сума',
  	"ui_checkout" text DEFAULT 'Оформити замовлення',
  	"ui_processing" text DEFAULT 'обробка...',
  	"ui_subtotal" text DEFAULT 'Загальна вартість',
  	"ui_shipping" text DEFAULT 'Вартість доставки',
  	"ui_total" text DEFAULT 'ВСЬОГО',
  	"ui_contact_info" text DEFAULT 'контактна інформація',
  	"ui_subscribe_newsletter" text DEFAULT 'Підписатися на розсилку новин та спеціальних пропозицій',
  	"ui_country" text DEFAULT 'Країна',
  	"ui_first_name" text DEFAULT 'Ім''я',
  	"ui_last_name" text DEFAULT 'Прізвище',
  	"ui_middle_name" text DEFAULT 'Ім''я по батькові (для доставки «Нова Пошта»)',
  	"ui_address" text DEFAULT 'Адреса доставки або № відділення «Нова Пошта»',
  	"ui_postal_code" text DEFAULT 'Поштовий індекс',
  	"ui_city" text DEFAULT 'Місто',
  	"ui_phone" text DEFAULT 'Телефон',
  	"ui_save_address" text DEFAULT 'Зберегти ці дані для наступного разу',
  	"ui_shipping_warning" text DEFAULT 'Зверніть увагу, що міжнародні замовлення можуть обкладатися митними зборами та податками країни призначення. Вартість доставки не включає витрати на розмитнення. Рекомендуємо заздалегідь ознайомитися з митними правилами та тарифами у вашій країні, оскільки ми не несемо відповідальності за ці витрати. Дякуємо за розуміння!',
  	"ui_payment_method" text DEFAULT 'Спосіб оплати',
  	"ui_payment_secure" text DEFAULT 'Всі транзакції захищені та зашифровані.',
  	"id" integer PRIMARY KEY NOT NULL,
  	"_locale" text NOT NULL,
  	"_parent_id" integer NOT NULL
  );
CREATE UNIQUE INDEX "settings_locales_locale_parent_id_unique" ON "settings_locales" ("_locale","_parent_id");
CREATE TABLE "_settings_v" (
  	"id" integer PRIMARY KEY NOT NULL,
  	"version_instagram_url" text DEFAULT 'https://www.instagram.com/martaleshak/',
  	"version_contact_email" text DEFAULT 'hello@bryslandia.com',
  	"version__status" text DEFAULT 'draft',
  	"version_updated_at" text,
  	"version_created_at" text,
  	"created_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	"updated_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	"snapshot" integer,
  	"published_locale" text,
  	"latest" integer
  );
CREATE INDEX "_settings_v_version_version__status_idx" ON "_settings_v" ("version__status");
CREATE INDEX "_settings_v_created_at_idx" ON "_settings_v" ("created_at");
CREATE INDEX "_settings_v_updated_at_idx" ON "_settings_v" ("updated_at");
CREATE INDEX "_settings_v_snapshot_idx" ON "_settings_v" ("snapshot");
CREATE INDEX "_settings_v_published_locale_idx" ON "_settings_v" ("published_locale");
CREATE INDEX "_settings_v_latest_idx" ON "_settings_v" ("latest");
CREATE TABLE "_settings_v_locales" (
  	"version_site_title" text DEFAULT 'brys',
  	"version_footer_text" text DEFAULT 'це місце, де мерч дрепає тебе по серцю, поки пакується твій подарунок, а домашні дрібниці муркочуть у кутку й дивляться на тебе з інтелігентною підозрою.',
  	"version_breadcrumbs" text DEFAULT 'всі товари',
  	"version_eyes_label" text DEFAULT 'ця рись бачить тебе наскрізь',
  	"version_ui_order_success_title" text DEFAULT 'Брись дякує за ваше замовлення,',
  	"version_ui_order_success_title_two" text DEFAULT 'і ви собі теж подякуйте',
  	"version_ui_back_to_home" text DEFAULT 'повернутися на головну',
  	"version_ui_select_size" text DEFAULT 'Будь ласка, оберіть розмір',
  	"version_ui_size_label" text DEFAULT 'Розмір:',
  	"version_ui_add_to_cart" text DEFAULT 'додати в корзину',
  	"version_ui_category_empty" text DEFAULT 'В цій категорії ще немає товарів',
  	"version_ui_cart_empty" text DEFAULT 'Корзина порожня',
  	"version_ui_continue_shopping" text DEFAULT 'продовжити покупки',
  	"version_ui_cart_total" text DEFAULT 'Сума',
  	"version_ui_checkout" text DEFAULT 'Оформити замовлення',
  	"version_ui_processing" text DEFAULT 'обробка...',
  	"version_ui_subtotal" text DEFAULT 'Загальна вартість',
  	"version_ui_shipping" text DEFAULT 'Вартість доставки',
  	"version_ui_total" text DEFAULT 'ВСЬОГО',
  	"version_ui_contact_info" text DEFAULT 'контактна інформація',
  	"version_ui_subscribe_newsletter" text DEFAULT 'Підписатися на розсилку новин та спеціальних пропозицій',
  	"version_ui_country" text DEFAULT 'Країна',
  	"version_ui_first_name" text DEFAULT 'Ім''я',
  	"version_ui_last_name" text DEFAULT 'Прізвище',
  	"version_ui_middle_name" text DEFAULT 'Ім''я по батькові (для доставки «Нова Пошта»)',
  	"version_ui_address" text DEFAULT 'Адреса доставки або № відділення «Нова Пошта»',
  	"version_ui_postal_code" text DEFAULT 'Поштовий індекс',
  	"version_ui_city" text DEFAULT 'Місто',
  	"version_ui_phone" text DEFAULT 'Телефон',
  	"version_ui_save_address" text DEFAULT 'Зберегти ці дані для наступного разу',
  	"version_ui_shipping_warning" text DEFAULT 'Зверніть увагу, що міжнародні замовлення можуть обкладатися митними зборами та податками країни призначення. Вартість доставки не включає витрати на розмитнення. Рекомендуємо заздалегідь ознайомитися з митними правилами та тарифами у вашій країні, оскільки ми не несемо відповідальності за ці витрати. Дякуємо за розуміння!',
  	"version_ui_payment_method" text DEFAULT 'Спосіб оплати',
  	"version_ui_payment_secure" text DEFAULT 'Всі транзакції захищені та зашифровані.',
  	"id" integer PRIMARY KEY NOT NULL,
  	"_locale" text NOT NULL,
  	"_parent_id" integer NOT NULL
  );
CREATE UNIQUE INDEX "_settings_v_locales_locale_parent_id_unique" ON "_settings_v_locales" ("_locale","_parent_id");
CREATE TABLE "navbar_menu_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" text NOT NULL,
  	"id" text PRIMARY KEY NOT NULL,
  	"label" text,
  	"link_type" text DEFAULT 'page',
  	"link_page_id" integer,
  	"link_url" text,
  	"link_new_tab" integer DEFAULT false
  );
CREATE INDEX "navbar_menu_items_children_order_idx" ON "navbar_menu_items_children" ("_order");
CREATE INDEX "navbar_menu_items_children_parent_id_idx" ON "navbar_menu_items_children" ("_parent_id");
CREATE INDEX "navbar_menu_items_children_link_link_page_idx" ON "navbar_menu_items_children" ("link_page_id");
CREATE TABLE "navbar_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" text PRIMARY KEY NOT NULL,
  	"label" text,
  	"link_type" text DEFAULT 'page',
  	"link_page_id" integer,
  	"link_url" text,
  	"link_new_tab" integer DEFAULT false
  );
CREATE INDEX "navbar_menu_items_order_idx" ON "navbar_menu_items" ("_order");
CREATE INDEX "navbar_menu_items_parent_id_idx" ON "navbar_menu_items" ("_parent_id");
CREATE INDEX "navbar_menu_items_link_link_page_idx" ON "navbar_menu_items" ("link_page_id");
CREATE TABLE "navbar" (
  	"id" integer PRIMARY KEY NOT NULL,
  	"heading" text,
  	"_status" text DEFAULT 'draft',
  	"updated_at" text,
  	"created_at" text
  );
CREATE INDEX "navbar__status_idx" ON "navbar" ("_status");
CREATE TABLE "_navbar_v_version_menu_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" integer PRIMARY KEY NOT NULL,
  	"label" text,
  	"link_type" text DEFAULT 'page',
  	"link_page_id" integer,
  	"link_url" text,
  	"link_new_tab" integer DEFAULT false,
  	"_uuid" text
  );
CREATE INDEX "_navbar_v_version_menu_items_children_order_idx" ON "_navbar_v_version_menu_items_children" ("_order");
CREATE INDEX "_navbar_v_version_menu_items_children_parent_id_idx" ON "_navbar_v_version_menu_items_children" ("_parent_id");
CREATE INDEX "_navbar_v_version_menu_items_children_link_link_page_idx" ON "_navbar_v_version_menu_items_children" ("link_page_id");
CREATE TABLE "_navbar_v_version_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" integer PRIMARY KEY NOT NULL,
  	"label" text,
  	"link_type" text DEFAULT 'page',
  	"link_page_id" integer,
  	"link_url" text,
  	"link_new_tab" integer DEFAULT false,
  	"_uuid" text
  );
CREATE INDEX "_navbar_v_version_menu_items_order_idx" ON "_navbar_v_version_menu_items" ("_order");
CREATE INDEX "_navbar_v_version_menu_items_parent_id_idx" ON "_navbar_v_version_menu_items" ("_parent_id");
CREATE INDEX "_navbar_v_version_menu_items_link_link_page_idx" ON "_navbar_v_version_menu_items" ("link_page_id");
CREATE TABLE "_navbar_v" (
  	"id" integer PRIMARY KEY NOT NULL,
  	"version_heading" text,
  	"version__status" text DEFAULT 'draft',
  	"version_updated_at" text,
  	"version_created_at" text,
  	"created_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	"updated_at" text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	"snapshot" integer,
  	"published_locale" text,
  	"latest" integer
  );
CREATE INDEX "_navbar_v_version_version__status_idx" ON "_navbar_v" ("version__status");
CREATE INDEX "_navbar_v_created_at_idx" ON "_navbar_v" ("created_at");
CREATE INDEX "_navbar_v_updated_at_idx" ON "_navbar_v" ("updated_at");
CREATE INDEX "_navbar_v_snapshot_idx" ON "_navbar_v" ("snapshot");
CREATE INDEX "_navbar_v_published_locale_idx" ON "_navbar_v" ("published_locale");
CREATE INDEX "_navbar_v_latest_idx" ON "_navbar_v" ("latest");
DROP TABLE "users_addresses";
DROP TABLE "users_sessions";
DROP TABLE "users";
DROP TABLE "media";
DROP TABLE "categories";
DROP TABLE "categories_locales";
DROP TABLE "_categories_v";
DROP TABLE "_categories_v_locales";
DROP TABLE "products_images";
DROP TABLE "products_sizes";
DROP TABLE "products";
DROP TABLE "products_locales";
DROP TABLE "_products_v_version_images";
DROP TABLE "_products_v_version_sizes";
DROP TABLE "_products_v";
DROP TABLE "_products_v_locales";
DROP TABLE "orders_items";
DROP TABLE "orders";
DROP TABLE "pages";
DROP TABLE "pages_locales";
DROP TABLE "newsletter";
DROP TABLE "payload_kv";
DROP TABLE "payload_locked_documents";
DROP TABLE "payload_locked_documents_rels";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";
DROP TABLE "settings";
DROP TABLE "settings_locales";
DROP TABLE "_settings_v";
DROP TABLE "_settings_v_locales";
DROP TABLE "navbar_menu_items_children";
DROP TABLE "navbar_menu_items";
DROP TABLE "navbar";
DROP TABLE "_navbar_v_version_menu_items_children";
DROP TABLE "_navbar_v_version_menu_items";
DROP TABLE "_navbar_v";
