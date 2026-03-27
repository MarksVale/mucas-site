// Sanity CMS — lightweight fetch client (no SDK)
// Project: jb64rhta | Dataset: production

const PROJECT_ID = 'jb64rhta'
const DATASET = 'production'
const API_VERSION = '2023-05-03'

// ─── helpers ────────────────────────────────────────────────────────────────

function sanityUrl(query: string) {
  return `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`
}

async function sanityFetch<T>(query: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(sanityUrl(query), { next: { revalidate: 60 } })
    if (!res.ok) return fallback
    const data = await res.json()
    return (data.result ?? fallback) as T
  } catch {
    return fallback
  }
}

/** Pick the right language value: prefer field+Lv for LV, field for EN */
function t<T>(raw: Record<string, unknown>, key: string, locale: string): T {
  if (locale !== 'en') {
    const lv = raw[`${key}Lv`]
    if (lv) return lv as T
  }
  return raw[key] as T
}

// ─── Design Tokens ──────────────────────────────────────────────────────────

interface DesignTokenColors {
  primary?: string
  primaryLight?: string
  accent?: string
  bgDark?: string
  bg?: string
  surface?: string
  text?: string
  textInverse?: string
  textSecondary?: string
  textMuted?: string
  border?: string
}

interface DesignTokens {
  colors?: DesignTokenColors
  borderRadius?: string
  shadows?: 'none' | 'subtle' | 'visible'
}

export interface SiteSettings {
  brandName?: string
  designTokens?: DesignTokens
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return sanityFetch<SiteSettings>(
    '*[_type == "siteSettings" && !(_id in path("drafts.**"))][0]{brandName, designTokens}',
    {}
  )
}

const SHADOW_MAP = {
  none: 'none',
  subtle: '0 1px 4px rgba(0,0,0,0.08)',
  visible: '0 2px 12px rgba(0,0,0,0.15)',
}

export function buildDesignTokenCSS(tokens?: DesignTokens): string {
  if (!tokens) return ''
  const lines: string[] = []
  const c = tokens.colors ?? {}

  if (c.primary)      lines.push(`  --color-primary: ${c.primary} !important;`)
  if (c.primaryLight) lines.push(`  --color-primary-light: ${c.primaryLight} !important;`)
  if (c.accent)       lines.push(`  --color-accent: ${c.accent} !important;`)
  if (c.bgDark)       lines.push(`  --color-bg-dark: ${c.bgDark} !important;`)
  if (c.bg)           lines.push(`  --color-bg: ${c.bg} !important;`)
  if (c.surface)      lines.push(`  --color-surface: ${c.surface} !important;`)
  if (c.text)         lines.push(`  --color-text: ${c.text} !important;`)
  if (c.textInverse)  lines.push(`  --color-text-inverse: ${c.textInverse} !important;`)
  if (c.textMuted)    lines.push(`  --color-text-muted: ${c.textMuted} !important;`)
  if (c.textSecondary)lines.push(`  --color-text-secondary: ${c.textSecondary} !important;`)
  if (c.border)       lines.push(`  --color-border: ${c.border} !important;`)

  if (c.primary)      lines.push(`  --primary: ${c.primary} !important;`)
  if (c.accent)       lines.push(`  --accent: ${c.accent} !important;`)
  if (c.bgDark)       lines.push(`  --dark: ${c.bgDark} !important;`)
  if (c.bg)           lines.push(`  --bg: ${c.bg} !important;`)
  if (c.surface)      lines.push(`  --card: ${c.surface} !important;`)
  if (c.text)         lines.push(`  --text: ${c.text} !important;`)
  if (c.textInverse)  lines.push(`  --text-inverse: ${c.textInverse} !important;`)
  if (c.textMuted)    lines.push(`  --text-muted: ${c.textMuted} !important;`)
  if (c.textSecondary)lines.push(`  --text-secondary: ${c.textSecondary} !important;`)
  if (c.border)       lines.push(`  --border: ${c.border} !important;`)

  if (tokens.borderRadius) {
    lines.push(`  --radius-sm: ${tokens.borderRadius} !important;`)
    lines.push(`  --radius: ${tokens.borderRadius} !important;`)
    lines.push(`  --radius-lg: ${tokens.borderRadius} !important;`)
    lines.push(`  --radius-xl: ${tokens.borderRadius} !important;`)
  }
  if (tokens.shadows) {
    const v = SHADOW_MAP[tokens.shadows]
    lines.push(`  --shadow-sm: ${v} !important;`)
    lines.push(`  --shadow-md: ${v} !important;`)
    lines.push(`  --shadow-lg: ${v} !important;`)
  }
  if (lines.length === 0) return ''
  return `:root {\n${lines.join('\n')}\n}`
}

