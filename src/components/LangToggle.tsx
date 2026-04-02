'use client'

import { usePathname } from '@/i18n/navigation'
import { Link } from '@/i18n/navigation'

const FLAG_ISO: Record<string, string> = { lv: 'lv', en: 'gb' }

export function LangToggle({ locale }: { locale: string }) {
  const pathname = usePathname()
  const altLocale = locale === 'lv' ? 'en' : 'lv'
  const flagIso = FLAG_ISO[altLocale]

  return (
    <Link
      href={pathname as any}
      locale={altLocale as 'lv' | 'en'}
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
