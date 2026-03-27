import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'routeContent',
  title: 'Route Content',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Route Name (EN)', type: 'string', description: 'Must match Airtable route name exactly', validation: r => r.required() }),
    defineField({ name: 'titleLv', title: 'Route Name (LV)', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description (EN)', type: 'text', rows: 4 }),
    defineField({ name: 'descriptionLv', title: 'Description (LV)', type: 'text', rows: 4 }),
    defineField({
      name: 'highlights', title: 'Highlights', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'name', title: 'Name (EN)', type: 'string' },
        { name: 'nameLv', title: 'Name (LV)', type: 'string' },
        { name: 'desc', title: 'Description (EN)', type: 'text', rows: 2 },
        { name: 'descLv', title: 'Description (LV)', type: 'text', rows: 2 },
      ] }],
    }),
    defineField({ name: 'difficulty', title: 'Difficulty', type: 'string', options: { list: ['Easy', 'Easy-Medium', 'Medium', 'Medium-Hard', 'Hard'] } }),
    defineField({ name: 'km', title: 'Distance (km)', type: 'number' }),
    defineField({ name: 'hours', title: 'Duration (hours)', type: 'string', description: 'e.g. "3-5"' }),
    defineField({ name: 'galleryCount', title: 'Gallery Image Count', type: 'number' }),
  ],
  preview: { select: { title: 'title', subtitle: 'difficulty' } },
})
