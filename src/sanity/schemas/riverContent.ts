import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'riverContent',
  title: 'River Content',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'River Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({
      name: 'highlights', title: 'Highlights', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'desc', title: 'Description', type: 'text', rows: 2 },
      ] }],
    }),
    defineField({ name: 'region', title: 'Region', type: 'string' }),
    defineField({ name: 'season', title: 'Season', type: 'string', description: 'e.g. "May – October"' }),
    defineField({ name: 'totalLength', title: 'Total Length (km)', type: 'number' }),
    defineField({ name: 'priceFrom', title: 'Price From (€)', type: 'number' }),
    defineField({ name: 'galleryCount', title: 'Gallery Image Count', type: 'number', description: 'Number of gallery images in Cloudinary' }),
  ],
  preview: { select: { title: 'title', subtitle: 'region' } },
})
