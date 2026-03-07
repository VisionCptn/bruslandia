import type { CollectionConfig } from 'payload'

export const Newsletter: CollectionConfig = {
  slug: 'newsletter',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'subscribedAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      const role = (user as any)?.role
      return role === 'superAdmin' || role === 'orderManager'
    },
    create: () => true,
    update: () => false,
    delete: ({ req: { user } }) => {
      if (!user) return false
      return (user as any)?.role === 'superAdmin'
    },
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'subscribedAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'unsubscribeToken',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
  ],
}
