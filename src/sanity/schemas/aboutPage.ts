import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    // HERO
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'string' }),

    // STORY
    defineField({ name: 'storyHeading', title: 'Our Story Heading', type: 'string' }),
    defineField({ name: 'storyText', title: 'Our Story Text', type: 'text', rows: 8, description: 'Use double newline to separate paragraphs' }),

    // VALUES
    defineField({ name: 'valuesLabel', title: 'Values Section Label', type: 'string' }),
    defineField({ name: 'valuesHeading', title: 'Values Section Heading', type: 'string' }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'icon', title: 'Emoji Icon', type: 'string' }),
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'title', subtitle: 'icon' } },
      }],
    }),

    // NUMBERS
    defineField({ name: 'numbersLabel', title: 'Numbers Section Label', type: 'string' }),
    defineField({ name: 'numbersHeading', title: 'Numbers Section Heading', type: 'string' }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'value', title: 'Number/Value', type: 'string' }),
          defineField({ name: 'label', title: 'Label', type: 'string' }),
        ],
        preview: { select: { title: 'value', subtitle: 'label' } },
      }],
    }),

    // CTA
    defineField({ name: 'ctaHeading', title: 'CTA Heading', type: 'string' }),
    defineField({ name: 'ctaSubtitle', title: 'CTA Subtitle', type: 'string' }),
    defineField({ name: 'ctaBtn1', title: 'CTA Button 1 Label', type: 'string' }),
    defineField({ name: 'ctaBtn2', title: 'CTA Button 2 Label', type: 'string' }),
  ],
  preview: {
    prepare() {
      return { title: 'About Page' }
    },
  },
})
