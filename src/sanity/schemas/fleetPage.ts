import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'fleetPage',
  title: 'Fleet Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'string' }),
    defineField({ name: 'ctaHeading', title: 'CTA Heading', type: 'string' }),
    defineField({ name: 'ctaSubtitle', title: 'CTA Subtitle', type: 'string' }),
    defineField({ name: 'ctaBtn1', title: 'CTA Button 1', type: 'string' }),
    defineField({ name: 'ctaBtn2', title: 'CTA Button 2', type: 'string' }),
  ],
  preview: { prepare() { return { title: 'Fleet Page' } } },
})
