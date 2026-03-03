import type { CollectionConfig } from 'payload'
import { isSuperAdmin } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    // Only superAdmins can see the Users collection in admin panel
    hidden: ({ user }) => user?.role !== 'superAdmin',
  },
  auth: {
    forgotPassword: {
      generateEmailHTML: async ({ token, user }: { token?: string; user?: Record<string, unknown> }) => {
        const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://bryslandia.com'
        const resetURL = `${siteUrl}/account/reset?token=${token}`
        const name = (user?.firstName as string) || ''
        return `
          <p>Привіт${name ? `, ${name}` : ''}!</p>
          <p>Ви запросили скидання пароля для вашого акаунту.</p>
          <p><a href="${resetURL}" style="background:#1a1a1a;color:#fff;padding:12px 24px;text-decoration:none;display:inline-block;">Скинути пароль</a></p>
          <p>Якщо ви не запитували скидання — проігноруйте цей лист.</p>
        `
      },
      generateEmailSubject: () => 'Скидання пароля — Bryslandia',
    },
  },
  access: {
    read: ({ req: { user } }) => {
      if ((user as any)?.role === 'superAdmin') return true
      if (user) return { id: { equals: user.id } }
      return false
    },
    create: () => true, // Allow public registration
    update: ({ req: { user } }) => {
      if ((user as any)?.role === 'superAdmin') return true
      if (user) return { id: { equals: user.id } }
      return false
    },
    delete: isSuperAdmin,
    admin: ({ req: { user } }) =>
      (user as any)?.role === 'superAdmin' || (user as any)?.role === 'orderManager',
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
    {
      name: 'firstName',
      type: 'text',
      label: "Ім'я",
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Прізвище',
    },
    {
      name: 'addresses',
      type: 'array',
      label: 'Адреси',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Назва',
        },
        {
          name: 'country',
          type: 'text',
          label: 'Країна',
          defaultValue: 'Україна',
        },
        {
          name: 'firstName',
          type: 'text',
          label: "Ім'я",
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          label: 'Прізвище',
          required: true,
        },
        {
          name: 'middleName',
          type: 'text',
          label: 'По батькові',
        },
        {
          name: 'city',
          type: 'text',
          label: 'Місто',
          required: true,
        },
        {
          name: 'deliveryAddress',
          type: 'text',
          label: 'Адреса доставки або № відділення «Нова Пошта»',
        },
        {
          name: 'postalCode',
          type: 'text',
          label: 'Поштовий індекс',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Телефон',
          required: true,
        },
        {
          name: 'isDefault',
          type: 'checkbox',
          label: 'За замовчуванням',
          defaultValue: false,
        },
      ],
    },
  ],
}
