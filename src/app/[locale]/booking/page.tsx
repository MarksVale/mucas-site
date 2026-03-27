import { getRoutes, getBoats, getBranches } from '@/lib/airtable'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book Your Trip | Mučas Laivu Noma',
  description: 'Book a kayak, canoe, or raft trip on Latvia\'s rivers.',
}

export default async function BookingPage() {
  const routes = await getRoutes()
  const boats = await getBoats()
  const phoneBranches = (await getBranches()).filter(b => b.bookingType === 'phone')

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Book Your Trip</h1>
          <p>Choose your route, pick a boat, and hit the water</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="booking-card" style={{ maxWidth: 640, margin: '0 auto' }}>
            <h3>Start Your Booking</h3>
            <p style={{ color: '#666', marginBottom: 24 }}>Fill in the details below. You&apos;ll be taken to our secure checkout to complete payment.</p>

            <form className="contact-form">
              <div className="form-group">
                <label>Route</label>
                <select>
                  <option value="">Select a route...</option>
                  {routes.map(r => (
                    <option key={r.slug} value={r.slug}>
                      {r.name} ({r.river} &bull; {r.days} {r.days === 1 ? 'day' : 'days'} &bull; Transport: {r.transportCost}€)
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Boat Type</label>
                <select>
                  <option value="">Select a boat...</option>
                  {boats.map(b => (
                    <option key={b.slug} value={b.slug}>
                      {b.name} ({b.seats} {b.seats === 1 ? 'seat' : 'seats'} — {b.pricePerDay}€/day)
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>Number of Boats</label>
                  <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5+</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Start Time</label>
                <select>
                  <option>9:00</option>
                  <option>11:00</option>
                  <option>13:00</option>
                  <option>15:00</option>
                </select>
              </div>

              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Your full name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" placeholder="+371..." />
              </div>
              <div className="form-group">
                <label>Notes (optional)</label>
                <textarea rows={3} placeholder="Special requests..." />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: 18, padding: '16px 32px' }}>
                Proceed to Checkout
              </button>
              <p style={{ textAlign: 'center', fontSize: 13, color: '#888', marginTop: 12 }}>
                Secure payment via MakeCommerce.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Phone-booking branches */}
      <section className="section" style={{ background: 'var(--white-smoke)' }}>
        <div className="container" style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ marginBottom: 8 }}>Rivers Outside Vidzeme?</h3>
          <p style={{ color: '#666', marginBottom: 24, fontSize: 15 }}>
            We also offer trips on 18 rivers across Kurzeme, Zemgale, and Latgale.
            These trips are booked directly with our regional branches.
          </p>
          <div style={{ display: 'grid', gap: 16 }}>
            {phoneBranches.map(b => (
              <div key={b.slug} style={{ background: '#fff', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ textAlign: 'left' }}>
                  <strong>{b.name}</strong>
                  <div style={{ fontSize: 14, color: '#666' }}>{b.contactPerson}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <a href={`tel:${b.phone}`} className="btn btn-primary" style={{ fontSize: 14, padding: '8px 16px' }}>
                    Call {b.phone}
                  </a>
                  <a href={`mailto:${b.email}`} className="btn" style={{ fontSize: 14, padding: '8px 16px', border: '1px solid var(--primary)', color: 'var(--primary)' }}>
                    Email
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 16, fontSize: 13, color: '#888' }}>
            <Link href="/rivers" style={{ color: 'var(--primary)' }}>Browse all rivers</Link> to find your perfect trip.
          </p>
        </div>
      </section>
    </>
  )
}
