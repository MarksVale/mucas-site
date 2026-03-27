import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeading', title: 'Hero Heading (EN)', type: 'string' }),
    defineField({ name: 'heroHeadingLv', title: 'Hero Heading (LV)', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle (EN)', type: 'string' }),
    defineField({ name: 'heroSubtitleLv', title: 'Hero Subtitle (LV)', type: 'string' }),
    defineField({ name: 'formHeading', title: 'Form Section Heading (EN)', type: 'string' }),
    defineField({ name: 'formHeadingLv', title: 'Form Section Heading (LV)', type: 'string' }),
    defineField({ name: 'formSubtitle', title: 'Form Section Subtitle (EN)', type: 'string' }),
    defineField({ name: 'formSubtitleLv', title: 'Form Section Subtitle (LV)', type: 'string' }),
    defineField({ name: 'phoneNote', title: 'Phone Hours Note (EN)', type: 'string' }),
    defineField({ name: 'phoneNoteLv', title: 'Phone Hours Note (LV)', type: 'string' }),
    defineField({ name: 'emailNote', title: 'Email Note (EN)', type: 'string' }),
    defineField({ name: 'emailNoteLv', title: 'Email Note (LV)', type: 'string' }),
    defineField({ name: 'locationNote', title: 'Location Note (EN)', type: 'string' }),
    defineField({ name: 'locationNoteLv', title: 'Location Note (LV)', type: 'string' }),
  ],
  preview: { prepare() { return { title: 'Contact Page' } } },
})
