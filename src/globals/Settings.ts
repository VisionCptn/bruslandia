import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => (user as any)?.role === 'superAdmin',
  },
  fields: [
    {
      name: 'siteTitle',
      type: 'text',
      defaultValue: 'brys',
      localized: true,
    },
    {
      name: 'instagramUrl',
      type: 'text',
      defaultValue: 'https://www.instagram.com/martaleshak/',
      admin: {
        description: 'Full Instagram URL',
      },
    },
    {
      name: 'footerText',
      type: 'textarea',
      localized: true,
      defaultValue:
        'це місце, де мерч дрепає тебе по серцю, поки пакується твій подарунок, а домашні дрібниці муркочуть у кутку й дивляться на тебе з інтелігентною підозрою.',
    },
    {
      name: 'contactEmail',
      type: 'email',
      defaultValue: 'hello@bryslandia.com',
      admin: {
        description: 'Контактний емейл',
      },
    },
    {
      name: 'breadcrumbs',
      type: 'text',
      defaultValue: 'всі товари',
      localized: true,
    },
    {
      name: 'eyesLabel',
      type: 'text',
      localized: true,
      defaultValue: 'ця рись бачить тебе наскрізь',
      admin: {
        description: 'Tooltip shown on hover over the eyes icon in the header',
      },
    },
    {
      name: 'ui',
      type: 'group',
      label: 'UI Strings',
      admin: {
        description: 'Translatable text strings used across the frontend',
      },
      fields: [
        // Order Success
        {
          type: 'collapsible',
          label: 'Order Success',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'orderSuccessTitle',
              type: 'text',
              localized: true,
              defaultValue: 'Брись дякує за ваше замовлення,',
            },
            {
              name: 'orderSuccessTitleTwo',
              type: 'text',
              localized: true,
              defaultValue: 'і ви собі теж подякуйте',
            },
            {
              name: 'backToHome',
              type: 'text',
              localized: true,
              defaultValue: 'повернутися на головну',
            },
          ],
        },
        // Product
        {
          type: 'collapsible',
          label: 'Product',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'selectSize',
              type: 'text',
              localized: true,
              defaultValue: 'Будь ласка, оберіть розмір',
            },
            {
              name: 'sizeLabel',
              type: 'text',
              localized: true,
              defaultValue: 'Розмір:',
            },
            {
              name: 'addToCart',
              type: 'text',
              localized: true,
              defaultValue: 'додати в корзину',
            },
          ],
        },
        // Category
        {
          type: 'collapsible',
          label: 'Category',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'categoryEmpty',
              type: 'text',
              localized: true,
              defaultValue: 'В цій категорії ще немає товарів',
            },
          ],
        },
        // Cart
        {
          type: 'collapsible',
          label: 'Cart',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'cartEmpty',
              type: 'text',
              localized: true,
              defaultValue: 'Корзина порожня',
            },
            {
              name: 'continueShopping',
              type: 'text',
              localized: true,
              defaultValue: 'продовжити покупки',
            },
            {
              name: 'cartTotal',
              type: 'text',
              localized: true,
              defaultValue: 'Сума',
            },
            {
              name: 'checkout',
              type: 'text',
              localized: true,
              defaultValue: 'Оформити замовлення',
            },
            {
              name: 'processing',
              type: 'text',
              localized: true,
              defaultValue: 'обробка...',
            },
          ],
        },
        // Order Summary
        {
          type: 'collapsible',
          label: 'Order Summary',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'subtotal',
              type: 'text',
              localized: true,
              defaultValue: 'Загальна вартість',
            },
            {
              name: 'shipping',
              type: 'text',
              localized: true,
              defaultValue: 'Вартість доставки',
            },
            {
              name: 'total',
              type: 'text',
              localized: true,
              defaultValue: 'ВСЬОГО',
            },
          ],
        },
        // Checkout — Contact
        {
          type: 'collapsible',
          label: 'Checkout — Contact',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'contactInfo',
              type: 'text',
              localized: true,
              defaultValue: 'контактна інформація',
            },
            {
              name: 'subscribeNewsletter',
              type: 'text',
              localized: true,
              defaultValue: 'Підписатися на розсилку новин та спеціальних пропозицій',
            },
          ],
        },
        // Checkout — Shipping Address
        {
          type: 'collapsible',
          label: 'Checkout — Shipping Address',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'country',
              type: 'text',
              localized: true,
              defaultValue: 'Країна',
            },
            {
              name: 'firstName',
              type: 'text',
              localized: true,
              defaultValue: "Ім'я",
            },
            {
              name: 'lastName',
              type: 'text',
              localized: true,
              defaultValue: 'Прізвище',
            },
            {
              name: 'middleName',
              type: 'text',
              localized: true,
              defaultValue: "Ім'я по батькові (для доставки «Нова Пошта»)",
            },
            {
              name: 'address',
              type: 'text',
              localized: true,
              defaultValue: 'Адреса доставки або № відділення «Нова Пошта»',
            },
            {
              name: 'postalCode',
              type: 'text',
              localized: true,
              defaultValue: 'Поштовий індекс',
            },
            {
              name: 'city',
              type: 'text',
              localized: true,
              defaultValue: 'Місто',
            },
            {
              name: 'phone',
              type: 'text',
              localized: true,
              defaultValue: 'Телефон',
            },
            {
              name: 'saveAddress',
              type: 'text',
              localized: true,
              defaultValue: 'Зберегти ці дані для наступного разу',
            },
            {
              name: 'shippingWarning',
              type: 'textarea',
              localized: true,
              defaultValue:
                'Зверніть увагу, що міжнародні замовлення можуть обкладатися митними зборами та податками країни призначення. Вартість доставки не включає витрати на розмитнення. Рекомендуємо заздалегідь ознайомитися з митними правилами та тарифами у вашій країні, оскільки ми не несемо відповідальності за ці витрати. Дякуємо за розуміння!',
            },
          ],
        },
        // Checkout — Payment
        {
          type: 'collapsible',
          label: 'Checkout — Payment',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'paymentMethod',
              type: 'text',
              localized: true,
              defaultValue: 'Спосіб оплати',
            },
            {
              name: 'paymentSecure',
              type: 'text',
              localized: true,
              defaultValue: 'Всі транзакції захищені та зашифровані.',
            },
          ],
        },
      ],
    },
  ],
}
