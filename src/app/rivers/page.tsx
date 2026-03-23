import Link from 'next/link'
import { getRivers } from '@/lib/airtable'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rivers | Mučas Laivu Noma',
  description: 'Browse all rivers available for boat rentals in Latvia.',
}

export default async function RiversPage() {
  const rivers = await getRivers()

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Our Rivers</h1>
          <p>{rivers.length} rivers with routes for every skill level</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card-grid-3">
            {rivers.map(r => (
              <Link href={`/rivers/${r.slug}`} className="river-card" key={r.slug}>
                <div className={`rc-img ${r.gradient}`}>
                  <div className="overlay" />
                  <h3>{r.name}</h3>
                  <span className="rc-badge">{r.routeCount} routes</span>
                </div>
                <div className="rc-body">
                  <div className="rc-meta">
                    <span>{r.boatCategories.join(', ')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
