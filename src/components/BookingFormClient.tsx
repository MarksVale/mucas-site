'use client'

import { useState, useTransition } from 'react'
import { logConsent } from '@/app/actions/logConsent'

interface Route { slug: string; name: string; river: string; days: number }
interface Boat  { slug: string; name: string; seats: number }

interface Props {
  routes: Route[]
  boats: Boat[]
  locale: string
  t: {
    startBooking: string
    startBookingDesc: string
    route: string
    selectRoute: string
    day: string
    days: string
    boatType: string
    selectBoat: string
    seat: string
    seats: string
    date: string
    numBoats: string
    startTime: string
    name: string
    namePlaceholder: string
    email: string
    phone: string
    notes: string
    notesPlaceholder: string
    proceedCheckout: string
    securePayment: string
    waiverTitle: string
    waiverRules: string[]
    waiverCheckbox: string
    waiverLink: string
    termsLink: string
    submitting: string
    successTitle: string
    successDesc: string
  }
}

export function BookingFormClient({ routes, boats, locale, t }: Props) {
  const [agreed, setAgreed]   = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]     = useState('')
  const [isPending, startTransition] = useTransition()

  const waiverHref = locale === 'en' ? '/en/waiver' : '/drosibas-apliecinajums'
  const termsHref  = locale === 'en' ? '/en/terms'  : '/noteikumi'

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!agreed) return

    const form = e.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const result = await logConsent({
        name:      data.get('name')     as string,
        email:     data.get('email')    as string,
        phone:     data.get('phone')    as string,
        route:     data.get('route')    as string,
        tripDate:  data.get('date')     as string,
        numBoats:  data.get('numBoats') as string,
        notes:     data.get('notes')    as string,
        locale,
        waiverAgreed: true,
      })

      if (result.ok) {
        setSuccess(true)
        setError('')
      } else {
        setError(locale === 'lv'
          ? 'Diemžēl radās kļūda. Lūdzu mēģiniet vēlreiz vai sazinieties ar mums.'
          : 'Something went wrong. Please try again or contact us directly.')
      }
    })
  }

  if (success) {
    return (
      <div className="booking-card" style={{ textAlign: 'center', padding: '48px 32px' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
        <h3 style={{ marginBottom: 12 }}>{t.successTitle}</h3>
        <p style={{ color: '#666' }}>{t.successDesc}</p>
      </div>
    )
  }

  return (
    <div className="booking-card">
      <h3>{t.startBooking}</h3>
      <p style={{ color: '#666', marginBottom: 24 }}>{t.startBookingDesc}</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t.route}</label>
          <select name="route" required>
            <option value="">{t.selectRoute}</option>
            {routes.map(r => (
              <option key={r.slug} value={r.name}>
                {r.name} ({r.river} &bull; {r.days} {r.days === 1 ? t.day : t.days})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>{t.boatType}</label>
          <select name="boatType">
            <option value="">{t.selectBoat}</option>
            {boats.map(b => (
              <option key={b.slug} value={b.slug}>
                {b.name} ({b.seats} {b.seats === 1 ? t.seat : t.seats})
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="form-group">
            <label>{t.date}</label>
            <input type="date" name="date" />
          </div>
          <div className="form-group">
            <label>{t.numBoats}</label>
            <select name="numBoats">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5+</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>{t.startTime}</label>
          <select name="startTime">
            <option>9:00</option>
            <option>11:00</option>
            <option>13:00</option>
            <option>15:00</option>
          </select>
        </div>

        <div className="form-group">
          <label>{t.name} *</label>
          <input type="text" name="name" placeholder={t.namePlaceholder} required />
        </div>
        <div className="form-group">
          <label>{t.email} *</label>
          <input type="email" name="email" placeholder="your@email.com" required />
        </div>
        <div className="form-group">
          <label>{t.phone}</label>
          <input type="tel" name="phone" placeholder="+371..." />
        </div>
        <div className="form-group">
          <label>{t.notes}</label>
          <textarea name="notes" rows={3} placeholder={t.notesPlaceholder} />
        </div>

        {/* ── WAIVER CONSENT BLOCK ── */}
        <div style={{
          background: 'var(--tint)',
          border: '1.5px solid var(--border)',
          borderRadius: 10,
          padding: '20px 20px 16px',
          marginBottom: 20,
        }}>
          <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, color: 'var(--text)' }}>
            {t.waiverTitle}
          </p>
          <ul style={{ margin: '0 0 16px 0', paddingLeft: 20, fontSize: 13, color: '#555', lineHeight: 1.7 }}>
            {t.waiverRules.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ul>
          <label style={{
            display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer',
            fontSize: 13, color: 'var(--text)', lineHeight: 1.5,
          }}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              style={{ marginTop: 3, width: 16, height: 16, flexShrink: 0, cursor: 'pointer', accentColor: 'var(--primary)' }}
            />
            <span>
              {t.waiverCheckbox}{' '}
              <a href={waiverHref} target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--primary)', fontWeight: 600 }}>
                {t.waiverLink}
              </a>
              {' & '}
              <a href={termsHref} target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--primary)', fontWeight: 600 }}>
                {t.termsLink}
              </a>
              .
            </span>
          </label>
        </div>

        {error && (
          <p style={{ color: 'red', fontSize: 13, marginBottom: 12 }}>{error}</p>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!agreed || isPending}
          style={{
            width: '100%', fontSize: 18, padding: '16px 32px',
            opacity: agreed ? 1 : 0.45,
            cursor: agreed ? 'pointer' : 'not-allowed',
            transition: 'opacity 0.2s',
          }}
        >
          {isPending ? t.submitting : t.proceedCheckout}
        </button>
        <p style={{ textAlign: 'center', fontSize: 13, color: '#888', marginTop: 12 }}>
          {t.securePayment}
        </p>
      </form>
    </div>
  )
}
