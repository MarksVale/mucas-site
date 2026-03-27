import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    // HERO
    defineField({ name: 'heroBadge',    title: 'Hero Badge (EN)',    type: 'string' }),
    defineField({ name: 'heroBadgeLv',  title: 'Hero Badge (LV)',    type: 'string' }),
    defineField({ name: 'heroHeading',  title: 'Hero Heading (EN)',  type: 'string' }),
    defineField({ name: 'heroHeadingLv',title: 'Hero Heading (LV)',  type: 'string' }),
    defineField({ name: 'heroSubtitle',  title: 'Hero Subtitle (EN)', type: 'string' }),
    defineField({ name: 'heroSubtitleLv',title: 'Hero Subtitle (LV)', type: 'string' }),
    defineField({ name: 'heroBtn1',     title: 'Hero Button 1 (EN)', type: 'string' }),
    defineField({ name: 'heroBtn1Lv',   title: 'Hero Button 1 (LV)', type: 'string' }),
    defineField({ name: 'heroBtn2',     title: 'Hero Button 2 (EN)', type: 'string' }),
    defineField({ name: 'heroBtn2Lv',   title: 'Hero Button 2 (LV)', type: 'string' }),
    // RIVERS SECTION
    defineField({ name: 'riversLabel',     title: 'Rivers Label (EN)',     type: 'string' }),
    defineField({ name: 'riversLabelLv',   title: 'Rivers Label (LV)',     type: 'string' }),
    defineField({ name: 'riversHeading',   title: 'Rivers Heading (EN)',   type: 'string' }),
    defineField({ name: 'riversHeadingLv', title: 'Rivers Heading (LV)',   type: 'string' }),
    defineField({ name: 'riversSubtitle',  title: 'Rivers Subtitle (EN)',  type: 'string' }),
    defineField({ name: 'riversSubtitleLv',title: 'Rivers Subtitle (LV)',  type: 'string' }),
    defineField({ name: 'riversBtnLabel',  title: 'Rivers Button (EN)',    type: 'string' }),
    defineField({ name: 'riversBtnLabelLv',title: 'Rivers Button (LV)',    type: 'string' }),
    // HOW IT WORKS
    defineField({ name: 'howLabel',     title: 'How It Works Label (EN)',    type: 'string' }),
    defineField({ name: 'howLabelLv',   title: 'How It Works Label (LV)',    type: 'string' }),
    defineField({ name: 'howHeading',   title: 'How It Works Heading (EN)',  type: 'string' }),
    defineField({ name: 'howHeadingLv', title: 'How It Works Heading (LV)',  type: 'string' }),
    defineField({ name: 'howSubtitle',  title: 'How It Works Subtitle (EN)', type: 'string' }),
    defineField({ name: 'howSubtitleLv',title: 'How It Works Subtitle (LV)', type: 'string' }),
    defineField({
      name: 'howSteps', title: 'How It Works Steps', type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'title',       title: 'Step Title (EN)',       type: 'string' }),
        defineField({ name: 'titleLv',     title: 'Step Title (LV)',       type: 'string' }),
        defineField({ name: 'description', title: 'Step Description (EN)', type: 'string' }),
        defineField({ name: 'descriptionLv', title: 'Step Description (LV)', type: 'string' }),
      ], preview: { select: { title: 'title' } } }],
    }),
    // POPULAR ROUTES
    defineField({ name: 'routesLabel',     title: 'Popular Routes Label (EN)',    type: 'string' }),
    defineField({ name: 'routesLabelLv',   title: 'Popular Routes Label (LV)',    type: 'string' }),
    defineField({ name: 'routesHeading',   title: 'Popular Routes Heading (EN)',  type: 'string' }),
    defineField({ name: 'routesHeadingLv', title: 'Popular Routes Heading (LV)',  type: 'string' }),
    defineField({ name: 'routesSubtitle',  title: 'Popular Routes Subtitle (EN)', type: 'string' }),
    defineField({ name: 'routesSubtitleLv',title: 'Popular Routes Subtitle (LV)', type: 'string' }),
    // WHY CHOOSE US
    defineField({ name: 'whyLabel',     title: 'Why Us Label (EN)',    type: 'string' }),
    defineField({ name: 'whyLabelLv',   title: 'Why Us Label (LV)',    type: 'string' }),
    defineField({ name: 'whyHeading',   title: 'Why Us Heading (EN)',  type: 'string' }),
    defineField({ name: 'whyHeadingLv', title: 'Why Us Heading (LV)',  type: 'string' }),
    defineField({
      name: 'whyFeatures', title: 'Why Choose Us Features', type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'icon',          title: 'Emoji Icon',            type: 'string' }),
        defineField({ name: 'title',         title: 'Feature Title (EN)',    type: 'string' }),
        defineField({ name: 'titleLv',       title: 'Feature Title (LV)',    type: 'string' }),
        defineField({ name: 'description',   title: 'Description (EN)',      type: 'string' }),
        defineField({ name: 'descriptionLv', title: 'Description (LV)',      type: 'string' }),
      ], preview: { select: { title: 'title', subtitle: 'icon' } } }],
    }),
    // TESTIMONIALS
    defineField({ name: 'testimonialsLabel',     title: 'Testimonials Label (EN)',   type: 'string' }),
    defineField({ name: 'testimonialsLabelLv',   title: 'Testimonials Label (LV)',   type: 'string' }),
    defineField({ name: 'testimonialsHeading',   title: 'Testimonials Heading (EN)', type: 'string' }),
    defineField({ name: 'testimonialsHeadingLv', title: 'Testimonials Heading (LV)', type: 'string' }),
    defineField({
      name: 'testimonials', title: 'Testimonials', type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'text',   title: 'Review Text (EN)', type: 'text', rows: 3 }),
        defineField({ name: 'textLv', title: 'Review Text (LV)', type: 'text', rows: 3 }),
        defineField({ name: 'author', title: 'Author Name',      type: 'string' }),
        defineField({ name: 'source', title: 'Source',           type: 'string' }),
      ], preview: { select: { title: 'author', subtitle: 'source' } } }],
    }),
    // CTA
    defineField({ name: 'ctaHeading',   title: 'CTA Heading (EN)',   type: 'string' }),
    defineField({ name: 'ctaHeadingLv', title: 'CTA Heading (LV)',   type: 'string' }),
    defineField({ name: 'ctaSubtitle',  title: 'CTA Subtitle (EN)',  type: 'string' }),
    defineField({ name: 'ctaSubtitleLv',title: 'CTA Subtitle (LV)',  type: 'string' }),
    defineField({ name: 'ctaBtn1',      title: 'CTA Button 1 (EN)',  type: 'string' }),
    defineField({ name: 'ctaBtn1Lv',    title: 'CTA Button 1 (LV)',  type: 'string' }),
    defineField({ name: 'ctaBtn2',      title: 'CTA Button 2 (EN)',  type: 'string' }),
    defineField({ name: 'ctaBtn2Lv',    title: 'CTA Button 2 (LV)',  type: 'string' }),
  ],
  preview: { prepare() { return { title: 'Home Page' } } },
})
