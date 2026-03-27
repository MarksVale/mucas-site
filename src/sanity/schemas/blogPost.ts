import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: r => r.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['Tips', 'Guide', 'News', 'Beginners'] }, validation: r => r.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3, validation: r => r.required() }),
    defineField({ name: 'heroEmoji', title: 'Hero Emoji', type: 'string' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'date', title: 'Publish Date', type: 'date', validation: r => r.required() }),
    defineField({ name: 'readTime', title: 'Read Time', type: 'string', description: 'e.g. "5 min"' }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', date: 'date' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare({ title, subtitle, date }: any) {
      return { title, subtitle: `${subtitle} — ${date || 'No date'}` }
    },
  },
})
