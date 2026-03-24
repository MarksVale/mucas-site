import type { Metadata } from 'next'
import { Suspense } from 'react'
import { BookingForm } from '@/components/BookingForm'
import { getBookingPage } from '@/lib/content'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Book Your Trip | Mučas Laivu Noma',
  description: 'Book a kayak, canoe, or raft trip on Latvia\'s rivers. Choose your route, pick boats, and reserve your adventure.',
}

export default async function BookingPage() {
  const c = await getBookingPage()

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>{c.heroHeading}</h1>
          <p>{c.heroSubtitle}</p>
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
