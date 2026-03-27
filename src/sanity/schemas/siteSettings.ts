import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'brandName', title: 'Brand Name (Full)', type: 'string', description: 'e.g. "Mučas Laivu Noma"' }),
    defineField({ name: 'brandNameShort', title: 'Brand Name (Short)', type: 'string', description: 'Shown in nav bar, e.g. "MUČAS"' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
    defineField({ name: 'email', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'text', rows: 2 }),

    defineField({
      name: 'designTokens',
      title: 'Design Tokens — Colors & Style',
      type: 'object',
      description: 'Change any color here and the whole site updates within 60 seconds. Use hex codes like #24943A.',
      fields: [
        defineField({
          name: 'colors',
          title: 'Colors',
          type: 'object',
          description: 'All colors are hex codes, e.g. #24943A. Changes apply site-wide automatically.',
          fields: [
            defineField({
              name: 'bg',
              title: 'Page Background',
              type: 'string',
              description: 'The main background color of every page. Currently warm cream (#ECEAD4). Affects: all page backgrounds, section backgrounds, the area behind cards.',
            }),
            defineField({
              name: 'bgDark',
              title: 'Dark Color (Nav, Footer, Heroes)',
              type: 'string',
              description: 'Used for: top navigation bar, footer background, hero sections on every page (home, fleet, routes, rivers, about, contact, blog), full-width CTA strips, river/route hero overlays. Currently Forest Green (#24943A). Also controls the wave divider colors — changing this will automatically update the waves that connect hero → page and page → footer.',
            }),
            defineField({
              name: 'primary',
              title: 'Primary / Brand Green',
              type: 'string',
              description: 'Used for: all "Book" and CTA buttons, links on hover, navigation active state, badge backgrounds, pricing table headers, icon colors, filter pill borders, "Book Now" buttons everywhere. Currently Forest Green (#24943A). Should match Dark Color for consistency.',
            }),
            defineField({
              name: 'primaryLight',
              title: 'Primary Light (Hover tint)',
              type: 'string',
              description: 'Used for: button hover states, soft tinted backgrounds on feature cards. Currently light green (#4AB85E). Should be a lighter version of Primary.',
            }),
            defineField({
              name: 'accent',
              title: 'Accent / Gold',
              type: 'string',
              description: 'Used for: "DIFFICULTY" badges, seasonal labels, star ratings, price highlights, any decorative accent element. Currently Sunflower Gold (#E7B236).',
            }),
            defineField({
              name: 'surface',
              title: 'Card Surface / White',
              type: 'string',
              description: 'Used for: all card backgrounds (boat cards, route cards, blog cards, testimonial cards), form backgrounds, CTA banner boxes, booking form panel. Currently white (#FFFFFF). Should usually stay white so cards pop off the page background.',
            }),
            defineField({
              name: 'text',
              title: 'Body Text (Dark)',
              type: 'string',
              description: 'Used for: all main body text, headings on light backgrounds, nav links. Currently Carbon Black (#191716). Changing this affects ALL text across the site.',
            }),
            defineField({
              name: 'textMuted',
              title: 'Muted / Secondary Text',
              type: 'string',
              description: 'Used for: supporting text under headings, card descriptions, captions, labels like "Min. age", timestamps, meta info. Currently medium grey (#7A7872).',
            }),
            defineField({
              name: 'border',
              title: 'Border / Divider Line',
              type: 'string',
              description: 'Used for: all card borders, form input outlines, table dividers, section separator lines. Currently light grey (#E2E0D8). Should be subtle — slightly darker than the page background.',
            }),
          ],
        }),
        defineField({
          name: 'borderRadius',
          title: 'Corner Rounding',
          type: 'string',
          description: 'Controls how rounded buttons, cards, and panels look across the site.',
          options: {
            list: [
              { title: 'Sharp — 4px (modern/minimal)', value: '4px' },
              { title: 'Soft — 8px (clean)', value: '8px' },
              { title: 'Rounded — 12px (current)', value: '12px' },
              { title: 'Very Rounded — 20px (friendly)', value: '20px' },
            ],
            layout: 'radio',
          },
        }),
        defineField({
          name: 'shadows',
          title: 'Card Shadows',
          type: 'string',
          description: 'How much depth cards and panels have. "Visible" gives a clean floated look (current).',
          options: {
            list: [
              { title: 'None — completely flat', value: 'none' },
              { title: 'Subtle — barely there', value: 'subtle' },
              { title: 'Visible — current setting', value: 'visible' },
            ],
            layout: 'radio',
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() { return { title: 'Site Settings' } },
  },
})
