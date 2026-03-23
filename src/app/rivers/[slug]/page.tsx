import Link from 'next/link'
import { getRivers, getRiver, getRoutesByRiver } from '@/lib/airtable'
import { getRiverContent } from '@/lib/content'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const rivers = await getRivers()
  return rivers.map(r => ({ slug: r.slug }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const river = await getRiver(slug)
  const content = getRiverContent(slug)
  if (!river) return { title: 'River Not Found' }
  return {
    title: `${river.name} River Kayak & Canoe Trips | Mučas Laivu Noma`,
    description: content.description || `Boat rentals on the ${river.name} river. ${river.routeCount} routes available.`,
  }
}

export default async function RiverPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const river = await getRiver(slug)
  const routes = await getRoutesByRiver(slug)
  const content = getRiverContent(slug)

  if (!river) return <div className="container" style={{ padding: '80px 0' }}><h1>River not found</h1></div>

  return (
    <>
      {/* HERO */}
      <section className={`river-hero ${river.gradient}`}>
        <div className="container">
          <Link href="/rivers" className="breadcrumb">← All Rivers</Link>
          <h1>{river.name} River</h1>
          {content.region && <p className="route-hero-sub">{content.region} · {content.season}</p>}
          <div className="hero-stats">
            {content.totalLength > 0 && <div className="hero-stat"><div className="num">{content.totalLength}</div><div className="lbl">km total</div></div>}
            <div className="hero-stat"><div className="num">{river.routeCount}</div><div className="lbl">routes</div></div>
            {content.priceFrom > 0 && <div className="hero-stat"><div className="num">{content.priceFrom}€</div><div className="lbl">from / day</div></div>}
          </div>
        </div>
      </section>

      {/* DESCRIPTION + HIGHLIGHTS */}
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          {content.description && (
            <>
              <h2 style={{ fontSize: 26, fontWeight: 800, textTransform: 'uppercase', marginBottom: 16 }}>About the {river.name}</h2>
              <p className="route-desc">{content.description}</p>
            </>
          )}

          {content.highlights.length > 0 && (
            <div style={{ marginTop: 32 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14, color: 'var(--text-muted)' }}>Highlights</h3>
              <div className="highlights-list">
                {content.highlights.map((h, i) => <span className="highlight-tag" key={i}>{h}</span>)}
              </div>
            </div>
          )}

          {river.boatCategories.length > 0 && (
            <div style={{ marginTop: 28 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14, color: 'var(--text-muted)' }}>Available Boats</h3>
              <div className="highlights-list">
                {river.boatCategories.map((cat, i) => <span className="highlight-tag" key={i}>{cat}</span>)}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ROUTES LIST */}
      <section className="section gray">
        <div className="container">
          <div className="section-head">
            <div className="label">All Routes</div>
            <h2>Routes on the {river.name}</h2>
          </div>
          <div className="route-list">
            {routes.map(r => (
              <Link href={`/routes/${r.slug}`} className="route-list-item" key={r.slug}>
                <div className="rli-left">
                  <div>
                    <h4>{r.name}</h4>
                    <div className="rli-meta">
                      {r.days} {r.days === 1 ? 'day' : 'days'} · Hub: {r.hub}
                      {r.startTimes.length > 0 && ` · Starts: ${r.startTimes.slice(0, 2).join(', ')}`}
                    </div>
                  </div>
                </div>
                <div className="rli-right">
                  <div className="rli-price">Transport: {r.transportCost}€</div>
                  <span className="rli-arrow">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to Paddle the {river.name}?</h2>
            <p>Pick a route above and book your adventure.</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/booking" className="btn btn-white">Book Now</Link>
              <Link href="/contact" className="btn btn-outline">Ask a Question</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
