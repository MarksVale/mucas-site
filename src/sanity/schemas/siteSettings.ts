import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'brandName', title: 'Brand Name (Full)', type: 'string', description: 'e.g. "Mučas Laivu Noma"' }),
    defineField({ name: 'brandNameShort', title: 'Brand Name (Short)', type: 'string', description: 'Shown in nav bar, e.g. "MUČAS"' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
    defineField({ name: 'email', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'text', rows: 2 }),

    defineField({
      name: 'designTokens',
      title: 'Design Tokens',
      type: 'object',
      description: 'Global colors, corners and shadows — applied across the whole site',
      fields: [
        defineField({
          name: 'colors',
          title: 'Colors',
          type: 'object',
          description: 'Hex codes, e.g. #2C4A2E',
          fields: [
            defineField({ name: 'primary', title: 'Primary Green', description: 'Buttons, links, badges', type: 'string' }),
            defineField({ name: 'primaryLight', title: 'Primary Light', description: 'Hover states, tints', type: 'string' }),
            defineField({ name: 'accent', title: 'Accent Gold', description: 'Highlights, prices, labels', type: 'string' }),
            defineField({ name: 'bgDark', title: 'Dark Background', description: 'Nav, hero, dark sections', type: 'string' }),
            defineField({ name: 'bg', title: 'Page Background', type: 'string' }),
            defineField({ name: 'surface', title: 'Card / Surface', description: 'Cards, panels, forms', type: 'string' }),
            defineField({ name: 'text', title: 'Body Text', type: 'string' }),
            defineField({ name: 'textMuted', title: 'Muted Text', description: 'Secondary labels, captions', type: 'string' }),
            defineField({ name: 'border', title: 'Borders', type: 'string' }),
          ],
        }),
        defineField({
          name: 'borderRadius',
          title: 'Corner Rounding',
          type: 'string',
          options: {
            list: [
              { title: 'Sharp — 4px', value: '4px' },
              { title: 'Soft — 8px', value: '8px' },
              { title: 'Rounded — 12px', value: '12px' },
              { title: 'Very Rounded — 20px', value: '20px' },
            ],
            layout: 'radio',
          },
        }),
        defineField({
          name: 'shadows',
          title: 'Shadows',
          type: 'string',
          options: {
            list: [
              { title: 'None — flat design', value: 'none' },
              { title: 'Subtle', value: 'subtle' },
              { title: 'Visible', value: 'visible' },
            ],
            layout: 'radio',
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() { return { title: 'Site Settings' } },
  },
})
