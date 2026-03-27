'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function LangToggle({ locale }: { locale: string }) {
  const pathname = usePathname()

  // Build the alternate URL:
  // If currently LV (no prefix), EN version = /en + pathname
  // If currently EN (/en/...), LV version = strip the /en prefix
  const altLocale = locale === 'lv' ? 'en' : 'lv'
  const altHref =
    locale === 'lv'
      ? `/en${pathname}`
      : pathname.replace(/^\/en/, '') || '/'

  return (
    <Link
      href={altHref}
      className="lang-toggle"
      title={locale === 'lv' ? 'Switch to English' : 'Pārslēgties uz Latviešu'}
    >
      {altLocale.toUpperCase()}
    </Link>
  )
}
