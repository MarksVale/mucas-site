'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { DatePicker } from './SharedDatePicker'

const API_BASE = '/api'

const COUNTRY_CODES = [
  { code: '+371', name: 'Latvia',      iso: 'lv' },
  { code: '+370', name: 'Lithuania',   iso: 'lt' },
  { code: '+372', name: 'Estonia',     iso: 'ee' },
  { code: '+358', name: 'Finland',     iso: 'fi' },
  { code: '+46',  name: 'Sweden',      iso: 'se' },
  { code: '+47',  name: 'Norway',      iso: 'no' },
  { code: '+45',  name: 'Denmark',     iso: 'dk' },
  { code: '+49',  name: 'Germany',     iso: 'de' },
  { code: '+44',  name: 'UK',          iso: 'gb' },
  { code: '+33',  name: 'France',      iso: 'fr' },
  { code: '+31',  name: 'Netherlands', iso: 'nl' },
  { code: '+48',  name: 'Poland',      iso: 'pl' },
  { code: '+7',   name: 'Russia',      iso: 'ru' },
  { code: '+380', name: 'Ukraine',     iso: 'ua' },
  { code: '+1',   name: 'USA / Canada',iso: 'us' },
]
function FlagImg({ iso, name }: { iso: string; name: string }) {
  return <img src={`https://flagcdn.com/20x15/${iso}.png`} width={20} height={15} alt={name} style={{ borderRadius: 2, objectFit: 'cover', display: 'inline-block', verticalAlign: 'middle' }} />
}

