import Link from 'next/link'
import { getRivers, getRiver, getRoutesByRiver } from '@/lib/airtable'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const rivers = await getRivers()
  return rivers.map(r => ({ slug: r.slug }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const river = await getRiver(slug)
  if (!river) return { title: 'River Not Found' }
  return {
    title: `${river.name} River | Mučas Laivu Noma`,
    description: `Boat rentals on the ${river.name} river. ${river.routeCount} routes available.`,
  }
}

export default async function RiverPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const river = await getRiver(slug)
  const routes = await getRoutesByRiver(slug)

  if (!river) return <div className="container" style={{ padding: '80px 0' }}><h1>River not found</h1></div>

  return (
    <>
      <section className={`river-hero ${river.gradient}`}>
        <div className="container">
          <Link href="/rivers" className="breadcrumb">← All Rivers</Link>
          <h1>{river.name}</h1>
          <div className="hero-stats">
            <div className="hero-stat"><div className="num">{river.routeCount}</div><div className="lbl">Routes</div></div>
            <div className="hero-stat"><div className="num">{river.boatCategories.length}</div><div className="lbl">Boat Categories</div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="river-content">
            <h2>Available Boat Types</h2>
            <div className="highlights-list">
              {river.boatCategories.map((cat, i) => (
                <span className="highlight-tag" key={i}>{cat}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section gray">
        <div className="container">
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Routes on the {river.name} ({routes.length})</h3>
          <div className="route-list">
            {routes.map(r => (
              <Link href={`/routes/${r.slug}`} className="route-list-item" key={r.slug}>
                <div className="rli-left">
                  <div>
                    <h4>{r.name}</h4>
                    <div className="rli-meta">
                      {r.days} {r.days === 1 ? 'day' : 'days'} &bull; Hub: {r.hub} &bull; Start: {r.startTimes.slice(0, 2).join(', ')}
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

      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>Book a Trip on the {river.name}</h2>
            <p>Choose a route above or contact us for help.</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <Link href="/booking" className="btn btn-white">Book Now</Link>
              <Link href="/contact" className="btn btn-outline">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
