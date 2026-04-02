import { Link } from '@/i18n/navigation'
import { getBoats } from '@/lib/airtable'
import FleetBrowser from '@/components/FleetBrowser'
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

  const isLv = locale !== 'en'

  return (
    <>
      <PageHero heading={c.heroHeading} subtitle={c.heroSubtitle} />

      <section className="section">
        <div className="container">
          <FleetBrowser
            boats={boats}
            labels={{
              filterType: isLv ? 'Tips' : 'Type',
              filterSeats: isLv ? 'Vietas' : 'Seats',
              all: isLv ? 'Visi' : 'All',
              seat: t('seat'),
              seats: t('seats'),
              specLength: t('specLength'),
              specWidth: t('specWidth'),
              specCapacity: t('specCapacity'),
              specSeats: t('specSeats'),
              specWeight: t('specWeight'),
              noResults: isLv ? 'Nav rezultātu' : 'No results',
              seatsLabel: (n: number) => `${n} ${n === 1 ? t('seat') : t('seats')}`,
            }}
          />
        </div>
      </section>

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
