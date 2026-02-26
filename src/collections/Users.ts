import type { CollectionConfig } from 'payload'
import { isSuperAdmin } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    // Only superAdmins can see the Users collection in admin panel
    hidden: ({ user }) => user?.role !== 'superAdmin',
  },
  auth: true,
  access: {
    read: isSuperAdmin,
    create: isSuperAdmin,
    update: isSuperAdmin,
    delete: isSuperAdmin,
    admin: ({ req: { user } }) => (user as any)?.role === 'superAdmin' || (user as any)?.role === 'orderManager',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      options: [
        { label: 'Super Admin', value: 'superAdmin' },
        { label: 'Order Manager', value: 'orderManager' },
        { label: 'User', value: 'user' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
