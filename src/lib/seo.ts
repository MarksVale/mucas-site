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

/** TouristAttraction JSON-LD for a river page */
export function buildRiverLD(opts: {
  locale: string
  name: string
  slug: string
  description: string
  region?: string
  season?: string
  routeCount?: number
  priceFrom?: number
  totalLength?: number
}) {
  const isLv = opts.locale !== 'en'
  const url = canonicalUrl(opts.locale, `/rivers/${opts.slug}`)
  const image = `https://res.cloudinary.com/mucas/image/upload/q_auto,f_auto,w_1200,h_630,c_fill,g_auto/mucas/rivers/${opts.slug}/hero`
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: isLv
      ? `${opts.name} upe — laivu noma`
      : `${opts.name} River — kayak & canoe rental`,
    description: opts.description,
    url,
    image,
    inLanguage: isLv ? 'lv' : 'en',
    touristType: [
      { '@type': 'Audience', audienceType: 'Adventure tourists' },
      { '@type': 'Audience', audienceType: 'Nature tourists' },
      { '@type': 'Audience', audienceType: 'Families' },
    ],
    ...(opts.region && { containedInPlace: { '@type': 'Place', name: opts.region, addressCountry: 'LV' } }),
    ...(opts.totalLength && { description: opts.description }),
    availableLanguage: ['Latvian', 'English'],
    isAccessibleForFree: false,
    ...(opts.priceFrom && {
      offers: {
        '@type': 'Offer',
        price: opts.priceFrom,
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        validFrom: `${new Date().getFullYear()}-04-01`,
        seller: { '@type': 'Organization', name: SITE_NAME },
      },
    }),
    ...(opts.routeCount && {
      amenityFeature: [{
        '@type': 'LocationFeatureSpecification',
        name: isLv ? 'Maršrutu skaits' : 'Number of routes',
        value: opts.routeCount,
      }],
    }),
    provider: {
      '@type': 'LocalBusiness',
      name: SITE_NAME,
      url: SITE_URL,
      telephone: '+37129211634',
    },
  }
}

/** TouristTrip JSON-LD for a route page */
export function buildRouteLD(opts: {
  locale: string
  name: string
  slug: string
  river: string
  riverSlug: string
  description: string
  days: number
  km?: number
  difficulty?: string
  priceFrom?: number
  hours?: string
}) {
  const isLv = opts.locale !== 'en'
  const url = canonicalUrl(opts.locale, `/routes/${opts.slug}`)
  const image = `https://res.cloudinary.com/mucas/image/upload/q_auto,f_auto,w_1200,h_630,c_fill,g_auto/mucas/rivers/${opts.riverSlug}/hero`
  const durationISO = opts.days === 1 ? 'P1D' : `P${opts.days}D`
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: isLv
      ? `${opts.name} — ${opts.river} upe`
      : `${opts.name} — ${opts.river} River`,
    description: opts.description,
    url,
    image,
    inLanguage: isLv ? 'lv' : 'en',
    touristType: [
      { '@type': 'Audience', audienceType: 'Adventure tourists' },
      { '@type': 'Audience', audienceType: 'Nature tourists' },
    ],
    tripOrigin: { '@type': 'Place', name: opts.name.split(' - ')[0]?.trim() ?? opts.river, addressCountry: 'LV' },
    itinerary: {
      '@type': 'ItemList',
      name: isLv ? `${opts.name} maršruts` : `${opts.name} route`,
      numberOfItems: opts.days,
    },
    duration: durationISO,
    ...(opts.km && opts.km > 0 && {
      distance: { '@type': 'QuantitativeValue', value: opts.km, unitCode: 'KMT' },
    }),
    ...(opts.difficulty && opts.difficulty !== '' && {
      additionalProperty: [{
        '@type': 'PropertyValue',
        name: isLv ? 'Grūtības pakāpe' : 'Difficulty',
        value: opts.difficulty,
      }],
    }),
    offers: {
      '@type': 'Offer',
      price: opts.priceFrom ?? 15,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      validFrom: `${new Date().getFullYear()}-04-01`,
      seller: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    },
    provider: {
      '@type': 'LocalBusiness',
      name: SITE_NAME,
      url: SITE_URL,
      telephone: '+37129211634',
    },
  }
}
