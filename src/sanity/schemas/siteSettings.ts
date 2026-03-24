import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      description: 'Shown in nav and footer (e.g. "MUČAS")',
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
