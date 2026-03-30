import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'
import { getSiteTranslations } from '@/lib/sanity'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as 'lv' | 'en')) {
    locale = routing.defaultLocale
  }

  // Load from Sanity, fall back to local JSON so the site never breaks
  const fallback = (await import(`../../messages/${locale}.json`)).default
  const sanity = await getSiteTranslations(locale)
  let messages = sanity ? deepMerge(fallback, sanity) : fallback

  // Fix: Sanity has Lithuanian ų in "Mūsų Upes" — force correct Latvian spelling
  if (locale === 'lv' && (messages as Record<string, Record<string, string>>).rivers?.heading === 'Mūsų Upes') {
    messages = deepMerge(messages as Record<string, unknown>, { rivers: { heading: 'Mūsu Upes' } })
  }

  return { locale, messages }
})

// Sanity values override fallback; empty strings are ignored so deleted fields don't blank the site
function deepMerge(base: Record<string, unknown>, override: Record<string, unknown>): Record<string, unknown> {
  const result = { ...base }
  for (const key of Object.keys(override)) {
    const ov = override[key]
    const bs = base[key]
    if (ov && typeof ov === 'object' && !Array.isArray(ov) && bs && typeof bs === 'object' && !Array.isArray(bs)) {
      result[key] = deepMerge(bs as Record<string, unknown>, ov as Record<string, unknown>)
    } else if (ov !== undefined && ov !== null && ov !== '') {
      result[key] = ov
    }
  }
  return result
}
