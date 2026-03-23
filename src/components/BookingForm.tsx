'use client'

import { useState, useEffect, useMemo } from 'react'

const API_BASE = 'https://boat-availability.vercel.app/api'

interface River { id: string; name: string }
interface Route {
  id: string; name: string; riverId: string; hubName: string
  startTimes: string[]; transportCost: number; boatTypeIds: string[]
}
interface BoatType {
  id: string; name: string; price: number; capacity: number; category: string
}
interface BookingWindow {
  riverId: string; seasonOpen: string; seasonClose: string; type: string; notes: string
}
interface FormData {
  rivers: River[]; routes: Route[]; boatTypes: BoatType[]; bookingWindows: BookingWindow[]
}

export function BookingForm() {
  const [formData, setFormData] = useState<FormData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [riverId, setRiverId] = useState('')
  const [routeId, setRouteId] = useState('')
  const [startTime, setStartTime] = useState('11:00')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [boatSelections, setBoatSelections] = useState<Record<string, number>>({})
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Load form data from boat-availability API
  useEffect(() => {
    fetch(API_BASE + '/get-form-data')
      .then(r => r.json())
      .then(data => { setFormData(data); setLoading(false) })
      .catch(() => { setError('Failed to load form data'); setLoading(false) })
  }, [])

  // Filtered routes based on selected river
  const filteredRoutes = useMemo(() => {
    if (!formData || !riverId) return []
    return formData.routes.filter(r => r.riverId === riverId)
  }, [formData, riverId])

  // Selected route object
  const selectedRoute = useMemo(() => {
    if (!formData || !routeId) return null
    return formData.routes.find(r => r.id === routeId) || null
  }, [formData, routeId])

  // Available boat types for selected route
  const availableBoats = useMemo(() => {
    if (!formData || !selectedRoute) return []
    return formData.boatTypes.filter(b => selectedRoute.boatTypeIds.includes(b.id))
  }, [formData, selectedRoute])

  // Booking windows for selected river
  const activeWindows = useMemo(() => {
    if (!formData || !riverId) return []
    return formData.bookingWindows.filter(w => w.riverId === riverId && w.type === 'Open')
  }, [formData, riverId])

  // Min date for date picker (earliest open window)
  const minDate = useMemo(() => {
    if (!activeWindows.length) return ''
    const today = new Date().toISOString().split('T')[0]
    const earliest = activeWindows.reduce((min, w) => w.seasonOpen < min ? w.seasonOpen : min, activeWindows[0].seasonOpen)
    return earliest > today ? earliest : today
  }, [activeWindows])

  // Max date (latest close window)
  const maxDate = useMemo(() => {
    if (!activeWindows.length) return ''
    return activeWindows.reduce((max, w) => w.seasonClose > max ? w.seasonClose : max, activeWindows[0].seasonClose)
  }, [activeWindows])

  // Check if a date is within any active booking window
  function isDateInWindow(date: string): boolean {
    return activeWindows.some(w => date >= w.seasonOpen && date <= w.seasonClose)
  }

  // Calculate days
  const days = useMemo(() => {
    if (!startDate || !endDate) return 0
    const s = new Date(startDate)
    const e = new Date(endDate)
    const diff = Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1
    return diff > 0 ? diff : 0
  }, [startDate, endDate])

  // Calculate boat cost
  const boatCost = useMemo(() => {
    if (!formData || !days) return 0
    let total = 0
    for (const [btId, qty] of Object.entries(boatSelections)) {
      if (qty <= 0) continue
      const bt = formData.boatTypes.find(b => b.id === btId)
      if (bt) total += bt.price * days * qty
    }
    return total
  }, [formData, boatSelections, days])

  const transportCost = selectedRoute?.transportCost || 0
  const totalCost = boatCost + transportCost

  // Has at least one boat selected
  const hasBoats = Object.values(boatSelections).some(q => q > 0)

  // Reset downstream when river changes
  function handleRiverChange(newRiverId: string) {
    setRiverId(newRiverId)
    setRouteId('')
    setBoatSelections({})
    setStartDate('')
    setEndDate('')
  }

  // Reset boats when route changes
  function handleRouteChange(newRouteId: string) {
    setRouteId(newRouteId)
    setBoatSelections({})
  }

  function updateBoatQty(boatId: string, delta: number) {
    setBoatSelections(prev => {
      const current = prev[boatId] || 0
      const next = Math.max(0, current + delta)
      if (next === 0) {
        const { [boatId]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [boatId]: next }
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!routeId || !startDate || !endDate || !hasBoats) return

    // Validate dates in window
    if (!isDateInWindow(startDate) || !isDateInWindow(endDate)) {
      setError('Selected dates are outside the booking season.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const res = await fetch(API_BASE + '/submit-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone: '+371 ' + phone,
          riverId,
          routeId,
          startDate,
          endDate,
          boatSelections,
          transportCost,
          startTime,
          notes,
          paymentMethod: 'Cash'
        })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSubmitted(true)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="booking-loading">Loading booking form...</div>
  }

  if (submitted) {
    return (
      <div className="booking-success">
        <div className="booking-success-icon">&#10003;</div>
        <h3>Booking Received!</h3>
        <p>We&apos;ll review your reservation and get back to you at <strong>{email}</strong> with confirmation and payment details.</p>
        <p className="booking-success-note">Usually within a few hours during business hours (Mon&ndash;Sat, 9:00&ndash;18:00).</p>
      </div>
    )
  }

  if (!formData) {
    return <div className="booking-error">Could not load booking data. Please refresh.</div>
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      {error && <div className="booking-form-error">{error}</div>}

      {/* Contact Information */}
      <div className="bf-section">
        <div className="bf-section-title">Your Contact Information</div>
        <div className="bf-row">
          <div className="bf-field">
            <label>First Name <span className="bf-req">*</span></label>
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Your first name" required />
          </div>
          <div className="bf-field">
            <label>Last Name <span className="bf-req">*</span></label>
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Your last name" required />
          </div>
        </div>
        <div className="bf-row">
          <div className="bf-field">
            <label>Email <span className="bf-req">*</span></label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required />
          </div>
          <div className="bf-field">
            <label>Phone <span className="bf-req">*</span></label>
            <div className="bf-phone-wrap">
              <span className="bf-phone-prefix">+371</span>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="20000000" required />
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Details */}
      <div className="bf-section">
        <div className="bf-section-title">Reservation Details</div>

        <div className="bf-row">
          <div className="bf-field">
            <label>River <span className="bf-req">*</span></label>
            <select value={riverId} onChange={e => handleRiverChange(e.target.value)} required>
              <option value="">— Select river —</option>
              {formData.rivers.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
          <div className="bf-field">
            <label>Route <span className="bf-req">*</span></label>
            <select value={routeId} onChange={e => handleRouteChange(e.target.value)} required disabled={!riverId}>
              <option value="">{riverId ? '— Select route —' : '— Select river first —'}</option>
              {filteredRoutes.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
        </div>

        {selectedRoute && (
          <div className="bf-field" style={{ marginBottom: 20 }}>
            <label>Preferred Start Time</label>
            <select value={startTime} onChange={e => setStartTime(e.target.value)}>
              {selectedRoute.startTimes
                .filter(t => t !== 'Cits laiks')
                .map(t => <option key={t} value={t}>{t}</option>)}
              <option value="cits">Other time</option>
            </select>
          </div>
        )}

        {selectedRoute && (
          <div className="bf-field" style={{ marginBottom: 20 }}>
            <label>Dates <span className="bf-req">*</span></label>
            <small className="bf-hint">For a one-day trip, select the same start and end date.</small>
            <div className="bf-row">
              <div className="bf-field">
                <input
                  type="date"
                  value={startDate}
                  onChange={e => {
                    setStartDate(e.target.value)
                    if (!endDate || e.target.value > endDate) setEndDate(e.target.value)
                  }}
                  min={minDate}
                  max={maxDate}
                  required
                />
                <small className="bf-hint">Start date</small>
              </div>
              <div className="bf-field">
                <input
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  min={startDate || minDate}
                  max={maxDate}
                  required
                />
                <small className="bf-hint">End date</small>
              </div>
            </div>
          </div>
        )}

        {/* Boat Selection */}
        {selectedRoute && startDate && endDate && (
          <div className="bf-field">
            <label>Boats <span className="bf-req">*</span></label>
            <div className="bf-boat-grid">
              {availableBoats.map(bt => {
                const qty = boatSelections[bt.id] || 0
                return (
                  <div key={bt.id} className={`bf-boat-card${qty > 0 ? ' bf-boat-selected' : ''}`}>
                    <div className="bf-boat-name">{bt.name}</div>
                    <div className="bf-boat-meta">
                      <span>{bt.capacity} {bt.capacity === 1 ? 'seat' : 'seats'}</span>
                      <span className="bf-boat-cat">{bt.category}</span>
                    </div>
                    <div className="bf-boat-price">{bt.price}€ / day</div>
                    <div className="bf-boat-qty">
                      <button type="button" onClick={() => updateBoatQty(bt.id, -1)} disabled={qty === 0}>−</button>
                      <span>{qty}</span>
                      <button type="button" onClick={() => updateBoatQty(bt.id, 1)}>+</button>
                    </div>
                    {qty > 0 && days > 0 && (
                      <div className="bf-boat-subtotal">{bt.price * days * qty}€</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="bf-section">
        <div className="bf-field">
          <label>Notes (optional)</label>
          <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Special requests, group size, etc." />
        </div>
      </div>

      {/* Summary */}
      {hasBoats && days > 0 && (
        <div className="bf-summary">
          <div className="bf-summary-title">Booking Summary</div>
          <div className="bf-summary-row">
            <span>Boats ({days} {days === 1 ? 'day' : 'days'})</span>
            <span>{boatCost}€</span>
          </div>
          <div className="bf-summary-row">
            <span>Transport</span>
            <span>{transportCost}€</span>
          </div>
          <div className="bf-summary-row bf-summary-total">
            <span>Total</span>
            <span>{totalCost}€</span>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary bf-submit"
        disabled={submitting || !routeId || !startDate || !endDate || !hasBoats || !firstName || !lastName || !email || !phone}
      >
        {submitting ? 'Sending...' : 'Submit Booking'}
      </button>
      <p className="bf-footer-note">
        We&apos;ll review your booking and send confirmation with payment details to your email.
      </p>
    </form>
  )
}
