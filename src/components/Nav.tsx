import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { IconAccount } from './Icons'
import { getSettings } from '@/lib/content'
import MobileMenu from './MobileMenu'
import { LangToggle } from './LangToggle'

const STORE_URL = process.env.NEXT_PUBLIC_WC_STORE_URL || 'https://laivunoma.shop'

export async function Nav({ locale }: { locale: string }) {
  const [settings, t] = await Promise.all([
    getSettings(),
    getTranslations('nav'),
  ])

  return (
    <>
      <nav className="nav-transparent nav-desktop">
        <Link href="/" className="logo">{settings.brandNameShort}</Link>
        <div className="menu">
          <Link href="/">{t('home')}</Link>
          <Link href="/rivers">{t('rivers')}</Link>
          <Link href="/fleet">{t('fleet')}</Link>
          <Link href="/about">{t('about')}</Link>
          <Link href="/contact">{t('contact')}</Link>
          <Link href="/blog">{t('blog')}</Link>
          <LangToggle locale={locale} />
          <a href={`${STORE_URL}/my-account`} className="nav-account" title={t('myAccount')}>
            <IconAccount size={18} strokeWidth={2} />
          </a>
          <Link href="/booking" className="nav-cta">{t('bookNow')}</Link>
        </div>
      </nav>
      <div className="nav-mobile">
        <MobileMenu brandName={settings.brandNameShort} locale={locale} />
      </div>
    </>
  )
}
