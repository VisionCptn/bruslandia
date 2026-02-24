import type { GlobalConfig, Field } from 'payload'

const linkField: Field = {
  name: 'link',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'radio',
      required: true,
      defaultValue: 'page',
      options: [
        { label: 'Page', value: 'page' },
        { label: 'Custom URL', value: 'custom' },
      ],
    },
    {
      name: 'page',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'page',
      },
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
    },
    {
      name: 'newTab',
      label: 'Open in new tab',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}

export const Navbar: GlobalConfig = {
  slug: 'navbar',
  label: 'Navbar',
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'heading',
      label: 'Navbar Heading',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional heading displayed above or inside the navbar',
      },
    },
    {
      name: 'menuItems',
      label: 'Menu items',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        linkField,
        {
          name: 'children',
          label: 'Submenu',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            linkField,
          ],
        },
      ],
    },
  ],
}
