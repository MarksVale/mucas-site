import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['lv', 'en'],
  defaultLocale: 'lv',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/about':           { lv: '/par-mums',       en: '/about' },
    '/contact':         { lv: '/kontakti',        en: '/contact' },
    '/fleet':           { lv: '/flote',           en: '/fleet' },
    '/rivers':          { lv: '/upes',            en: '/rivers' },
    '/rivers/[slug]':   { lv: '/upes/[slug]',     en: '/rivers/[slug]' },
    '/booking':         { lv: '/rezervet',        en: '/booking' },
    '/blog':            { lv: '/blogs',           en: '/blog' },
    '/blog/[slug]':     { lv: '/blogs/[slug]',    en: '/blog/[slug]' },
    '/routes/[slug]':   { lv: '/marsruti/[slug]', en: '/routes/[slug]' },
    '/privacy':         { lv: '/privatuma-politika',    en: '/privacy' },
    '/terms':           { lv: '/noteikumi',             en: '/terms' },
    '/waiver':          { lv: '/drosibas-apliecinajums', en: '/waiver' },
  },
})

export type Locale = (typeof routing.locales)[number]
