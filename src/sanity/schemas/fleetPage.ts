import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'fleetPage',
  title: 'Fleet Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeading', title: 'Hero Heading (EN)', type: 'string' }),
    defineField({ name: 'heroHeadingLv', title: 'Hero Heading (LV)', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle (EN)', type: 'string' }),
    defineField({ name: 'heroSubtitleLv', title: 'Hero Subtitle (LV)', type: 'string' }),
    defineField({ name: 'ctaHeading', title: 'CTA Heading (EN)', type: 'string' }),
    defineField({ name: 'ctaHeadingLv', title: 'CTA Heading (LV)', type: 'string' }),
    defineField({ name: 'ctaSubtitle', title: 'CTA Subtitle (EN)', type: 'string' }),
    defineField({ name: 'ctaSubtitleLv', title: 'CTA Subtitle (LV)', type: 'string' }),
    defineField({ name: 'ctaBtn1', title: 'CTA Button 1 (EN)', type: 'string' }),
    defineField({ name: 'ctaBtn1Lv', title: 'CTA Button 1 (LV)', type: 'string' }),
    defineField({ name: 'ctaBtn2', title: 'CTA Button 2 (EN)', type: 'string' }),
    defineField({ name: 'ctaBtn2Lv', title: 'CTA Button 2 (LV)', type: 'string' }),
  ],
  preview: { prepare() { return { title: 'Fleet Page' } } },
})
