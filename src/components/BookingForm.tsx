'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

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

const DOW = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']

const TRANSLATIONS = {
  en: {
    contactSection: 'Your Contact Information',
    firstName: 'First Name', firstNamePh: 'Your first name',
    lastName: 'Last Name', lastNamePh: 'Your last name',
    email: 'Email', phone: 'Phone',
    reservationSection: 'Reservation Details',
    river: 'River', selectRiver: '- Select river -',
    route: 'Route', selectRoute: '- Select route -', selectRiverFirst: '- Select river first -',
    startTime: 'Preferred Start Time', otherTime: 'Other time',
    dates: 'Dates', oneDayHint: 'For a one-day trip, select the same start and end date.',
    selectDate: 'Select date', startDate: 'Start date', endDate: 'End date',
    available: 'Available', unavailable: 'Unavailable',
    boats: 'Boats', seat: 'seat', seats: 'seats',
    totalPeople: 'Total people', days: 'Days', price: 'Price', transport: 'Transport',
    transportNote: '* Transport cost is an estimate and may be adjusted after your booking request based on group size, fuel costs, and other external factors. Final price will be confirmed in your confirmation email.',
    notes: 'Notes (optional)', notesPh: 'Special requests, group size, etc.',
    submit: 'Submit Booking', submitting: 'Sending...',
    footerNote: "We'll review your booking and send confirmation with payment details to your email.",
    successTitle: 'Booking Received!',
    successDesc: (email: string) => `We'll review your reservation and get back to you at ${email} with confirmation and payment details.`,
    successNote: 'Usually within a few hours during business hours (Mon–Sat, 9:00–18:00).',
    loadError: 'Could not load booking data. Please refresh.',
    fetchError: 'Failed to load form data',
    seasonError: 'Selected dates are outside the booking season.',
    connError: 'Connection error. Please try again.',
    submitError: 'Something went wrong. Please try again.',
    loading: 'Loading...',
  },
  lv: {
    contactSection: 'Kontaktinformācija',
    firstName: 'Vārds', firstNamePh: 'Jūsu vārds',
    lastName: 'Uzvārds', lastNamePh: 'Jūsu uzvārds',
    email: 'E-pasts', phone: 'Tālrunis',
    reservationSection: 'Rezervācijas informācija',
    river: 'Upe', selectRiver: '- Izvēlies upi -',
    route: 'Maršruts', selectRoute: '- Izvēlies maršrutu -', selectRiverFirst: '- Vispirms izvēlies upi -',
    startTime: 'Vēlamais sākuma laiks', otherTime: 'Cits laiks',
    dates: 'Datumi', oneDayHint: 'Vienas dienas braucienam izvēlies vienādus sākuma un beigu datumus.',
    selectDate: 'Izvēlies datumu', startDate: 'Sākuma datums', endDate: 'Beigu datums',
    available: 'Pieejams', unavailable: 'Nav pieejams',
    boats: 'Laivas', seat: 'vieta', seats: 'vietas',
    totalPeople: 'Kopā cilvēki', days: 'Dienas', price: 'Cena', transport: 'Transports',
    transportNote: '* Transporta izmaksas ir aptuvenas un var tikt koriģētas pēc rezervācijas pieprasījuma saņemšanas atkarībā no grupu lieluma, degvielas cenām un citiem faktoriem. Galīgā cena tiks apstiprināta apstiprinājuma e-pastā.',
    notes: 'Piezīmes (neobligāti)', notesPh: 'Īpaši pieprasījumi, grupas lielums u.c.',
    submit: 'Iesniegt rezervāciju', submitting: 'Sūta...',
    footerNote: 'Mēs izskatīsim jūsu rezervāciju un nosūtīsim apstiprinājumu ar maksājuma informāciju uz jūsu e-pastu.',
    successTitle: 'Rezervācija saņemta!',
    successDesc: (email: string) => `Mēs izskatīsim jūsu rezervāciju un sazināsimies ar jums uz ${email} ar apstiprinājumu un maksājuma informāciju.`,
    successNote: 'Parasti dažu stundu laikā darba laikā (P–S, 9:00–18:00).',
    loadError: 'Neizdevās ielādēt rezervācijas datus. Lūdzu atsvaidziniet lapu.',
    fetchError: 'Neizdevās ielādēt datus',
    seasonError: 'Izvēlētie datumi atrodas ārpus rezervācijas sezonas.',
    connError: 'Savienojuma kļūda. Lūdzu mēģiniet vēlreiz.',
    submitError: 'Kaut kas nogāja greizi. Lūdzu mēģiniet vēlreiz.',
    loading: 'Ielādē...',
  },
}
function getT(locale: string) { return locale === 'en' ? TRANSLATIONS.en : TRANSLATIONS.lv }