// ─── Page Content ────────────────────────────────────────────────────────────

// Helper to map raw Sanity arrays with locale
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapArray<T>(arr: any[] | undefined, mapper: (item: any) => T): T[] {
  return (arr ?? []).map(mapper)
}

// ── Home Page ────────────────────────────────────────────────────────────────

export interface HomePageData {
  heroBadge: string
  heroHeading: string
  heroSubtitle: string
  heroBtn1: string
  heroBtn2: string
  riversLabel: string
  riversHeading: string
  riversSubtitle: string
  riversBtnLabel: string
  howLabel: string
  howHeading: string
  howSubtitle: string
  howSteps: { title: string; description: string }[]
  routesLabel: string
  routesHeading: string
  routesSubtitle: string
  whyLabel: string
  whyHeading: string
  whyFeatures: { icon: string; title: string; description: string }[]
  testimonialsLabel: string
  testimonialsHeading: string
  testimonials: { text: string; author: string; source: string }[]
  ctaHeading: string
  ctaSubtitle: string
  ctaBtn1: string
  ctaBtn2: string
}

export async function getHomePageSanity(locale = 'lv'): Promise<HomePageData | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = await sanityFetch<any>(
    '*[_type == "homePage" && !(_id in path("drafts.**"))][0]',
    null
  )
  if (!raw) return null
  return {
    heroBadge:           t(raw, 'heroBadge',           locale) ?? '',
    heroHeading:         t(raw, 'heroHeading',         locale) ?? '',
    heroSubtitle:        t(raw, 'heroSubtitle',        locale) ?? '',
    heroBtn1:            t(raw, 'heroBtn1',            locale) ?? '',
    heroBtn2:            t(raw, 'heroBtn2',            locale) ?? '',
    riversLabel:         t(raw, 'riversLabel',         locale) ?? '',
    riversHeading:       t(raw, 'riversHeading',       locale) ?? '',
    riversSubtitle:      t(raw, 'riversSubtitle',      locale) ?? '',
    riversBtnLabel:      t(raw, 'riversBtnLabel',      locale) ?? '',
    howLabel:            t(raw, 'howLabel',            locale) ?? '',
    howHeading:          t(raw, 'howHeading',          locale) ?? '',
    howSubtitle:         t(raw, 'howSubtitle',         locale) ?? '',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    howSteps: mapArray(raw.howSteps, (s: any) => ({
      title:       (locale !== 'en' ? s.titleLv       : null) ?? s.title       ?? '',
      description: (locale !== 'en' ? s.descriptionLv : null) ?? s.description ?? '',
    })),
    routesLabel:         t(raw, 'routesLabel',         locale) ?? '',
    routesHeading:       t(raw, 'routesHeading',       locale) ?? '',
    routesSubtitle:      t(raw, 'routesSubtitle',      locale) ?? '',
    whyLabel:            t(raw, 'whyLabel',            locale) ?? '',
    whyHeading:          t(raw, 'whyHeading',          locale) ?? '',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    whyFeatures: mapArray(raw.whyFeatures, (f: any) => ({
      icon:        f.icon ?? '',
      title:       (locale !== 'en' ? f.titleLv       : null) ?? f.title       ?? '',
      description: (locale !== 'en' ? f.descriptionLv : null) ?? f.description ?? '',
    })),
    testimonialsLabel:   t(raw, 'testimonialsLabel',   locale) ?? '',
    testimonialsHeading: t(raw, 'testimonialsHeading', locale) ?? '',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    testimonials: mapArray(raw.testimonials, (r: any) => ({
      text:   (locale !== 'en' ? r.textLv : null) ?? r.text   ?? '',
      author: r.author ?? '',
      source: r.source ?? '',
    })),
    ctaHeading:          t(raw, 'ctaHeading',          locale) ?? '',
    ctaSubtitle:         t(raw, 'ctaSubtitle',         locale) ?? '',
    ctaBtn1:             t(raw, 'ctaBtn1',             locale) ?? '',
    ctaBtn2:             t(raw, 'ctaBtn2',             locale) ?? '',
  }
}

// ── About Page ───────────────────────────────────────────────────────────────

export interface AboutPageData {
  heroHeading: string
  heroSubtitle: string
  storyHeading: string
  storyText: string
  valuesLabel: string
  valuesHeading: string
  values: { icon: string; title: string; description: string }[]
  numbersLabel: string
  numbersHeading: string
  stats: { value: string; label: string }[]
  ctaHeading: string
  ctaSubtitle: string
  ctaBtn1: string
  ctaBtn2: string
}

