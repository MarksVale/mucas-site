import Link from 'next/link'
import { getRoutes, getRoute, getBoats } from '@/lib/airtable'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const routes = await getRoutes()
  return routes.map(r => ({ slug: r.slug }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const route = await getRoute(slug)
  if (!route) return { title: 'Route Not Found' }
  return {
    title: `${route.name} | ${route.river} | Mučas Laivu Noma`,
    description: `${route.name} on the ${route.river} river. ${route.days}-day trip. Transport: ${route.transportCost}€.`,
  }
}

export default async function RoutePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const route = await getRoute(slug)
  const allBoats = await getBoats()

  if (!route) return <div className="container" style={{ padding: '80px 0' }}><h1>Route not found</h1></div>

  // Match available boats for this route
  const availableBoats = allBoats.filter(b => route.boats.includes(b.name))

  return (
    <>
      <section className={`route-hero ${route.gradient}`}>
        <div className="container">
          <Link href={`/rivers/${route.riverSlug}`} className="breadcrumb">← {route.river}</Link>
          <h1>{route.name}</h1>
          <div className="hero-stats">
            <div className="hero-stat"><div className="num">{route.days}</div><div className="lbl">{route.days === 1 ? 'Day' : 'Days'}</div></div>
            <div className="hero-stat"><div className="num">{route.transportCost}€</div><div className="lbl">Transport</div></div>
            <div className="hero-stat"><div className="num">{route.hub}</div><div className="lbl">Hub</div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="route-grid">
            {/* MAIN CONTENT */}
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Route Details</h2>
              <div className="detail-table">
                <div className="detail-row"><span className="detail-label">River</span><span>{route.river}</span></div>
                <div className="detail-row"><span className="detail-label">Duration</span><span>{route.days} {route.days === 1 ? 'day' : 'days'}</span></div>
                <div className="detail-row"><span className="detail-label">Transport Cost</span><span>{route.transportCost}€</span></div>
                <div className="detail-row"><span className="detail-label">Starting Hub</span><span>{route.hub}</span></div>
                <div className="detail-row"><span className="detail-label">Start Times</span><span>{route.startTimes.join(', ')}</span></div>
              </div>

              <h2 style={{ fontSize: 22, fontWeight: 700, margin: '32px 0 16px' }}>Available Boats ({availableBoats.length})</h2>
              <div className="boat-options">
                {availableBoats.map(b => (
                  <div className="boat-option" key={b.slug}>
                    <div className="boat-name">{b.name}</div>
                    <div className="boat-meta">{b.category} &bull; {b.seats} {b.seats === 1 ? 'seat' : 'seats'}</div>
                    <div className="boat-price">{b.pricePerDay}€ <span>/ day</span></div>
                  </div>
                ))}
              </div>
            </div>

            {/* SIDEBAR */}
            <div>
              <div className="booking-card">
                <h3>Book This Route</h3>
                <p>Choose your boat and date to get started.</p>
                <Link href="/booking" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', width: '100%' }}>
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
