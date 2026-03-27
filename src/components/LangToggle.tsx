'use client'

import { usePathname } from '@/i18n/navigation'
import { Link } from '@/i18n/navigation'

export function LangToggle({ locale }: { locale: string }) {
  const pathname = usePathname() // locale-stripped path, e.g. /rivers (not /en/rivers)
  const altLocale = locale === 'lv' ? 'en' : 'lv'

  return (
    <Link
      href={pathname}
      locale={altLocale as 'lv' | 'en'}
      className="lang-toggle"
      title={locale === 'lv' ? 'Switch to English' : 'Pārslēgties uz Latviešu'}
    >
      {altLocale.toUpperCase()}
    </Link>
  )
}
