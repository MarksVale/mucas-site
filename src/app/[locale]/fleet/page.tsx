import { Link } from '@/i18n/navigation'
import { getBoats } from '@/lib/airtable'
import BoatCardWithModal from '@/components/BoatCardWithModal'
import PageHero from '@/components/PageHero'
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
      <PageHero heading={c.heroHeading} subtitle={c.heroSubtitle} />

      {Object.entries(categories).map(([category, catBoats]) => (
        <section className="section" key={category}>
          <div className="container">
            <div className="section-head">
              <div className="label">{category}</div>
              <h2>{category}</h2>
            </div>
            <div className="card-grid-4">
              {catBoats.map(b => (
                <BoatCardWithModal
                  key={b.slug}
                  boat={b}
                  seatLabel={t('seat')}
                  seatsLabel={t('seats')}
                />
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
            <div className="cta-btns">
              <Link href="/rivers" className="btn btn-white">{c.ctaBtn1}</Link>
              <Link href="/booking" className="btn btn-outline">{c.ctaBtn2}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
