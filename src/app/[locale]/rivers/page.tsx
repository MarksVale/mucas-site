import { getAllRivers } from '@/lib/all-rivers'
import { getTranslations } from 'next-intl/server'
import PageHero from '@/components/PageHero'
import { RiverCard } from '@/components/RiverCard'
import type { Metadata } from 'next'
import { buildAlternates, buildOpenGraph, twitterCard, SITE_NAME } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isLv = locale !== 'en'
  const title = isLv ? `Upes Laivošanai Latvijā | ${SITE_NAME}` : `Rivers for Boating in Latvia | ${SITE_NAME}`
  const description = isLv
    ? 'Pārlūko visas 22 upes pieejamas laivošanai Latvijā - Gauja, Salaca, Abava, Amata un daudzas citas. Visas prasmju pakāpes.'
    : 'Browse all 22 rivers available for boat rentals across Latvia - Gauja, Salaca, Abava, Amata and more. All skill levels.'
  return {
    title,
    description,
    alternates: buildAlternates('/rivers'),
    openGraph: buildOpenGraph({ locale, title, description, path: '/rivers' }),
    twitter: twitterCard,
  }
}

export default async function RiversPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params
  const allRivers = await getAllRivers(locale)

  const regionOrder = ['Vidzeme', 'Kurzeme', 'Zemgale', 'Latgale']
  const t = await getTranslations('rivers')
  const riversByRegion = regionOrder.reduce((acc, region) => {
    acc[region] = allRivers.filter(r => r.region === region)
    return acc
  }, {} as Record<string, typeof allRivers>)

  return (
    <>
      <PageHero heading={t('heading')} subtitle={t('subtitle')} />

      <section style={{ background: 'var(--bg)', padding: '24px 0' }}>
        <div className="container" style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center', textAlign: 'center', fontSize: 15, color: 'var(--text-secondary)' }}>
          <div>
            <strong style={{ color: 'var(--primary)' }}>{t('bookOnlineTitle')}</strong> - {t('bookOnlineDesc')}
          </div>
          <div style={{ borderLeft: '1px solid #ccc', paddingLeft: 32 }}>
            <strong style={{ color: 'var(--text-primary)' }}>{t('callToBookTitle')}</strong> - {t('callToBookDesc')}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {regionOrder.map(region => (
            riversByRegion[region].length > 0 && (
              <div key={region} style={{ marginBottom: 60 }}>
                <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>
                  {region}
                </h2>
                <div className="card-grid-4">
                  {riversByRegion[region].map(r => (
                    <RiverCard key={r.slug} {...r} />
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </section>
    </>
  )
}
