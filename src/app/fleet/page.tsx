import Link from 'next/link'
import { getBoats } from '@/lib/airtable'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Fleet | Mučas Laivu Noma',
  description: 'Kayaks, canoes, rafts, and SUPs available for river trips across Latvia.',
}

const categoryIcons: Record<string, string> = {
  Kayaks: '🛶',
  Canoes: '🚣',
  Rafts: '🏖️',
  SUP: '🏄',
  'Big Rafts': '🛟',
}

export default async function FleetPage() {
  const boats = await getBoats()

  // Group by category
  const categories = boats.reduce<Record<string, typeof boats>>((acc, b) => {
    if (!acc[b.category]) acc[b.category] = []
    acc[b.category].push(b)
    return acc
  }, {})

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Our Fleet</h1>
          <p>All boats available for your river adventure</p>
        </div>
      </section>

      {Object.entries(categories).map(([category, catBoats]) => (
        <section className="section" key={category}>
          <div className="container">
            <div className="section-head">
              <div className="label">{categoryIcons[category] || '🚤'} {category}</div>
              <h2>{category}</h2>
            </div>
            <div className="card-grid-3">
              {catBoats.map(b => (
                <div className="boat-card" key={b.slug}>
                  <div className="bc-icon">{categoryIcons[b.category] || '🚤'}</div>
                  <h3>{b.name}</h3>
                  <div className="bc-price">{b.pricePerDay}€ <span>/ day</span></div>
                  <div className="bc-meta">{b.seats} {b.seats === 1 ? 'seat' : 'seats'}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to Hit the Water?</h2>
            <p>Pick a route and book your boat.</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <Link href="/rivers" className="btn btn-white">Browse Routes</Link>
              <Link href="/booking" className="btn btn-outline">Book Now</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
