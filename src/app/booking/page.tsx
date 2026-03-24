import type { Metadata } from 'next'
import { Suspense } from 'react'
import { BookingForm } from '@/components/BookingForm'

export const metadata: Metadata = {
  title: 'Book Your Trip | Mučas Laivu Noma',
  description: 'Book a kayak, canoe, or raft trip on Latvia\'s rivers. Choose your route, pick boats, and reserve your adventure.',
}

export default function BookingPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Book Your Trip</h1>
          <p>Choose your route, pick your boats, and hit the water</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="booking-card" style={{ maxWidth: 720, margin: '0 auto' }}>
            <Suspense fallback={<div className="booking-loading"><div className="bf-spinner" />Loading...</div>}>
              <BookingForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  )
}
