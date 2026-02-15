import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
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
    },
    {
      name: 'breadcrumbs',
      type: 'text',
      defaultValue: 'всі товари',
      localized: true,
    },
  ],
}