function slugify(s: string) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function pad(n: number) { return n < 10 ? '0' + n : '' + n }
function fmtDisplay(iso: string) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}

// --- Custom Calendar Component ---
function Calendar({
  value,
  onChange,
  minDate,
  maxDate,
  isDateAllowed,
  startDate,
  endDate,
  locale,
}: {
  value: string
  onChange: (iso: string) => void
  minDate: string
  maxDate: string
  isDateAllowed: (d: string) => boolean
  startDate?: string
  endDate?: string
  locale?: string
}) {
  const today = new Date()
  const initMonth = value ? new Date(value + 'T00:00:00') : new Date(minDate ? minDate + 'T00:00:00' : Date.now())
  const [viewYear, setViewYear] = useState(initMonth.getFullYear())
  const [viewMonth, setViewMonth] = useState(initMonth.getMonth())

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  const monthName = new Date(viewYear, viewMonth).toLocaleString('en', { month: 'long', year: 'numeric' })

  // Build day grid (Monday-first)
  const firstDay = new Date(viewYear, viewMonth, 1)
  const startDow = (firstDay.getDay() + 6) % 7 // 0=Mon
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

  const cells: { day: number; iso: string; disabled: boolean; blocked: boolean }[] = []
  for (let i = 0; i < startDow; i++) cells.push({ day: 0, iso: '', disabled: true, blocked: false })
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${viewYear}-${pad(viewMonth + 1)}-${pad(d)}`
    const pastMin = minDate && iso < minDate
    const pastMax = maxDate && iso > maxDate
    const blocked = !isDateAllowed(iso)
    cells.push({ day: d, iso, disabled: !!(pastMin || pastMax), blocked })
  }

  const todayIso = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`

  function dayClass(cell: typeof cells[0]) {
    if (cell.day === 0) return 'cal-day empty'
    const cls = ['cal-day']
    if (cell.disabled) cls.push('disabled')
    else if (cell.blocked) cls.push('blocked')
    if (cell.iso === todayIso) cls.push('today')
    if (cell.iso === value) cls.push('selected')
    // Range highlighting
    if (startDate && endDate && cell.iso >= startDate && cell.iso <= endDate && !cell.disabled && !cell.blocked) {
      cls.push('in-range')
      if (cell.iso === startDate) cls.push('range-start')
      if (cell.iso === endDate) cls.push('range-end')
    }
    return cls.join(' ')
  }

  return (
    <div className="cal-popup open">
      <div className="cal-header">
        <button type="button" className="cal-nav" onClick={prevMonth}>&lsaquo;</button>
        <span className="cal-month-label">{monthName}</span>
        <button type="button" className="cal-nav" onClick={nextMonth}>&rsaquo;</button>
      </div>
      <div className="cal-grid">
        {DOW.map(d => <div key={d} className="cal-dow">{d}</div>)}
        {cells.map((cell, i) => (
          <div
            key={i}
            className={dayClass(cell)}
            onClick={() => {
              if (cell.day && !cell.disabled && !cell.blocked) onChange(cell.iso)
            }}
          >
            {cell.day || ''}
          </div>
        ))}
      </div>
      <div className="cal-legend">
        <div className="cal-legend-item"><div className="cal-legend-dot" style={{ background: '#24943A' }} /> {locale === 'en' ? 'Available' : 'Pieejams'}</div>
        <div className="cal-legend-item"><div className="cal-legend-dot" style={{ background: '#ddd' }} /> {locale === 'en' ? 'Unavailable' : 'Nav pieejams'}</div>
      </div>
    </div>
  )
}

// --- DatePicker wrapper (button + popup) ---
function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  isDateAllowed,
  placeholder,
  startDate,
  endDate,
  locale,
}: {
  value: string
  onChange: (iso: string) => void
  minDate: string
  maxDate: string
  isDateAllowed: (d: string) => boolean
  placeholder: string
  startDate?: string
  endDate?: string
  locale?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="datepicker-wrap" ref={ref}>
      <button type="button" className="datepicker-btn" onClick={() => setOpen(o => !o)}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="14" height="13" rx="2" stroke="#0f5c00" strokeWidth="1.5"/><path d="M1 6h14" stroke="#0f5c00" strokeWidth="1.5"/><path d="M5 1v2M11 1v2" stroke="#0f5c00" strokeWidth="1.5" strokeLinecap="round"/></svg>
        <span className={value ? '' : 'placeholder'}>{value ? fmtDisplay(value) : placeholder}</span>
      </button>
      {open && (
        <Calendar
          value={value}
          onChange={(d) => { onChange(d); setOpen(false) }}
          minDate={minDate}
          maxDate={maxDate}
          isDateAllowed={isDateAllowed}
          startDate={startDate}
          endDate={endDate}
          locale={locale}
        />
      )}
    </div>
  )
}

