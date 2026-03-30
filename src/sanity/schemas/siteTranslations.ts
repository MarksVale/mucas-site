import { defineType, defineField } from 'sanity'

const str = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: 'string', description })

const txt = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: 'text', rows: 2, description })

export default defineType({
  name: 'siteTranslations',
  title: 'Site Text & Translations',
  type: 'document',
  groups: [
    { name: 'nav', title: 'Navigation' },
    { name: 'footer', title: 'Footer' },
    { name: 'common', title: 'Common Labels' },
    { name: 'hero', title: 'Home Hero Stats' },
    { name: 'rivers', title: 'Rivers Listing Page' },
    { name: 'river', title: 'River Detail Page' },
    { name: 'route', title: 'Route Detail Page' },
    { name: 'fleet', title: 'Fleet Page' },
    { name: 'contact', title: 'Contact Page' },
    { name: 'booking', title: 'Booking Form' },
  ],
  fields: [
    defineField({
      name: 'locale',
      title: 'Language',
      type: 'string',
      options: { list: [{ title: 'Latvian (LV)', value: 'lv' }, { title: 'English (EN)', value: 'en' }] },
      validation: Rule => Rule.required(),
    }),

    // NAV
    defineField({ name: 'nav', title: 'Navigation', type: 'object', group: 'nav', fields: [
      str('home', 'Home'), str('rivers', 'Rivers'), str('fleet', 'Fleet'), str('about', 'About'),
      str('contact', 'Contact'), str('blog', 'Blog'), str('bookNow', 'Book Now button'), str('myAccount', 'My Account'),
    ]}),

    // FOOTER
    defineField({ name: 'footer', title: 'Footer', type: 'object', group: 'footer', fields: [
      str('tagline', 'Tagline'), str('rivers', 'Rivers heading'), str('allRivers', 'All Rivers link'),
      str('company', 'Company heading'), str('aboutUs', 'About Us'), str('ourFleet', 'Our Fleet'),
      str('contact', 'Contact'), str('bookNow', 'Book Now'), str('privacyPolicy', 'Privacy Policy'),
      str('terms', 'Terms'), str('copyright', 'Copyright line'),
    ]}),

    // COMMON
    defineField({ name: 'common', title: 'Common Labels', type: 'object', group: 'common', fields: [
      str('notFound', 'Page not found'), str('bookNow', 'Book Now'), str('viewAll', 'View All'),
      str('readMore', 'Read More'), str('backToRivers', 'Back to Rivers'), str('backToBlog', 'Back to Blog'),
      str('difficulty', 'Difficulty'), str('distance', 'Distance'), str('duration', 'Duration'),
      str('season', 'Season'), str('priceFrom', 'Price From label'), str('perDay', 'Per day label'),
      str('hours', 'Hours abbreviation'), str('km', 'km label'), str('days', 'Days label'),
      str('routes', 'Routes'), str('availableRoutes', 'Available Routes'), str('gallery', 'Gallery'),
      str('usefulInfo', 'Useful Information'), str('contactUs', 'Contact Us'),
      str('phone', 'Phone label'), str('email', 'Email label'), str('location', 'Location label'),
    ]}),

    // HERO STATS
    defineField({ name: 'hero', title: 'Home Hero Stats', type: 'object', group: 'hero', fields: [
      str('rivers', 'Rivers stat label'), str('routes', 'Routes stat label'),
      str('boatTypes', 'Boat Types stat label'), str('fromPerDay', 'From / day label'),
    ]}),

    // RIVERS LISTING
    defineField({ name: 'rivers', title: 'Rivers Listing Page', type: 'object', group: 'rivers', fields: [
      str('heading', 'Page Heading'), txt('subtitle', 'Subtitle'),
      str('bookOnlineTitle', 'Book Online card title'), txt('bookOnlineDesc', 'Book Online card description'),
      str('callToBookTitle', 'Call to Book card title'), txt('callToBookDesc', 'Call to Book card description'),
      str('routesLabel', 'Routes count label (e.g. "routes")'),
    ]}),

    // RIVER DETAIL
    defineField({ name: 'river', title: 'River Detail Page', type: 'object', group: 'river', fields: [
      str('title', 'Page title pattern (use {name})', 'e.g. "{name} upe" or "{name} River"'),
      str('allRivers', 'Back to All Rivers link'), str('totalLength', 'Total Length stat'),
      str('boatTypes', 'Boat Types stat'), str('about', 'About section heading (use {name})'),
      str('highlights', 'Highlights section heading'), str('availableBoats', 'Available Boats heading'),
      str('viewFleetPre', 'Fleet link prefix text'), str('viewFleetLink', 'Fleet link text'),
      str('allRoutes', 'All Routes heading (use {name})'),
      str('salacaTitle', 'Salaca promo title'), txt('salacaDesc', 'Salaca promo description'), str('salacaLink', 'Salaca promo link'),
      str('readyTitle', 'CTA title (use {name})'), txt('readyDesc', 'CTA description'),
      str('askQuestion', 'Ask a Question button'), str('contactBranch', 'Contact branch text (use {name})'),
      str('callToBook', 'Call to Book button'), str('writeToUs', 'Write to Us button'),
    ]}),

    // ROUTE DETAIL
    defineField({ name: 'route', title: 'Route Detail Page', type: 'object', group: 'route', fields: [
      str('allRivers', 'Back to Rivers link'), str('aboutRoute', 'About Route heading'),
      str('whatYouSee', 'Highlights heading'), str('availableBoats', 'Available Boats heading'),
      str('mapTitle', 'Map heading'), str('mapStart', 'Map Start label'), str('mapFinish', 'Map Finish label'),
      str('mapComingSoon', 'Map coming soon text'),
      str('included', 'Included in Price card title'), txt('includedDesc', 'Included in Price description'),
      str('transport', 'Transport card title'), txt('transportDesc', 'Transport description'),
      str('bestTime', 'Best Time card title'), txt('bestTimeDesc', 'Best Time description'),
      str('notes', 'Notes card title'),
      txt('notesHard', 'Notes text for Hard difficulty'),
      txt('notesMedium', 'Notes text for Medium difficulty'),
      txt('notesEasy', 'Notes text for Easy / all levels'),
      str('salacaTitle', 'Salaca promo title'), txt('salacaDesc', 'Salaca promo description'), str('salacaLink', 'Salaca promo link'),
      str('readyTitle', 'CTA title'), txt('readyDesc', 'CTA description'),
      str('bookRoute', 'Book This Route button'), str('askQuestion', 'Ask a Question button'),
      str('interestedTitle', 'Phone booking title'), txt('interestedDesc', 'Phone booking description'),
      str('callPhone', 'Call button (use {phone})'), str('emailUs', 'Email Us button'),
      str('contactUs', 'Contact Us button'), str('otherRoutes', 'Other Routes heading (use {river})'),
    ]}),

    // FLEET
    defineField({ name: 'fleet', title: 'Fleet Page', type: 'object', group: 'fleet', fields: [
      str('day', 'Per day label'), str('seat', 'Seat (singular)'), str('seats', 'Seats (plural)'),
      str('specLength', 'Length spec label'), str('specWidth', 'Width spec label'),
      str('specCapacity', 'Capacity spec label'), str('specSeats', 'Seats spec label'),
      str('specWeight', 'Weight spec label'),
    ]}),

    // CONTACT
    defineField({ name: 'contact', title: 'Contact Page', type: 'object', group: 'contact', fields: [
      str('phoneWhatsapp', 'Phone & WhatsApp label'), str('email', 'Email label'), str('location', 'Location label'),
      str('sendMessage', 'Send Message heading'), str('name', 'Name field label'), str('namePlaceholder', 'Name placeholder'),
      str('subject', 'Subject label'),
      str('subjectGeneral', 'Subject: General inquiry'), str('subjectRoute', 'Subject: Route recommendation'),
      str('subjectGroup', 'Subject: Group booking'), str('subjectCorporate', 'Subject: Corporate event'),
      str('subjectPartnership', 'Subject: Partnership'),
      str('message', 'Message label'), txt('messagePlaceholder', 'Message placeholder'),
      str('sendBtn', 'Send button'), str('ourBranches', 'Our Branches heading'),
      str('onlineBooking', 'Online booking available label'), str('phoneBooking', 'Phone booking label'),
    ]}),

    // BOOKING
    defineField({ name: 'booking', title: 'Booking Form', type: 'object', group: 'booking', fields: [
      str('startBooking', 'Form heading'), txt('startBookingDesc', 'Form description'),
      str('route', 'Route label'), str('selectRoute', 'Route placeholder'),
      str('day', 'Day (singular)'), str('days', 'Days (plural)'),
      str('transport', 'Transport label'), str('boatType', 'Boat Type label'), str('selectBoat', 'Boat placeholder'),
      str('seat', 'Seat (singular)'), str('seats', 'Seats (plural)'),
      str('date', 'Date label'), str('numBoats', 'Number of Boats label'), str('startTime', 'Start Time label'),
      str('name', 'Name label'), str('namePlaceholder', 'Name placeholder'),
      str('email', 'Email label'), str('phone', 'Phone label'),
      str('notes', 'Notes label'), str('notesPlaceholder', 'Notes placeholder'),
      str('proceedCheckout', 'Submit button'),
      txt('securePayment', 'Payment security note'),
      str('outsideVidzeme', 'Outside Vidzeme section title'),
      txt('outsideVidzemeDesc', 'Outside Vidzeme description'),
      str('call', 'Call button'), str('email2', 'Email button'),
      str('browseRivers', 'Browse rivers link text'), str('toFindTrip', 'Browse rivers trailing text'),
      str('waiverTitle', 'Safety waiver section title'),
      defineField({
        name: 'waiverRules',
        title: 'Safety Waiver Rules',
        type: 'array',
        description: 'Each line is one safety rule shown in the waiver list.',
        of: [{ type: 'string' }],
      }),
      str('waiverCheckbox', 'Waiver checkbox prefix text'),
      str('waiverLink', 'Safety Waiver link text'), str('termsLink', 'Terms link text'),
      str('submitting', 'Submitting... label'),
      str('successTitle', 'Success message title'), txt('successDesc', 'Success message description'),
    ]}),
  ],

  preview: {
    select: { locale: 'locale' },
    prepare({ locale }: { locale: string }) {
      return { title: locale === 'lv' ? '🇱🇻 Latvian (LV)' : '🇬🇧 English (EN)' }
    },
  },
})
