import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'string' }),
    defineField({ name: 'formHeading', title: 'Form Section Heading', type: 'string' }),
    defineField({ name: 'formSubtitle', title: 'Form Section Subtitle', type: 'string' }),
    defineField({ name: 'phoneNote', title: 'Phone Hours Note', type: 'string', description: 'e.g. "Mon–Sat, 9:00–18:00 · WhatsApp fastest"' }),
    defineField({ name: 'emailNote', title: 'Email Note', type: 'string', description: 'e.g. "We reply within 24h"' }),
    defineField({ name: 'locationNote', title: 'Location Note', type: 'string', description: 'e.g. "Gauja National Park area"' }),
  ],
  preview: {
    prepare() {
      return { title: 'Contact Page' }
    },
  },
})
