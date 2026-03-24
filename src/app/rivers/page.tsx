import Link from 'next/link'
import { getRivers } from '@/lib/airtable'
import type { Metadata } from 'next'
import { RiverFAQ } from '@/components/RiverFAQ'

export const metadata: Metadata = {
  title: 'Rivers | Mučas Laivu Noma',
  description: 'Explore 4 Latvian rivers for kayak, canoe, and raft trips. Compare rivers, find routes, and book your paddling adventure.',
}

const RIVER_INFO: Record<string, { desc: string; km: string; difficulty: string; bestFor: string; season: string }> = {
  gauja: {
    desc: 'Latvia\'s most popular paddling river, winding through the Gauja National Park with sandstone cliffs, caves, and ancient castles along the banks.',
    km: '10–95 km',
    difficulty: 'Easy to Moderate',
    bestFor: 'Families, multi-day trips',
    season: 'April – October',
  },
  salaca: {
    desc: 'A scenic northern river flowing through forests and past the famous Red Cliffs (Sarkanās Klintis). Calm waters and untouched nature.',
    km: '12–60 km',
    difficulty: 'Easy',
    bestFor: 'Beginners, relaxed paddling',
    season: 'April – October',
  },
  brasla: {
    desc: 'A fast, narrow tributary of the Gauja with rapids and tight turns — the go-to river for an adrenaline-filled day trip.',
    km: '8–25 km',
    difficulty: 'Moderate to Challenging',
    bestFor: 'Experienced paddlers, thrill-seekers',
    season: 'April – September',
  },
  amata: {
    desc: 'A wild, rocky river known for its rapids and boulders. Raft-only routes through one of Latvia\'s most dramatic valleys.',
    km: '8–14 km',
    difficulty: 'Moderate to Challenging',
    bestFor: 'Groups, team building, adventure',
    season: 'March – October (weekends)',
  },
}

export default async function RiversPage() {
  const rivers = await getRivers()

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Our Rivers</h1>
          <p>4 rivers across Latvia — from peaceful family floats to white-water adventures</p>
        </div>
      </section>

      {/* River Cards */}
      <section className="section">
        <div className="container">
          <div className="card-grid-2">
            {rivers.map(r => {
              const info = RIVER_INFO[r.slug]
              return (
                <Link href={`/rivers/${r.slug}`} className="river-card" key={r.slug}>
                  <div className={`rc-img ${r.gradient}`}>
                    <div className="overlay" />
                    <h3>{r.name}</h3>
                    <span className="rc-badge">{r.routeCount} routes</span>
                  </div>
                  <div className="rc-body">
                    {info && <p>{info.desc}</p>}
                    <div className="rc-meta">
                      <span>{r.boatCategories.join(', ')}</span>
                      {info && <span>{info.difficulty}</span>}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* River Comparison Table */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-heading">Compare Rivers</h2>
          <p className="section-subheading">Find the right river for your group</p>
          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>River</th>
                  <th>Distance</th>
                  <th>Difficulty</th>
                  <th>Best for</th>
                  <th>Boats</th>
                  <th>Season</th>
                </tr>
              </thead>
              <tbody>
                {rivers.map(r => {
                  const info = RIVER_INFO[r.slug]
                  return (
                    <tr key={r.slug}>
                      <td>
                        <Link href={`/rivers/${r.slug}`} className="compare-river-link">{r.name}</Link>
                      </td>
                      <td>{info?.km || '—'}</td>
                      <td>{info?.difficulty || '—'}</td>
                      <td>{info?.bestFor || '—'}</td>
                      <td>{r.boatCategories.join(', ')}</td>
                      <td>{info?.season || '—'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <p className="section-subheading">Everything you need to know before your trip</p>
          <RiverFAQ />
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-banner">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Ready to paddle?</h2>
          <p>Pick a river, choose your boats, and we&apos;ll handle the rest.</p>
          <Link href="/booking" className="btn btn-primary btn-lg">Book Your Trip</Link>
        </div>
      </section>
    </>
  )
}
