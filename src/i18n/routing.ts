import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['lv', 'en'],
  defaultLocale: 'lv',
  localePrefix: 'as-needed', // LV = no prefix (/), EN = /en/
})

export type Locale = (typeof routing.locales)[number]