export async function getAboutPageSanity(locale = 'lv'): Promise<AboutPageData | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = await sanityFetch<any>(
    '*[_type == "aboutPage" && !(_id in path("drafts.**"))][0]',
    null
  )
  if (!raw) return null
  return {
    heroHeading:   t(raw, 'heroHeading',   locale) ?? '',
    heroSubtitle:  t(raw, 'heroSubtitle',  locale) ?? '',
    storyHeading:  t(raw, 'storyHeading',  locale) ?? '',
    storyText:     t(raw, 'storyText',     locale) ?? '',
    valuesLabel:   t(raw, 'valuesLabel',   locale) ?? '',
    valuesHeading: t(raw, 'valuesHeading', locale) ?? '',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    values: mapArray(raw.values, (v: any) => ({
      icon:        v.icon ?? '',
      title:       (locale !== 'en' ? v.titleLv       : null) ?? v.title       ?? '',
      description: (locale !== 'en' ? v.descriptionLv : null) ?? v.description ?? '',
    })),
    numbersLabel:   t(raw, 'numbersLabel',   locale) ?? '',
    numbersHeading: t(raw, 'numbersHeading', locale) ?? '',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stats: mapArray(raw.stats, (s: any) => ({
      value: s.value ?? '',
      label: (locale !== 'en' ? s.labelLv : null) ?? s.label ?? '',
    })),
    ctaHeading:  t(raw, 'ctaHeading',  locale) ?? '',
    ctaSubtitle: t(raw, 'ctaSubtitle', locale) ?? '',
    ctaBtn1:     t(raw, 'ctaBtn1',     locale) ?? '',
    ctaBtn2:     t(raw, 'ctaBtn2',     locale) ?? '',
  }
}

// ── Contact Page ─────────────────────────────────────────────────────────────

export interface ContactPageData {
  heroHeading: string
  heroSubtitle: string
  formHeading: string
  formSubtitle: string
  phoneNote: string
  emailNote: string
  locationNote: string
}

export async function getContactPageSanity(locale = 'lv'): Promise<ContactPageData | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = await sanityFetch<any>(
    '*[_type == "contactPage" && !(_id in path("drafts.**"))][0]',
    null
  )
  if (!raw) return null
  return {
    heroHeading:  t(raw, 'heroHeading',  locale) ?? '',
    heroSubtitle: t(raw, 'heroSubtitle', locale) ?? '',
    formHeading:  t(raw, 'formHeading',  locale) ?? '',
    formSubtitle: t(raw, 'formSubtitle', locale) ?? '',
    phoneNote:    t(raw, 'phoneNote',    locale) ?? '',
    emailNote:    t(raw, 'emailNote',    locale) ?? '',
    locationNote: t(raw, 'locationNote', locale) ?? '',
  }
}

// ── Booking Page ─────────────────────────────────────────────────────────────

export interface BookingPageData {
  heroHeading: string
  heroSubtitle: string
}

export async function getBookingPageSanity(locale = 'lv'): Promise<BookingPageData | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = await sanityFetch<any>(
    '*[_type == "bookingPage" && !(_id in path("drafts.**"))][0]',
    null
  )
  if (!raw) return null
  return {
    heroHeading:  t(raw, 'heroHeading',  locale) ?? '',
    heroSubtitle: t(raw, 'heroSubtitle', locale) ?? '',
  }
}

// ── Fleet Page ───────────────────────────────────────────────────────────────

export interface FleetPageData {
  heroHeading: string
  heroSubtitle: string
  ctaHeading: string
  ctaSubtitle: string
  ctaBtn1: string
  ctaBtn2: string
}

export async function getFleetPageSanity(locale = 'lv'): Promise<FleetPageData | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = await sanityFetch<any>(
    '*[_type == "fleetPage" && !(_id in path("drafts.**"))][0]',
    null
  )
  if (!raw) return null
  return {
    heroHeading:  t(raw, 'heroHeading',  locale) ?? '',
    heroSubtitle: t(raw, 'heroSubtitle', locale) ?? '',
    ctaHeading:   t(raw, 'ctaHeading',   locale) ?? '',
    ctaSubtitle:  t(raw, 'ctaSubtitle',  locale) ?? '',
    ctaBtn1:      t(raw, 'ctaBtn1',      locale) ?? '',
    ctaBtn2:      t(raw, 'ctaBtn2',      locale) ?? '',
  }
}
