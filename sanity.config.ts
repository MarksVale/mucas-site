import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'
import { projectId, dataset } from './src/sanity/env'

export default defineConfig({
  name: 'mucas',
  title: 'Mučas Laivu Noma',
  projectId,
  dataset,
  basePath: '/admin',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.listItem()
              .title('Pages')
              .child(
                S.list().title('Pages').items([
                  S.documentTypeListItem('homePage').title('Home Page'),
                  S.documentTypeListItem('aboutPage').title('About Page'),
                  S.documentTypeListItem('contactPage').title('Contact Page'),
                  S.documentTypeListItem('bookingPage').title('Booking Page'),
                  S.documentTypeListItem('fleetPage').title('Fleet Page'),
                ]),
              ),
            S.divider(),
            S.documentTypeListItem('blogPost').title('Blog Posts'),
            S.divider(),
            S.listItem()
              .title('Translations')
              .child(S.documentTypeList('siteTranslations').title('Site Text & Translations')),
          ]),
    }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],
  schema: { types: schemaTypes },
})
