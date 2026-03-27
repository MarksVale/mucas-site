/**
 * Shared SEO utilities for locale-aware metadata across all pages.
 * Centralises site URL, alternates, OpenGraph, and Twitter card setup.
 */

export const SITE_URL = 'https://mucas-site.vercel.app'
export const SITE_NAME = 'Mučas Laivu Noma'

/** Mapping from internal (EN) path to Latvian localized path */
const LV_PATHS: Record<string, string> = {
  '/':             '/',
  '/about':        '/par-mums',
  '/contact':      '/kontakti',
  '/fleet':        '/flote',
  '/rivers':       '/upes',
  '/booking':      '/rezervet',
  '/blog':         '/blogs',
}

/** Resolve the LV-localized version of a path (dynamic paths are prefix-matched) */
function lvPath(path: string): string {
  if (LV_PATHS[path]) return LV_PATHS[path]
  // Handle dynamic paths: /rivers/gauja → /upes/gauja, /blog/slug → /blogs/slug
  if (path.startsWith('/rivers/')) return path.replace('/rivers/', '/upes/')
  if (path.startsWith('/blog/'))   return path.replace('/blog/', '/blogs/')
  if (path.startsWith('/routes/')) return path.replace('/routes/', '/marsruti/')
  return path
}

/** Build the canonical URL for a given locale and path (no trailing slash). */
export function canonicalUrl(locale: string, path = '') {
  const p = path.startsWith('/') ? path : `/${path}`
  const resolved = locale === 'lv' ? lvPath(p) : p
  return locale === 'en' ? `${SITE_URL}/en${resolved === '/' ? '' : resolved}` : `${SITE_URL}${resolved === '/' ? '' : resolved || '/'}`
}

/** Build full alternates object for hreflang + canonical. */
export function buildAlternates(path = '') {
  const p = path.startsWith('/') ? path : `/${path}`
  const lv = lvPath(p)
  const lvUrl = `${SITE_URL}${lv === '/' ? '' : lv}` || SITE_URL
  const enUrl = `${SITE_URL}/en${p === '/' ? '' : p}`
  return {
    canonical: lvUrl,
    languages: {
      'lv':        lvUrl,
      'en':        enUrl,
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
