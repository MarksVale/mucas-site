/**
 * Shared SEO utilities for locale-aware metadata across all pages.
 * Centralises site URL, alternates, OpenGraph, and Twitter card setup.
 */

export const SITE_URL = 'https://mucas-site.vercel.app'
export const SITE_NAME = 'Mučas Laivu Noma'

/** Build the canonical URL for a given locale and path (no trailing slash). */
export function canonicalUrl(locale: string, path = '') {
  const p = path.startsWith('/') ? path : `/${path}`
  return locale === 'en' ? `${SITE_URL}/en${p === '/' ? '' : p}` : `${SITE_URL}${p}`
}

/** Build full alternates object for hreflang + canonical. */
export function buildAlternates(path = '') {
  const p = path.startsWith('/') ? path : `/${path}`
  const lvUrl = `${SITE_URL}${p === '/' ? '' : p}` || SITE_URL
  const enUrl = `${SITE_URL}/en${p === '/' ? '' : p}`
  return {
    canonical: lvUrl,
    languages: {
      'lv': lvUrl,
      'en': enUrl,
      'x-default': lvUrl,
    },
  }
}

/** Standard OpenGraph fields merged per page. */
export function buildOpenGraph(opts: {
  locale: string
  title: string
  description: string
  path?: string
  image?: string
}) {
  return {
    title: opts.title,
    description: opts.description,
    siteName: SITE_NAME,
    locale: opts.locale === 'en' ? 'en_US' : 'lv_LV',
    alternateLocale: opts.locale === 'en' ? ['lv_LV'] : ['en_US'],
    type: 'website' as const,
    url: canonicalUrl(opts.locale, opts.path ?? '/'),
    images: opts.image
      ? [{ url: opts.image, width: 1200, height: 630, alt: opts.title }]
      : [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: SITE_NAME }],
  }
}

export const twitterCard = {
  card: 'summary_large_image' as const,
  site: '@mucas_lv',
}