function CountryCodePicker({ value, onChange }: { value: string; onChange: (code: string) => void }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  const selected = COUNTRY_CODES.find(c => c.code === value) || COUNTRY_CODES[0]
  const filtered = COUNTRY_CODES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.code.includes(search))
  return (
    <div className="bf-cc-wrap" ref={ref}>
      <button type="button" className="bf-cc-btn" onClick={() => setOpen(o => !o)}>
        <FlagImg iso={selected.iso} name={selected.name} />
        <span className="bf-cc-code">{selected.code}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {open && (
        <div className="bf-cc-dropdown">
          <div className="bf-cc-search-wrap">
            <input className="bf-cc-search" type="text" placeholder="Search country..." value={search} onChange={e => setSearch(e.target.value)} autoFocus />
          </div>
          <div className="bf-cc-list">
            {filtered.map(c => (
              <div key={c.code} className={`bf-cc-item${c.code === value ? ' bf-cc-item-active' : ''}`}
                onClick={() => { onChange(c.code); setOpen(false); setSearch('') }}>
                <FlagImg iso={c.iso} name={c.name} />
                <span className="bf-cc-name">{c.name}</span>
                <span className="bf-cc-num">{c.code}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface River { id: string; name: string }
interface Route {
  id: string; name: string; riverId: string; hubName: string
  startTimes: string[]; transportCost: number; boatTypeIds: string[]
}
interface BoatType { id: string; name: string; price: number; capacity: number; category: string }
interface BookingWindow { riverId: string; seasonOpen: string; seasonClose: string; type: string; notes: string }
interface FormData { rivers: River[]; routes: Route[]; boatTypes: BoatType[]; bookingWindows: BookingWindow[] }

export function BookingForm({ locale = 'lv' }: { locale?: string }) {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState<FormData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phonePrefix, setPhonePrefix] = useState('+371')
  const [phone, setPhone] = useState('')
  const refLastName = useRef<HTMLInputElement>(null)
  const refEmail = useRef<HTMLInputElement>(null)
  const refPhone = useRef<HTMLInputElement>(null)
  function advanceOn(next: React.RefObject<HTMLInputElement | null>) {
    return (e: React.KeyboardEvent) => { if (e.key === 'Enter') { e.preventDefault(); next.current?.focus() } }
  }
  const [riverId, setRiverId] = useState('')
  const [routeId, setRouteId] = useState('')
  const [startTime, setStartTime] = useState('11:00')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [boatSelections, setBoatSelections] = useState<Record<string, number>>({})
  const [availability, setAvailability] = useState<Record<string, { available: number; total: number }>>({})
  const [availLoading, setAvailLoading] = useState(false)
  const [notes, setNotes] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Online')
  const [agreed, setAgreed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [preselected, setPreselected] = useState(false)

  useEffect(() => {
    fetch(API_BASE + '/get-form-data')
      .then(r => r.json())
      .then(data => { setFormData(data); setLoading(false) })
      .catch(() => { setError('Failed to load form data'); setLoading(false) })
  }, [])

  useEffect(() => {
    if (!formData || preselected) return
    const routeSlug = searchParams.get('route')
    const riverSlug = searchParams.get('river')
    const dateParam = searchParams.get('date')
    if (routeSlug) {
      const match = formData.routes.find(r => slugify(r.name) === routeSlug)
      if (match) { setRiverId(match.riverId); setRouteId(match.id); setPreselected(true) }
    } else if (riverSlug) {
      const match = formData.rivers.find(r => slugify(r.name) === riverSlug)
      if (match) { setRiverId(match.id); setPreselected(true) }
    }
    if (dateParam) setStartDate(dateParam)
  }, [formData, searchParams, preselected])

  const filteredRoutes = useMemo(() => formData && riverId ? formData.routes.filter(r => r.riverId === riverId) : [], [formData, riverId])
  const selectedRoute = useMemo(() => formData && routeId ? (formData.routes.find(r => r.id === routeId) || null) : null, [formData, routeId])
  const availableBoats = useMemo(() => formData && selectedRoute ? formData.boatTypes.filter(b => selectedRoute.boatTypeIds.includes(b.id)) : [], [formData, selectedRoute])
  const activeWindows = useMemo(() => formData && riverId ? formData.bookingWindows.filter(w => w.riverId === riverId && w.type === 'Open') : [], [formData, riverId])

  const minDate = useMemo(() => {
    if (!activeWindows.length) return ''
    const today = new Date().toISOString().split('T')[0]
    const earliest = activeWindows.reduce((min, w) => w.seasonOpen < min ? w.seasonOpen : min, activeWindows[0].seasonOpen)
    return earliest > today ? earliest : today
  }, [activeWindows])

  const maxDate = useMemo(() => !activeWindows.length ? '' : activeWindows.reduce((max, w) => w.seasonClose > max ? w.seasonClose : max, activeWindows[0].seasonClose), [activeWindows])
  const isDateAllowed = useCallback((date: string) => activeWindows.some(w => date >= w.seasonOpen && date <= w.seasonClose), [activeWindows])

  const days = useMemo(() => {
    if (!startDate || !endDate) return 0
    const diff = Math.round((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000) + 1
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
  const hasBoats = Object.values(boatSelections).some(q => q > 0)

  useEffect(() => {
    if (!startDate || !endDate) { setAvailability({}); return }
    setAvailLoading(true)
    fetch(`${API_BASE}/check-availability?start_date=${startDate}&end_date=${endDate}`)
      .then(r => r.json())
      .then(data => {
        if (data.availability) {
          const map: Record<string, { available: number; total: number }> = {}
          for (const [id, v] of Object.entries(data.availability as Record<string, { available: number; total: number }>)) {
            map[id] = { available: v.available, total: v.total }
          }
          setAvailability(map)
          // clamp existing selections to new availability
          setBoatSelections(prev => {
            const next = { ...prev }
            for (const [id, qty] of Object.entries(next)) {
              const avail = map[id]?.available ?? 0
              if (qty > avail) next[id] = avail
              if (next[id] <= 0) delete next[id]
            }
            return next
          })
        }
      })
      .catch(() => setAvailability({}))
      .finally(() => setAvailLoading(false))
  }, [startDate, endDate])

  function handleRiverChange(id: string) { setRiverId(id); setRouteId(''); setBoatSelections({}); setAvailability({}); setStartDate(''); setEndDate('') }
  function handleRouteChange(id: string) { setRouteId(id); setBoatSelections({}) }
  function setBoatQty(boatId: string, val: number) {
    setBoatSelections(prev => {
      const next = Math.max(0, val)
      if (next === 0) { const copy = { ...prev }; delete copy[boatId]; return copy }
      return { ...prev, [boatId]: next }
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!routeId || !startDate || !endDate || !hasBoats || !agreed) return
    if (!isDateAllowed(startDate) || !isDateAllowed(endDate)) { setError(isLv ? 'Izvēlētie datumi ir ārpus rezervācijas sezonas.' : 'Selected dates are outside the booking season.'); return }
    setSubmitting(true); setError('')
    try {
      const res = await fetch(API_BASE + '/submit-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, phone: phonePrefix + ' ' + phone, riverId, routeId, startDate, endDate, boatSelections, transportCost, startTime, notes, paymentMethod }),
      })
      const data = await res.json()
      if (res.ok && data.success) setSubmitted(true)
      else setError(data.error || (isLv ? 'Kaut kas nogāja greizi. Lūdzu, mēģiniet vēlreiz.' : 'Something went wrong. Please try again.'))
    } catch {
      setError(isLv ? 'Savienojuma kļūda. Lūdzu, mēģiniet vēlreiz.' : 'Connection error. Please try again.')
    } finally { setSubmitting(false) }
  }

  const isLv = locale !== 'en'

  if (loading) return <div className="booking-loading"><div className="bf-spinner" />{isLv ? 'Ielādē...' : 'Loading...'}</div>
  if (submitted) return (
    <div className="booking-success">
      <div className="booking-success-icon">&#10003;</div>
      <h3>{isLv ? 'Rezervācija saņemta!' : 'Booking Received!'}</h3>
      <p>{isLv ? 'Mēs izskatīsim jūsu rezervāciju un sazināsimies ar jums uz' : "We'll review your reservation and get back to you at"} <strong>{email}</strong>{isLv ? ' ar apstiprinājumu un maksājuma informāciju.' : ' with confirmation and payment details.'}</p>
      <p className="booking-success-note">{isLv ? 'Parasti dažu stundu laikā darba laikā (P–Se, 9:00–18:00).' : 'Usually within a few hours during business hours (Mon–Sat, 9:00–18:00).'}</p>
    </div>
  )
  if (!formData) return <div className="booking-error">{isLv ? 'Nevarēja ielādēt datus. Lūdzu, atsvaidziniet lapu.' : 'Could not load booking data. Please refresh.'}</div>

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      {error && <div className="booking-form-error">{error}</div>}

      <div className="bf-section">
        <div className="bf-section-title">{isLv ? 'Jūsu kontaktinformācija' : 'Your Contact Information'}</div>
        <div className="bf-row">
          <div className="bf-field">
            <label>{isLv ? 'Vārds' : 'First Name'} <span className="bf-req">*</span></label>
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder={isLv ? 'Jūsu vārds' : 'Your first name'} required onKeyDown={advanceOn(refLastName)} />
          </div>
          <div className="bf-field">
            <label>{isLv ? 'Uzvārds' : 'Last Name'} <span className="bf-req">*</span></label>
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder={isLv ? 'Jūsu uzvārds' : 'Your last name'} required ref={refLastName} onKeyDown={advanceOn(refEmail)} />
          </div>
        </div>
        <div className="bf-row">
          <div className="bf-field">
            <label>{isLv ? 'E-pasts' : 'Email'} <span className="bf-req">*</span></label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required ref={refEmail} onKeyDown={advanceOn(refPhone)} />
          </div>
          <div className="bf-field">
            <label>{isLv ? 'Tālrunis' : 'Phone'} <span className="bf-req">*</span></label>
            <div className="bf-phone-wrap">
              <CountryCodePicker value={phonePrefix} onChange={setPhonePrefix} />
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="20000000" required ref={refPhone} />
            </div>
          </div>
        </div>
      </div>

      <div className="bf-section">
        <div className="bf-section-title">{isLv ? 'Rezervācijas informācija' : 'Reservation Details'}</div>
        <div className="bf-row">
          <div className="bf-field">
            <label>{isLv ? 'Upe' : 'River'} <span className="bf-req">*</span></label>
            <select value={riverId} onChange={e => handleRiverChange(e.target.value)} required>
              <option value="">{isLv ? '- Izvēlieties upi -' : '- Select river -'}</option>
              {formData.rivers.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
          <div className="bf-field">
            <label>{isLv ? 'Maršruts' : 'Route'} <span className="bf-req">*</span></label>
            <select value={routeId} onChange={e => handleRouteChange(e.target.value)} required disabled={!riverId}>
              <option value="">{riverId ? (isLv ? '- Izvēlieties maršrutu -' : '- Select route -') : (isLv ? '- Vispirms izvēlieties upi -' : '- Select river first -')}</option>
              {filteredRoutes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
        </div>

        {selectedRoute && (
          <div className="bf-field" style={{ marginBottom: 20 }}>
            <label>{isLv ? 'Vēlamais sākuma laiks' : 'Preferred Start Time'}</label>
            <select value={startTime} onChange={e => setStartTime(e.target.value)}>
              {selectedRoute.startTimes.filter(t => t !== 'Cits laiks').map(t => <option key={t} value={t}>{t}</option>)}
              <option value="cits">{isLv ? 'Cits laiks' : 'Other time'}</option>
            </select>
          </div>
        )}

        {selectedRoute && (
          <div className="bf-field" style={{ marginBottom: 20 }}>
            <label>{isLv ? 'Datumi' : 'Dates'} <span className="bf-req">*</span></label>
            <small className="bf-hint">{isLv ? 'Vienas dienas braucienam izvēlieties to pašu sākuma un beigu datumu.' : 'For a one-day trip, select the same start and end date.'}</small>
            <div className="bf-date-row">
              <div className="bf-field">
                <DatePicker value={startDate} onChange={d => { setStartDate(d); if (!endDate || d > endDate) setEndDate(d) }}
                  minDate={minDate} maxDate={maxDate} isDateAllowed={isDateAllowed}
                  placeholder={isLv ? 'Izvēlieties datumu' : 'Select date'} startDate={startDate} endDate={endDate} />
                <small className="bf-hint">{isLv ? 'Sākuma datums' : 'Start date'}</small>
              </div>
              <div className="bf-field">
                <DatePicker value={endDate} onChange={d => setEndDate(d)}
                  minDate={startDate || minDate} maxDate={maxDate} isDateAllowed={isDateAllowed}
                  placeholder={isLv ? 'Izvēlieties datumu' : 'Select date'} startDate={startDate} endDate={endDate} />
                <small className="bf-hint">{isLv ? 'Beigu datums' : 'End date'}</small>
              </div>
            </div>
          </div>
        )}

        {selectedRoute && startDate && endDate && (
          <div className="bf-field">
            <label>{isLv ? 'Laivas' : 'Boats'} <span className="bf-req">*</span></label>
            {availLoading && <small className="bf-hint">{isLv ? 'Pārbauda pieejamību...' : 'Checking availability...'}</small>}
            <div className="bf-boat-grid">
              {availableBoats.map(bt => {
                const qty = boatSelections[bt.id] || 0
                const avail = availability[bt.id]
                const maxQty = avail ? avail.available : 99
                const soldOut = avail ? avail.available === 0 : false
                return (
                  <div key={bt.id} className={`bf-boat-card${qty > 0 ? ' bf-boat-selected' : ''}${soldOut ? ' bf-boat-soldout' : ''}`}>
                    <div className="bf-boat-header">
                      <div className="bf-boat-name">{bt.name}</div>
                      <div className="bf-boat-price">&euro;{bt.price}/{isLv ? 'dienā' : 'day'}</div>
                    </div>
                    <div className="bf-boat-desc">{bt.capacity} {bt.capacity === 1 ? (isLv ? 'vieta' : 'seat') : (isLv ? 'vietas' : 'seats')}</div>
                    {avail && (
                      <div className={`bf-boat-avail${soldOut ? ' bf-boat-avail-none' : ''}`}>
                        {soldOut
                          ? (isLv ? 'Nav pieejams' : 'Not available')
                          : `${avail.available} ${isLv ? 'pieejams' : 'available'}`}
                      </div>
                    )}
                    <div className="bf-stepper">
                      <button type="button" className="bf-stepper-btn" onClick={() => setBoatQty(bt.id, qty - 1)} disabled={qty === 0 || soldOut} aria-label="Decrease">−</button>
                      <input type="number" className={`bf-stepper-count${qty === 0 ? ' bf-stepper-zero' : ''}`}
                        value={qty} min={0} max={maxQty}
                        onFocus={e => e.target.select()}
                        onChange={e => setBoatQty(bt.id, Math.min(maxQty, Math.max(0, parseInt(e.target.value) || 0)))}
                        aria-label="Quantity" disabled={soldOut} />
                      <button type="button" className="bf-stepper-btn" onClick={() => setBoatQty(bt.id, qty + 1)} disabled={qty >= maxQty || soldOut} aria-label="Increase">+</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {selectedRoute && (
        <div className="bf-summary-bar">
          <div className="bf-summary-item">
            <div className="bf-summary-label">{isLv ? 'Cilvēki' : 'Total people'}</div>
            <div className="bf-summary-value">{totalPeople}</div>
          </div>
          <div className="bf-summary-item">
            <div className="bf-summary-label">{isLv ? 'Dienas' : 'Days'}</div>
            <div className="bf-summary-value">{days || '--'}</div>
          </div>
          <div className="bf-summary-item">
            <div className="bf-summary-label">{isLv ? 'Cena' : 'Price'}</div>
            <div className="bf-summary-value">&euro;{boatCost}</div>
          </div>
          <div className="bf-summary-item">
            <div className="bf-summary-label">{isLv ? 'Transports' : 'Transport'}</div>
            <div className="bf-summary-value">&euro;{transportCost}</div>
          </div>
        </div>
      )}
      {selectedRoute && (
        <p className="bf-transport-note">
          {isLv ? '* Transporta izmaksas ir aplēse un var tikt koriģētas pēc rezervācijas atkarībā no grupas lieluma un citiem faktoriem. Galīgā cena tiks apstiprināta e-pastā.'
            : '* Transport cost is an estimate and may be adjusted after your booking request based on group size, fuel costs, and other factors. Final price confirmed by email.'}
        </p>
      )}

      <div className="bf-section">
        <div className="bf-field">
          <label>{isLv ? 'Piezīmes (nav obligāti)' : 'Notes (optional)'}</label>
          <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder={isLv ? 'Īpašas prasības, grupas lielums, u.c.' : 'Special requests, group size, etc.'} />
        </div>
        <div className="bf-field">
          <label>{isLv ? 'Maksājuma veids' : 'Payment Method'} <span className="bf-req">*</span></label>
          <div className="bf-payment-options">
            {([
              { value: 'Online', lv: 'Apmaksāt tiešsaistē', en: 'Pay online' },
              { value: 'Cash',   lv: 'Norēķini laivošanas dienā', en: 'Settle on the day' },
            ] as { value: string; lv: string; en: string }[]).map(opt => (
              <label key={opt.value} className={`bf-payment-option${paymentMethod === opt.value ? ' bf-payment-selected' : ''}`}>
                <input type="radio" name="paymentMethod" value={opt.value} checked={paymentMethod === opt.value} onChange={() => setPaymentMethod(opt.value)} />
                <span>{isLv ? opt.lv : opt.en}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="bf-info-box">
          <p className="bf-info-box-title">{isLv ? 'Kā notiek rezervācija?' : 'How does booking work?'}</p>
          <p className="bf-info-box-text">{isLv
            ? 'Pēc pieteikuma iesniegšanas mēs to izskatīsim un sazināsimies ar jums tuvākajā laikā. Jūs saņemsiet e-pasta apstiprinājumu ar maksājuma norādījumiem vai zvanu no mums, lai vienotos par detaļām.'
            : 'After submitting your request, we\'ll review it and get back to you shortly. You\'ll receive an email confirmation with payment details or a call from us to confirm.'}</p>
        </div>
      </div>

      <div className="bf-waiver">
        <p className="bf-waiver-title">{isLv ? 'Pirms rezervācijas - lūdzu izlasiet' : 'Before you book - please read'}</p>
        <ul className="bf-waiver-list">
          {(isLv ? [
            'Glābšanas vestes jāvalkā visu laiku uz ūdens - bez izņēmumiem',
            'Alkohols un narkotikas ir stingri aizliegtas pirms un brauciena laikā',
            'Jūs esat finansiāli atbildīgi par pazaudētu vai bojātu aprīkojumu',
            'Braucieni ir pašvadīti - SIA Mučas darbinieki nebūs kopā ar jums uz ūdens',
            'Rezervējot jūs atzīstat raksturīgos riskus, tostarp apgāšanos, aukstu ūdeni un traumu',
          ] : [
            'Life jackets must be worn at all times on the water - no exceptions',
            'Alcohol and drugs are strictly prohibited before and during the trip',
            'You are financially responsible for lost or damaged equipment',
            'Trips are self-guided - no SIA Mučas staff will be on the water with you',
            'By booking you acknowledge inherent risks including capsizing, cold water, and injury',
          ]).map((rule, i) => <li key={i}>{rule}</li>)}
        </ul>
        <label className="bf-waiver-label">
          <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="bf-waiver-check" />
          <span>
            {isLv ? 'Esmu izlasījis un piekrītu ' : 'I have read and agree to the '}
            <a href={isLv ? '/drosibas-apliecinajums' : '/en/waiver'} target="_blank" rel="noopener noreferrer" className="bf-waiver-link">{isLv ? 'Drošības apliecinājumam' : 'Safety Waiver'}</a>
            {' & '}
            <a href={isLv ? '/noteikumi' : '/en/terms'} target="_blank" rel="noopener noreferrer" className="bf-waiver-link">{isLv ? 'Pakalpojumu noteikumiem' : 'Terms of Service'}</a>.
          </span>
        </label>
      </div>

      <button type="submit" className="bf-submit-btn"
        disabled={submitting || !agreed || !routeId || !startDate || !endDate || !hasBoats || !firstName || !lastName || !email || !phone}>
        {submitting ? (isLv ? 'Sūta...' : 'Sending...') : (isLv ? 'Iesniegt rezervāciju' : 'Submit Booking')}
      </button>
      <p className="bf-footer-note">
        {isLv ? 'Mēs izskatīsim jūsu rezervāciju un nosūtīsim apstiprinājumu ar maksājuma informāciju uz jūsu e-pastu.'
          : "We'll review your booking and send confirmation with payment details to your email."}
      </p>
    </form>
  )
}
