'use client'

import { useRouter, usePathname } from '@/i18n/navigation'
import { useParams } from 'next/navigation'

const FLAG_ISO: Record<string, string> = { lv: 'lv', en: 'gb' }

export function LangToggle({ locale }: { locale: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const altLocale = locale === 'lv' ? 'en' : 'lv'
  const flagIso = FLAG_ISO[altLocale]

  function handleSwitch() {
    // next-intl router sets NEXT_LOCALE cookie automatically,
    // so middleware uses it instead of Accept-Language header
    router.replace(
      // @ts-ignore — params typing is dynamic
      { pathname, params },
      { locale: altLocale }
    )
  }

  return (
    <button
      onClick={handleSwitch}
      className="lang-toggle"
      title={locale === 'lv' ? 'Switch to English' : 'Pārslēgties uz Latviešu'}
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
    >
      <img
        src={`https://flagcdn.com/24x18/${flagIso}.png`}
        width={24}
        height={18}
        alt={altLocale.toUpperCase()}
        style={{ display: 'block', borderRadius: 2 }}
      />
    </button>
  )
}
