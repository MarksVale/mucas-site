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
    defineField({ name: 'phoneNote', title: 'Phone Hours Note', type: 'string' }),
    defineField({ name: 'emailNote', title: 'Email Note', type: 'string' }),
    defineField({ name: 'locationNote', title: 'Location Note', type: 'string' }),
  ],
  preview: { prepare() { return { title: 'Contact Page' } } },
})
