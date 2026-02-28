import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'customerEmail', 'total', 'status', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      const role = (user as any)?.role
      if (role === 'superAdmin' || role === 'orderManager') return true
      // Match all orders placed with the user's email
      return { customerEmail: { equals: user.email } }
    },
    create: () => true,
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Customer',
          fields: [
            {
              name: 'customerEmail',
              type: 'email',
              required: true,
            },
            {
              name: 'subscribeToNewsletter',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Підписатись на розсилку',
              },
            },
          ],
        },
        {
          label: 'Items',
          fields: [
            {
              name: 'items',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [
                {
                  name: 'product',
                  type: 'relationship',
                  relationTo: 'products',
                  required: true,
                },
                {
                  name: 'productTitle',
                  type: 'text',
                  admin: {
                    description: 'Product title at time of purchase',
                  },
                },
                {
                  name: 'quantity',
                  type: 'number',
                  required: true,
                  min: 1,
                  defaultValue: 1,
                },
                {
                  name: 'size',
                  type: 'text',
                },
                {
                  name: 'priceAtPurchase',
                  type: 'number',
                  required: true,
                  admin: {
                    description: 'Price at time of purchase',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Shipping',
          fields: [
            {
              name: 'shippingAddress',
              type: 'group',
              fields: [
                {
                  name: 'country',
                  type: 'text',
                  required: true,
                  defaultValue: 'Україна',
                },
                {
                  name: 'firstName',
                  type: 'text',
                  required: true,
                  label: "Ім'я",
                },
                {
                  name: 'middleName',
                  type: 'text',
                  label: 'По батькові',
                },
                {
                  name: 'lastName',
                  type: 'text',
                  required: true,
                  label: 'Прізвище',
                },
                {
                  name: 'city',
                  type: 'text',
                  required: true,
                  label: 'Місто',
                },
                {
                  name: 'postalCode',
                  type: 'text',
                  label: 'Поштовий індекс',
                },
                {
                  name: 'phone',
                  type: 'text',
                  required: true,
                  label: 'Телефон',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        position: 'sidebar',
        description: 'Total in UAH',
      },
    },
    {
      name: 'paymentStatus',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Created', value: 'created' },
        { label: 'Processing', value: 'processing' },
        { label: 'Hold', value: 'hold' },
        { label: 'Success', value: 'success' },
        { label: 'Failure', value: 'failure' },
        { label: 'Reversed', value: 'reversed' },
        { label: 'Expired', value: 'expired' },
        { label: 'Cancelled', value: 'cancel' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'monoInvoiceId',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Monobank invoice ID',
      },
    },
    {
      name: 'receipt',
      type: 'json',
      admin: {
        readOnly: true,
        description: 'Monobank payment receipt',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && !data.orderNumber) {
          data.orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
        }
        return data
      },
    ],
  },
}
