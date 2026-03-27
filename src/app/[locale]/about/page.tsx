import { Link } from '@/i18n/navigation'
import PageHero from '@/components/PageHero'
import type { Metadata } from 'next'
import { buildAlternates, buildOpenGraph, twitterCard, SITE_NAME } from '@/lib/seo'
import { getAboutPage } from '@/lib/content'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isLv = locale !== 'en'
  const title = isLv ? `Par Mums | ${SITE_NAME}` : `About Us | ${SITE_NAME}`
  const description = isLv
    ? 'Uzzini par Mučas Laivu Noma - Latvijas vadošo upes piedzīvojumu uzņēmumu. Mūsu stāsts, misija un komanda.'
    : "Learn about Mučas Laivu Noma - Latvia's premier river adventure company. Our story, mission, and team."
  return {
    title, description,
    alternates: buildAlternates('/about'),
    openGraph: buildOpenGraph({ locale, title, description, path: '/about' }),
    twitter: twitterCard,
  }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const c = await getAboutPage(locale)

  return (
    <>
      <PageHero heading={c.heroHeading} subtitle={c.heroSubtitle} />

      {/* STORY */}
      <section className="section">
        <div className="container">
          <div className="about-content">
            <h2>{c.storyHeading}</h2>
            {c.storyText.split('\n\n').map((para, i) => (
              <p className="route-desc" key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section gray">
        <div className="container">
          <div className="section-head">
            <div className="label">{c.valuesLabel}</div>
            <h2>{c.valuesHeading}</h2>
          </div>
          <div className="feature-grid">
            {c.values.map((v, i) => (
              <div className="feature" key={i}>
                <div className="icon">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="label">{c.numbersLabel}</div>
            <h2>{c.numbersHeading}</h2>
          </div>
          <div className="hero-stats" style={{ justifyContent: 'center' }}>
            {c.stats.map((s, i) => (
              <div className="hero-stat" key={i}>
                <div className="num">{s.value}</div>
                <div className="lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>{c.ctaHeading}</h2>
            <p>{c.ctaSubtitle}</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <Link href="/contact" className="btn btn-white">{c.ctaBtn1}</Link>
              <Link href="/rivers" className="btn btn-outline">{c.ctaBtn2}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