// --- Main BookingForm ---
export function BookingForm({ locale = 'lv' }: { locale?: string }) {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState<FormData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
  const [preselected, setPreselected] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const t = getT(locale)

  useEffect(() => {
    fetch(API_BASE + '/get-form-data')
      .then(r => r.json())
      .then(data => { setFormData(data); setLoading(false) })
      .catch(() => { setError(t.fetchError); setLoading(false) })
  }, [])

  // Auto-select from URL params on load
  useEffect(() => {
    if (!formData || preselected) return

    const routeSlug = searchParams.get('route')
    const riverSlug = searchParams.get('river')

    if (routeSlug) {
      // ?route=slug → prefill river + route
      const match = formData.routes.find(r => slugify(r.name) === routeSlug)
      if (match) {
        setRiverId(match.riverId)
        setRouteId(match.id)
        setPreselected(true)
      }
    } else if (riverSlug) {
      // ?river=slug → prefill river only
      const match = formData.rivers.find(r => slugify(r.name) === riverSlug)
      if (match) {
        setRiverId(match.id)
        setPreselected(true)
      }
    }
  }, [formData, searchParams, preselected])

  const filteredRoutes = useMemo(() => {
    if (!formData || !riverId) return []
    return formData.routes.filter(r => r.riverId === riverId)
  }, [formData, riverId])

  const selectedRoute = useMemo(() => {
    if (!formData || !routeId) return null
    return formData.routes.find(r => r.id === routeId) || null
  }, [formData, routeId])

  const availableBoats = useMemo(() => {
    if (!formData || !selectedRoute) return []
    return formData.boatTypes.filter(b => selectedRoute.boatTypeIds.includes(b.id))
  }, [formData, selectedRoute])

  const activeWindows = useMemo(() => {
    if (!formData || !riverId) return []
    return formData.bookingWindows.filter(w => w.riverId === riverId && w.type === 'Open')
  }, [formData, riverId])

  const minDate = useMemo(() => {
    if (!activeWindows.length) return ''
    const today = new Date().toISOString().split('T')[0]
    const earliest = activeWindows.reduce((min, w) => w.seasonOpen < min ? w.seasonOpen : min, activeWindows[0].seasonOpen)
    return earliest > today ? earliest : today
  }, [activeWindows])

  const maxDate = useMemo(() => {
    if (!activeWindows.length) return ''
    return activeWindows.reduce((max, w) => w.seasonClose > max ? w.seasonClose : max, activeWindows[0].seasonClose)
  }, [activeWindows])

  const isDateAllowed = useCallback((date: string): boolean => {
    return activeWindows.some(w => date >= w.seasonOpen && date <= w.seasonClose)
  }, [activeWindows])

  const days = useMemo(() => {
    if (!startDate || !endDate) return 0
    const s = new Date(startDate)
    const e = new Date(endDate)
    const diff = Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1
    return diff > 0 ? diff : 0
  }, [startDate, endDate])

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

  // Total people capacity
  const totalPeople = useMemo(() => {
    if (!formData) return 0
    let total = 0
    for (const [btId, qty] of Object.entries(boatSelections)) {
      if (qty <= 0) continue
      const bt = formData.boatTypes.find(b => b.id === btId)
      if (bt) total += bt.capacity * qty
    }
    return total
  }, [formData, boatSelections])

  const transportCost = selectedRoute?.transportCost || 0
  const totalCost = boatCost + transportCost
  const hasBoats = Object.values(boatSelections).some(q => q > 0)

  function handleRiverChange(newRiverId: string) {
    setRiverId(newRiverId)
    setRouteId('')
    setBoatSelections({})
    setStartDate('')
    setEndDate('')
  }

  function handleRouteChange(newRouteId: string) {
    setRouteId(newRouteId)
    setBoatSelections({})
  }

  function setBoatQty(boatId: string, val: number) {
    setBoatSelections(prev => {
      const next = Math.max(0, val)
      if (next === 0) {
        const copy = { ...prev }
        delete copy[boatId]
        return copy
      }
      return { ...prev, [boatId]: next }
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!routeId || !startDate || !endDate || !hasBoats) return
    if (!isDateAllowed(startDate) || !isDateAllowed(endDate)) {
      setError(t.seasonError)
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch(API_BASE + '/submit-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName, lastName, email,
          phone: '+371 ' + phone,
          riverId, routeId, startDate, endDate,
          boatSelections, transportCost, startTime, notes,
          paymentMethod: 'Cash'
        })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSubmitted(true)
      } else {
        setError(data.error || t.submitError)
      }
    } catch {
      setError(t.connError)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="booking-card"><div className="booking-loading"><div className="bf-spinner" />{t.loading}</div></div>

  if (submitted) {
    return (
      <div className="booking-card">
        <div className="booking-success">
          <div className="booking-success-icon">&#10003;</div>
          <h3>{t.successTitle}</h3>
          <p>{t.successDesc(email)}</p>
          <p className="booking-success-note">{t.successNote}</p>
        </div>
      </div>
    )
  }

  if (!formData) return <div className="booking-card booking-error">{t.loadError}</div>

  return (
    <div className="booking-card">
    <form className="booking-form" onSubmit={handleSubmit}>
      {error && <div className="booking-form-error">{error}</div>}

      {/* Contact */}
      <div className="bf-section">
        <div className="bf-section-title">{t.contactSection}</div>
        <div className="bf-row">
          <div className="bf-field">
            <label>{t.firstName} <span className="bf-req">*</span></label>
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder={t.firstNamePh} required />
          </div>
          <div className="bf-field">
            <label>{t.lastName} <span className="bf-req">*</span></label>
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder={t.lastNamePh} required />
          </div>
        </div>
        <div className="bf-row">
          <div className="bf-field">
            <label>{t.email} <span className="bf-req">*</span></label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required />
          </div>
          <div className="bf-field">
            <label>{t.phone} <span className="bf-req">*</span></label>
            <div className="bf-phone-wrap">
              <span className="bf-phone-prefix">+371</span>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="20000000" required />
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Details */}
      <div className="bf-section">
        <div className="bf-section-title">{t.reservationSection}</div>
        <div className="bf-row">
          <div className="bf-field">
            <label>{t.river} <span className="bf-req">*</span></label>
            <select value={riverId} onChange={e => handleRiverChange(e.target.value)} required>
              <option value="">{t.selectRiver}</option>
              {formData.rivers.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
          <div className="bf-field">
            <label>{t.route} <span className="bf-req">*</span></label>
            <select value={routeId} onChange={e => handleRouteChange(e.target.value)} required disabled={!riverId}>
              <option value="">{riverId ? t.selectRoute : t.selectRiverFirst}</option>
              {filteredRoutes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
        </div>

        {selectedRoute && (
          <div className="bf-field" style={{ marginBottom: 20 }}>
            <label>{t.startTime}</label>
            <select value={startTime} onChange={e => setStartTime(e.target.value)}>
              {selectedRoute.startTimes
                .filter(st => st !== 'Cits laiks')
                .map(st => <option key={st} value={st}>{st}</option>)}
              <option value="cits">{t.otherTime}</option>
            </select>
          </div>
        )}

        {/* Dates - custom calendar */}
        {selectedRoute && (
          <div className="bf-field" style={{ marginBottom: 20 }}>
            <label>{t.dates} <span className="bf-req">*</span></label>
            <small className="bf-hint">{t.oneDayHint}</small>
            <div className="bf-date-row">
              <div className="bf-field">
                <DatePicker
                  value={startDate}
                  onChange={d => { setStartDate(d); if (!endDate || d > endDate) setEndDate(d) }}
                  minDate={minDate}
                  maxDate={maxDate}
                  isDateAllowed={isDateAllowed}
                  placeholder={t.selectDate}
                  startDate={startDate}
                  endDate={endDate}
                  locale={locale}
                />
                <small className="bf-hint">{t.startDate}</small>
              </div>
              <div className="bf-field">
                <DatePicker
                  value={endDate}
                  onChange={d => setEndDate(d)}
                  minDate={startDate || minDate}
                  maxDate={maxDate}
                  isDateAllowed={isDateAllowed}
                  placeholder={t.selectDate}
                  startDate={startDate}
                  endDate={endDate}
                  locale={locale}
                />
                <small className="bf-hint">{t.endDate}</small>
              </div>
            </div>
          </div>
        )}

        {/* Boat Selection */}
        {selectedRoute && startDate && endDate && (
          <div className="bf-field">
            <label>{t.boats} <span className="bf-req">*</span></label>
            <div className="bf-boat-grid">
              {availableBoats.map(bt => {
                const qty = boatSelections[bt.id] || 0
                return (
                  <div key={bt.id} className={`bf-boat-card${qty > 0 ? ' bf-boat-selected' : ''}`}>
                    <div className="bf-boat-header">
                      <div className="bf-boat-name">{bt.name}</div>
                    </div>
                    <div className="bf-boat-desc">{bt.capacity} {bt.capacity === 1 ? t.seat : t.seats}</div>
                    <input
                      type="number"
                      className="bf-boat-input"
                      min={0}
                      value={qty}
                      onChange={e => setBoatQty(bt.id, parseInt(e.target.value) || 0)}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Live Summary Bar */}
      {selectedRoute && (
        <div className="bf-summary-bar">
          <div className="bf-summary-item">
            <div className="bf-summary-label">{t.totalPeople}</div>
            <div className="bf-summary-value">{totalPeople}</div>
          </div>
          <div className="bf-summary-item">
            <div className="bf-summary-label">{t.days}</div>
            <div className="bf-summary-value">{days || '--'}</div>
          </div>
          <div className="bf-summary-item">
            <div className="bf-summary-label">{t.price}</div>
            <div className="bf-summary-value">&euro;{boatCost}</div>
          </div>
          <div className="bf-summary-item">
            <div className="bf-summary-label">{t.transport}</div>
            <div className="bf-summary-value">&euro;{transportCost}</div>
          </div>
        </div>
      )}
      {selectedRoute && (
        <p className="bf-transport-note">{t.transportNote}</p>
      )}

      {/* Notes */}
      <div className="bf-section">
        <div className="bf-field">
          <label>{t.notes}</label>
          <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder={t.notesPh} />
        </div>
      </div>

      {/* Waiver consent */}
      <div style={{
        background: 'var(--tint, #f4faf5)',
        border: '1.5px solid var(--border, #d4e8d8)',
        borderRadius: 10,
        padding: '20px 20px 16px',
        marginBottom: 20,
      }}>
        <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, color: 'var(--text, #191716)' }}>
          {locale === 'en' ? 'Before you book — please read' : 'Pirms rezervācijas — lūdzu izlasiet'}
        </p>
        <ul style={{ margin: '0 0 16px 0', paddingLeft: 20, fontSize: 13, color: '#555', lineHeight: 1.7 }}>
          {locale === 'en' ? [
            'Life jackets must be worn at all times on the water — no exceptions',
            'Alcohol and drugs are strictly prohibited before and during the trip',
            'You are financially responsible for lost or damaged equipment',
            'Trips are self-guided — no SIA Mučas staff will be on the water with you',
            'By booking you acknowledge inherent risks including capsizing, cold water, and injury',
          ] : [
            'Glābšanas vestes jāvalkā visu laiku uz ūdens — bez izņēmumiem',
            'Alkohols un narkotikas ir stingri aizliegtas pirms un brauciena laikā',
            'Jūs esat finansiāli atbildīgi par pazaudētu vai bojātu aprīkojumu',
            'Braucieni ir pašvadīti — SIA Mučas darbinieki nebūs kopā ar jums uz ūdens',
            'Rezervējot jūs atzīstat raksturīgos riskus, tostarp apgāšanos, aukstu ūdeni un traumu',
          ].map((rule, i) => <li key={i}>{rule}</li>)}
        </ul>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', fontSize: 13, color: 'var(--text, #191716)', lineHeight: 1.5 }}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            style={{ marginTop: 3, width: 16, height: 16, flexShrink: 0, cursor: 'pointer', accentColor: 'var(--primary, #24943A)' }}
          />
          <span>
            {locale === 'en' ? 'I have read and agree to the' : 'Esmu izlasījis un piekrītu'}{' '}
            <a href={locale === 'en' ? '/en/waiver' : '/drosibas-apliecinajums'} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary, #24943A)', fontWeight: 600 }}>
              {locale === 'en' ? 'Safety Waiver' : 'Drošības apliecinājumam'}
            </a>
            {' & '}
            <a href={locale === 'en' ? '/en/terms' : '/noteikumi'} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary, #24943A)', fontWeight: 600 }}>
              {locale === 'en' ? 'Terms of Service' : 'Pakalpojumu noteikumiem'}
            </a>.
          </span>
        </label>
      </div>

      <button
        type="submit"
        className="bf-submit-btn"
        disabled={submitting || !agreed || !routeId || !startDate || !endDate || !hasBoats || !firstName || !lastName || !email || !phone}
        style={{ opacity: agreed ? 1 : 0.45, cursor: agreed ? 'pointer' : 'not-allowed', transition: 'opacity 0.2s' }}
      >
        {submitting ? t.submitting : t.submit}
      </button>
      <p className="bf-footer-note">{t.footerNote}</p>
    </form>
    </div>
  )
}
