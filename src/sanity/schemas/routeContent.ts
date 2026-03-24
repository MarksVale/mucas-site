import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'routeContent',
  title: 'Route Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Route Name',
      type: 'string',
      description: 'Must match the Airtable route name exactly',
      validation: r => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Main description shown on the route page',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Name', type: 'string' },
          { name: 'desc', title: 'Description', type: 'text', rows: 2 },
        ],
      }],
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: ['Easy', 'Easy-Medium', 'Medium', 'Medium-Hard', 'Hard'],
      },
    }),
    defineField({
      name: 'km',
      title: 'Distance (km)',
      type: 'number',
    }),
    defineField({
      name: 'hours',
      title: 'Duration (hours)',
      type: 'string',
      description: 'e.g. "3-5"',
    }),
    defineField({
      name: 'galleryCount',
      title: 'Gallery Image Count',
      type: 'number',
      description: 'Number of gallery-N images uploaded in Cloudinary for this route',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'difficulty' },
  },
})
