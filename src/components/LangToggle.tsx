'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const FLAG_ISO: Record<string, string> = { lv: 'lv', en: 'gb' }

// Maps LV path segments ↔ EN path segments
const LV_TO_EN: Record<string, string> = {
  'par-mums': 'about',
  'kontakti': 'contact',
  'flote': 'fleet',
  'upes': 'rivers',
  'rezervet': 'booking',
  'blogs': 'blog',
  'marsruti': 'routes',
  'privatuma-politika': 'privacy',
  'noteikumi': 'terms',
  'drosibas-apliecinajums': 'waiver',
}
const EN_TO_LV: Record<string, string> = Object.fromEntries(
  Object.entries(LV_TO_EN).map(([k, v]) => [v, k])
)

export function LangToggle({ locale }: { locale: string }) {
  const fullPath = usePathname() // actual URL path, e.g. "/upes/gauja" or "/en/rivers/gauja"
  const altLocale = locale === 'lv' ? 'en' : 'lv'
  const flagIso = FLAG_ISO[altLocale]

  // Strip /en prefix to get locale-neutral path
  let path = fullPath
  if (path.startsWith('/en/')) path = path.slice(3)
  else if (path === '/en') path = '/'

  // Translate the first segment to the target locale
  const segments = path.split('/').filter(Boolean)
  if (segments.length > 0) {
    const map = altLocale === 'en' ? LV_TO_EN : EN_TO_LV
    segments[0] = map[segments[0]] ?? segments[0]
  }

  const translatedPath = segments.length === 0 ? '/' : '/' + segments.join('/')
  const href = altLocale === 'en'
    ? (translatedPath === '/' ? '/en' : '/en' + translatedPath)
    : translatedPath

  return (
    <Link
      href={href}
      className="lang-toggle"
      title={locale === 'lv' ? 'Switch to English' : 'Pārslēgties uz Latviešu'}
    >
      <img
        src={`https://flagcdn.com/24x18/${flagIso}.png`}
        width={24}
        height={18}
        alt={altLocale.toUpperCase()}
        style={{ display: 'block', borderRadius: 2 }}
      />
    </Link>
  )
}
