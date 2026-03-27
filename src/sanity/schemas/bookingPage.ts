import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'bookingPage',
  title: 'Booking Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'string' }),
  ],
  preview: { prepare() { return { title: 'Booking Page' } } },
})
