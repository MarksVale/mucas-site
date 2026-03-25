import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'brandName',
      title: 'Brand Name (Full)',
      type: 'string',
      description: 'Full name shown in footer (e.g. "Mučas Laivu Noma")',
    }),
    defineField({
      name: 'brandNameShort',
      title: 'Brand Name (Short)',
      type: 'string',
      description: 'Short name shown in header / nav bar (e.g. "MUČAS")',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Site subtitle / hero text',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'colorPrimary',
      title: 'Primary Color (Green)',
      type: 'string',
      description: 'Hex color, e.g. #24943A',
    }),
    defineField({
      name: 'colorAccent',
      title: 'Accent Color (Gold)',
      type: 'string',
      description: 'Hex color, e.g. #E7B236',
    }),
    defineField({
      name: 'colorDark',
      title: 'Dark Color',
      type: 'string',
      description: 'Hex color, e.g. #191716',
    }),
    defineField({
      name: 'colorBackground',
      title: 'Background Color',
      type: 'string',
      description: 'Hex color, e.g. #F6F6F4',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
