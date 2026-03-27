import Link from 'next/link'
import type { Metadata } from 'next'
import { getAboutPage } from '@/lib/content'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'About Us | Mučas Laivu Noma',
  description: 'Learn about Mučas Laivu Noma — Latvia\'s premier river adventure company. Our story, mission, and team.',
}

export default async function AboutPage() {
  const c = await getAboutPage()

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>{c.heroHeading}</h1>
          <p>{c.heroSubtitle}</p>
        </div>
      </section>

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
