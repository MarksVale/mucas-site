import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroBadge', title: 'Hero Badge', type: 'string' }),
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'string' }),
    defineField({ name: 'heroBtn1', title: 'Hero Button 1', type: 'string' }),
    defineField({ name: 'heroBtn2', title: 'Hero Button 2', type: 'string' }),
    defineField({ name: 'riversLabel', title: 'Rivers Section Label', type: 'string' }),
    defineField({ name: 'riversHeading', title: 'Rivers Section Heading', type: 'string' }),
    defineField({ name: 'riversSubtitle', title: 'Rivers Section Subtitle', type: 'string' }),
    defineField({ name: 'riversBtnLabel', title: 'Rivers Button Label', type: 'string' }),
    defineField({ name: 'howLabel', title: 'How It Works Label', type: 'string' }),
    defineField({ name: 'howHeading', title: 'How It Works Heading', type: 'string' }),
    defineField({ name: 'howSubtitle', title: 'How It Works Subtitle', type: 'string' }),
    defineField({
      name: 'howSteps', title: 'How It Works Steps', type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'title', title: 'Step Title', type: 'string' }),
        defineField({ name: 'description', title: 'Step Description', type: 'string' }),
      ], preview: { select: { title: 'title' } } }],
    }),
    defineField({ name: 'routesLabel', title: 'Popular Routes Label', type: 'string' }),
    defineField({ name: 'routesHeading', title: 'Popular Routes Heading', type: 'string' }),
    defineField({ name: 'routesSubtitle', title: 'Popular Routes Subtitle', type: 'string' }),
    defineField({ name: 'whyLabel', title: 'Why Choose Us Label', type: 'string' }),
    defineField({ name: 'whyHeading', title: 'Why Choose Us Heading', type: 'string' }),
    defineField({
      name: 'whyFeatures', title: 'Why Choose Us Features', type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'icon', title: 'Emoji Icon', type: 'string' }),
        defineField({ name: 'title', title: 'Feature Title', type: 'string' }),
        defineField({ name: 'description', title: 'Feature Description', type: 'string' }),
      ], preview: { select: { title: 'title', subtitle: 'icon' } } }],
    }),
    defineField({ name: 'testimonialsLabel', title: 'Testimonials Label', type: 'string' }),
    defineField({ name: 'testimonialsHeading', title: 'Testimonials Heading', type: 'string' }),
    defineField({
      name: 'testimonials', title: 'Testimonials', type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'text', title: 'Review Text', type: 'text', rows: 3 }),
        defineField({ name: 'author', title: 'Author Name', type: 'string' }),
        defineField({ name: 'source', title: 'Source', type: 'string' }),
      ], preview: { select: { title: 'author', subtitle: 'source' } } }],
    }),
    defineField({ name: 'ctaHeading', title: 'CTA Heading', type: 'string' }),
    defineField({ name: 'ctaSubtitle', title: 'CTA Subtitle', type: 'string' }),
    defineField({ name: 'ctaBtn1', title: 'CTA Button 1', type: 'string' }),
    defineField({ name: 'ctaBtn2', title: 'CTA Button 2', type: 'string' }),
  ],
  preview: { prepare() { return { title: 'Home Page' } } },
})
