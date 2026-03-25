import Link from 'next/link'
import { getRoutes, getBoats } from '@/lib/airtable'
import { getAllRivers } from '@/lib/all-rivers'
import { getHomePage } from '@/lib/content'
import { RiverCard } from '@/components/RiverCard'

export const revalidate = 60

export default async function Home() {
  const [allRivers, allRoutes, allBoats, c] = await Promise.all([
    getAllRivers(), getRoutes(), getBoats(), getHomePage(),
  ])
  const rivers = allRivers.slice(0, 4)
  const routes = allRoutes.slice(0, 4)

  return (
    <>
      {/* HERO */}
      <section className="hero-full">
        <div className="hero-inner">
          <div className="hero-badge">{c.heroBadge}</div>
          <h1>{c.heroHeading}</h1>
          <p className="hero-sub">{c.heroSubtitle}</p>
          <div className="hero-btns">
            <Link href="/rivers" className="btn btn-white">{c.heroBtn1}</Link>
            <Link href="#how" className="btn btn-outline">{c.heroBtn2}</Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><div className="num">{allRivers.length}</div><div className="lbl">Rivers</div></div>
            <div className="hero-stat"><div className="num">{allRoutes.length}</div><div className="lbl">Routes</div></div>
            <div className="hero-stat"><div className="num">{allBoats.length}</div><div className="lbl">Boat Types</div></div>
            <div className="hero-stat"><div className="num">{Math.min(...allBoats.map(b => b.pricePerDay))}€</div><div className="lbl">From / day</div></div>
          </div>
        </div>
      </section>

      {/* RIVERS */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="label">{c.riversLabel}</div>
            <h2>{c.riversHeading}</h2>
            <p>{c.riversSubtitle}</p>
          </div>
          <div className="card-grid-3">
            {rivers.map(r => (
              <RiverCard key={r.slug} {...r} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link href="/rivers" className="btn btn-primary">{c.riversBtnLabel}</Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section gray" id="how">
        <div className="container">
          <div className="section-head">
            <div className="label">{c.howLabel}</div>
            <h2>{c.howHeading}</h2>
            <p>{c.howSubtitle}</p>
          </div>
          <div className="steps">
            {c.howSteps.map((s, i) => (
              <div className="step" key={i}>
                <div className="step-num">{i + 1}</div>
                <h4>{s.title}</h4>
                <p>{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR ROUTES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="label">{c.routesLabel}</div>
            <h2>{c.routesHeading}</h2>
            <p>{c.routesSubtitle}</p>
          </div>
          <div className="card-grid-4">
            {routes.map(r => (
              <Link href={`/routes/${r.slug}`} className="route-card" key={r.slug}>
                <div className={`rtc-top ${r.gradient}`}>
                  <span className="rtc-diff">{r.days} {r.days === 1 ? 'day' : 'days'}</span>
                  🛶
                </div>
                <div className="rtc-body">
                  <h4>{r.name}</h4>
                  <div className="river-name">{r.river}</div>
                  <div className="meta">Transport: from {r.transportCost}€* &bull; Hub: {r.hub}</div>
                </div>
              </Link>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', marginTop: 16 }}>* Transport costs are estimates and may vary based on group size and external factors.</p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section gray">
        <div className="container">
          <div className="section-head">
            <div className="label">{c.whyLabel}</div>
            <h2>{c.whyHeading}</h2>
          </div>
          <div className="feature-grid">
            {c.whyFeatures.map((f, i) => (
              <div className="feature" key={i}>
                <div className="icon">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section green">
        <div className="container">
          <div className="section-head">
            <div className="label white">{c.testimonialsLabel}</div>
            <h2>{c.testimonialsHeading}</h2>
          </div>
          <div className="testimonial-grid">
            {c.testimonials.map((t, i) => (
              <div className="testimonial" key={i}>
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <p>&ldquo;{t.text}&rdquo;</p>
                <div className="author">{t.author}</div>
                <div className="source">{t.source}</div>
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
              <Link href="/rivers" className="btn btn-white">{c.ctaBtn1}</Link>
              <Link href="/booking" className="btn btn-outline">{c.ctaBtn2}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
