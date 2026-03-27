import Link from 'next/link'
import { getBoats } from '@/lib/airtable'
import { cldBoat, CLD_BOAT_FALLBACK } from '@/lib/cloudinary'
import BoatPhoto from '@/components/BoatPhoto'
import { BoatIcon } from '@/components/Icons'
import type { Metadata } from 'next'
import { buildAlternates, buildOpenGraph, twitterCard, SITE_NAME } from '@/lib/seo'
import { getFleetPage } from '@/lib/content'
import { getTranslations } from 'next-intl/server'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isLv = locale !== 'en'
  const title = isLv ? `Mūsu Flote | ${SITE_NAME}` : `Our Fleet | ${SITE_NAME}`
  const description = isLv
    ? 'Kajaki, kanoe, plosti un SUP dēļi pieejami upes braucieniem visā Latvijā. Izvēlies savu laivu.'
    : 'Kayaks, canoes, rafts, and SUPs available for river trips across Latvia. Choose your boat.'
  return {
    title, description,
    alternates: buildAlternates('/fleet'),
    openGraph: buildOpenGraph({ locale, title, description, path: '/fleet' }),
    twitter: twitterCard,
  }
}

export default async function FleetPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [boats, c, t] = await Promise.all([getBoats(), getFleetPage(locale), getTranslations('fleet')])

  const categories = boats.reduce<Record<string, typeof boats>>((acc, b) => {
    if (!acc[b.category]) acc[b.category] = []
    acc[b.category].push(b)
    return acc
  }, {})

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>{c.heroHeading}</h1>
          <p>{c.heroSubtitle}</p>
        </div>
      </section>

      {Object.entries(categories).map(([category, catBoats]) => (
        <section className="section" key={category}>
          <div className="container">
            <div className="section-head">
              <div className="label">{category}</div>
              <h2>{category}</h2>
            </div>
            <div className="card-grid-3">
              {catBoats.map(b => (
                <div className="boat-card" key={b.slug}>
                  <div className="bc-photo">
                    <BoatPhoto
                      src={cldBoat(b.slug)}
                      fallback={CLD_BOAT_FALLBACK}
                      alt={b.name}
                    />
                  </div>
                  <div className="bc-body">
                    <div className="bc-icon-wrap">
                      <BoatIcon category={b.category} size={20} />
                    </div>
                    <h3>{b.name}</h3>
                    <div className="bc-price">{b.pricePerDay}€ <span>/ {t('day')}</span></div>
                    <div className="bc-meta">{b.seats} {b.seats === 1 ? t('seat') : t('seats')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>{c.ctaHeading}</h2>
            <p>{c.ctaSubtitle}</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <Link href="/rivers" className="btn btn-white">{c.ctaBtn1}</Link>
              <Link href="/booking" className="btn btn-outline">{c.ctaBtn2}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
