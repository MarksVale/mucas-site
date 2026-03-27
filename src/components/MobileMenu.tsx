'use client'
import { useState, useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { IconAccount } from './Icons'
import { LangToggle } from './LangToggle'

const STORE_URL = process.env.NEXT_PUBLIC_WC_STORE_URL || 'https://laivunoma.shop'

export default function MobileMenu({ brandName, locale }: { brandName: string, locale: string }) {
  const [open, setOpen] = useState(false)
  const t = useTranslations('nav')

  const close = () => setOpen(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <div className="mob-bar">
        <Link href="/" className="logo" onClick={close}>{brandName}</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LangToggle locale={locale} />
          <button className={`hamburger ${open ? 'hamburger-open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>

      {open && <div className="mob-overlay" onClick={close} />}
      <nav className={`mob-nav ${open ? 'mob-nav-open' : ''}`}>
        <Link href="/" onClick={close}>{t('home')}</Link>
        <Link href="/rivers" onClick={close}>{t('rivers')}</Link>
        <Link href="/fleet" onClick={close}>{t('fleet')}</Link>
        <Link href="/about" onClick={close}>{t('about')}</Link>
        <Link href="/contact" onClick={close}>{t('contact')}</Link>
        <Link href="/blog" onClick={close}>{t('blog')}</Link>
        <a href={`${STORE_URL}/my-account`} onClick={close} className="mob-account">
          <IconAccount size={16} strokeWidth={2} /> {t('myAccount')}
        </a>
        <Link href="/booking" className="mob-cta" onClick={close}>{t('bookNow')}</Link>
      </nav>
    </>
  )
}
