import { getAllRivers } from '@/lib/all-rivers'
import { RiverCard } from '@/components/RiverCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rivers | Mučas Laivu Noma',
  description: 'Browse all 22 rivers available for boat rentals across Latvia.',
}

export default async function RiversPage() {
  const allRivers = await getAllRivers()

  // Group by region: Vidzeme first, then others alphabetically
  const regionOrder = ['Vidzeme', 'Kurzeme', 'Zemgale', 'Latgale']
  const riversByRegion = regionOrder.reduce((acc, region) => {
    acc[region] = allRivers.filter(r => r.region === region)
    return acc
  }, {} as Record<string, typeof allRivers>)

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Our Rivers</h1>
          <p>22 rivers across 4 regions with routes for every skill level</p>
        </div>
      </section>

      <section style={{ background: 'var(--white-smoke)', padding: '24px 0' }}>
        <div className="container" style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center', textAlign: 'center', fontSize: 15, color: 'var(--text-secondary)' }}>
          <div>
            <strong style={{ color: 'var(--primary)' }}>Book Online</strong> — pick a route, fill the form, and pay securely online
          </div>
          <div style={{ borderLeft: '1px solid #ccc', paddingLeft: 32 }}>
            <strong style={{ color: 'var(--text-primary)' }}>Call to Book</strong> — contact the local branch by phone or email
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {regionOrder.map(region => (
            riversByRegion[region].length > 0 && (
              <div key={region} style={{ marginBottom: 60 }}>
                <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>
                  {region}
                </h2>
                <div className="card-grid-3">
                  {riversByRegion[region].map(r => (
                    <RiverCard key={r.slug} {...r} />
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </section>
    </>
  )
}
