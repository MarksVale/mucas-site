import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'string' }),
    defineField({ name: 'storyHeading', title: 'Our Story Heading', type: 'string' }),
    defineField({ name: 'storyText', title: 'Our Story Text', type: 'text', rows: 8 }),
    defineField({ name: 'valuesLabel', title: 'Values Label', type: 'string' }),
    defineField({ name: 'valuesHeading', title: 'Values Heading', type: 'string' }),
    defineField({
      name: 'values', title: 'Values', type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'icon', title: 'Emoji Icon', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
      ], preview: { select: { title: 'title', subtitle: 'icon' } } }],
    }),
    defineField({ name: 'numbersLabel', title: 'Numbers Label', type: 'string' }),
    defineField({ name: 'numbersHeading', title: 'Numbers Heading', type: 'string' }),
    defineField({
      name: 'stats', title: 'Stats', type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'value', title: 'Number/Value', type: 'string' }),
        defineField({ name: 'label', title: 'Label', type: 'string' }),
      ], preview: { select: { title: 'value', subtitle: 'label' } } }],
    }),
    defineField({ name: 'ctaHeading', title: 'CTA Heading', type: 'string' }),
    defineField({ name: 'ctaSubtitle', title: 'CTA Subtitle', type: 'string' }),
    defineField({ name: 'ctaBtn1', title: 'CTA Button 1', type: 'string' }),
    defineField({ name: 'ctaBtn2', title: 'CTA Button 2', type: 'string' }),
  ],
  preview: { prepare() { return { title: 'About Page' } } },
})
