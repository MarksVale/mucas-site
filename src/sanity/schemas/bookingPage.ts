import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'bookingPage',
  title: 'Booking Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeading', title: 'Hero Heading (EN)', type: 'string' }),
    defineField({ name: 'heroHeadingLv', title: 'Hero Heading (LV)', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle (EN)', type: 'string' }),
    defineField({ name: 'heroSubtitleLv', title: 'Hero Subtitle (LV)', type: 'string' }),
  ],
  preview: { prepare() { return { title: 'Booking Page' } } },
})
