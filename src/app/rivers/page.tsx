import Link from 'next/link'
import { getRivers } from '@/lib/airtable'
import type { Metadata } from 'next'
import { RiverFAQ } from '@/components/RiverFAQ'

export const metadata: Metadata = {
  title: 'Rivers | Mučas Laivu Noma',
  description: 'Explore 4 Latvian rivers for kayak, canoe, and raft trips. Compare rivers, find routes, and book your paddling adventure.',
}

const RIVER_INFO: Record<string, {
  desc: string; km: string; difficulty: string; bestFor: string
  season: string; routes: string; highlights: string[]
}> = {
  gauja: {
    desc: 'Latvia\'s most popular river — sandstone cliffs, caves, and castles through the National Park.',
    km: '10–95 km',
    difficulty: 'Easy–Moderate',
    bestFor: 'Families, multi-day',
    season: 'Apr – Oct',
    routes: '11 routes',
    highlights: ['National Park', 'Sandstone cliffs', 'Multi-day trips', 'Camping spots'],
  },
  salaca: {
    desc: 'Calm northern river through forests and past the famous Red Cliffs. Perfect for beginners.',
    km: '12–60 km',
    difficulty: 'Easy',
    bestFor: 'Beginners, relaxed',
    season: 'Apr – Oct',
    routes: '5 routes',
    highlights: ['Red Cliffs', 'Calm water', 'Beginner-friendly', 'Scenic forests'],
  },
  brasla: {
    desc: 'Fast, narrow Gauja tributary with rapids and tight turns — for an adrenaline-filled day.',
    km: '8–25 km',
    difficulty: 'Moderate–Hard',
    bestFor: 'Thrill-seekers',
    season: 'Apr – Sep',
    routes: '11 routes',
    highlights: ['Rapids', 'Tight turns', 'Day trips', 'Kayaks & canoes'],
  },
  amata: {
    desc: 'Wild rocky river with boulders and rapids. Raft-only routes through a dramatic valley.',
    km: '8–14 km',
    difficulty: 'Moderate–Hard',
    bestFor: 'Groups, team building',
    season: 'Mar – Oct',
    routes: '2 routes',
    highlights: ['Boulders', 'Rafts only', 'Team building', 'Wild nature'],
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

      {/* River Cards — 3 columns */}
      <section className="section">
        <div className="container">
          <div className="card-grid-3">
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

      {/* River Highlights — quick-glance cards */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-heading">At a Glance</h2>
          <p className="section-subheading">Quick stats to help you pick the right river</p>
          <div className="river-highlights">
            {rivers.map(r => {
              const info = RIVER_INFO[r.slug]
              if (!info) return null
              return (
                <Link href={`/rivers/${r.slug}`} className="rh-card" key={r.slug}>
                  <div className="rh-card-name">{r.name}</div>
                  <div className="rh-stat-row"><span>Distance</span><span>{info.km}</span></div>
                  <div className="rh-stat-row"><span>Difficulty</span><span>{info.difficulty}</span></div>
                  <div className="rh-stat-row"><span>Best for</span><span>{info.bestFor}</span></div>
                  <div className="rh-stat-row"><span>Season</span><span>{info.season}</span></div>
                  <div className="rh-tags">
                    {info.highlights.map(h => <span key={h} className="rh-tag">{h}</span>)}
                  </div>
                </Link>
              )
            })}
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

      {/* CTA — full bleed, no rounded corners */}
      <section className="cta-fullbleed">
        <div className="container">
          <h2>Ready to paddle?</h2>
          <p>Pick a river, choose your boats, and we&apos;ll handle the rest.</p>
          <Link href="/booking" className="btn btn-primary btn-lg">Book Your Trip</Link>
        </div>
      </section>
    </>
  )
}
