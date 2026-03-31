'use client'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from '@/i18n/navigation'
import { useLocale } from 'next-intl'

interface River { id: string; name: string }
interface Route { id: string; name: string; riverId: string }
interface BookingWindow { riverId: string; seasonOpen: string; seasonClose: string; type: string }
interface FormData { rivers: River[]; routes: Route[]; bookingWindows: BookingWindow[] }

function slugify(s: string) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function todayIso() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

export function HeroBookingWidget() {
  const router = useRouter()
  const locale = useLocale()
  const isLv = locale !== 'en'

  const [data, setData] = useState<FormData | null>(null)
  const [riverId, setRiverId] = useState('')
  const [routeId, setRouteId] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    fetch('/api/get-form-data')
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => {})
  }, [])

  const filteredRoutes = useMemo(() =>
    data && riverId ? data.routes.filter(r => r.riverId === riverId) : [],
    [data, riverId]
  )

  const minDate = useMemo(() => {
    if (!data || !riverId) return todayIso()
    const windows = data.bookingWindows.filter(w => w.riverId === riverId && w.type === 'Open')
    if (!windows.length) return todayIso()
    const today = todayIso()
    const earliest = windows.reduce((min, w) => w.seasonOpen < min ? w.seasonOpen : min, windows[0].seasonOpen)
    return earliest > today ? earliest : today
  }, [data, riverId])

  const maxDate = useMemo(() => {
    if (!data || !riverId) return ''
    const windows = data.bookingWindows.filter(w => w.riverId === riverId && w.type === 'Open')
    if (!windows.length) return ''
    return windows.reduce((max, w) => w.seasonClose > max ? w.seasonClose : max, windows[0].seasonClose)
  }, [data, riverId])

  function handleRiverChange(id: string) {
    setRiverId(id)
    setRouteId('')
    setDate('')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (riverId && data) {
      const river = data.rivers.find(r => r.id === riverId)
      if (river) params.set('river', slugify(river.name))
    }
    if (routeId && data) {
      const route = data.routes.find(r => r.id === routeId)
      if (route) params.set('route', slugify(route.name))
    }
    if (date) params.set('date', date)
    router.push(`/booking?${params.toString()}` as any)
  }

  const t = {
    title:       isLv ? 'Rezervē Braucienu'          : 'Book Your Trip',
    sub:         isLv ? 'Izvēlies upi, maršrutu un datumu' : 'Pick a river, route and date',
    river:       isLv ? 'Upe'                          : 'River',
    riverPh:     isLv ? 'Izvēlies upi...'              : 'Select river...',
    route:       isLv ? 'Maršruts'                     : 'Route',
    routePh:     isLv ? 'Izvēlies maršrutu...'         : 'Select route...',
    routeFirst:  isLv ? 'Vispirms izvēlies upi'        : 'Select a river first',
    date:        isLv ? 'Datums'                       : 'Date',
    cta:         isLv ? 'Skatīt Pieejamību →'          : 'Check Availability →',
    trust1:      isLv ? 'Bezmaksas atcelšana'          : 'Free cancellation',
    trust2:      isLv ? 'Tūlītējs apstiprinājums'      : 'Instant confirmation',
  }

  return (
    <form className="hw-widget" onSubmit={handleSubmit}>
      <div className="hw-title">{t.title}</div>
      <div className="hw-sub">{t.sub}</div>

      <div className="hw-field">
        <label className="hw-label">{t.river}</label>
        <select className="hw-select" value={riverId} onChange={e => handleRiverChange(e.target.value)} required>
          <option value="">{data ? t.riverPh : '...'}</option>
          {data?.rivers.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
      </div>

      <div className="hw-field">
        <label className="hw-label">{t.route}</label>
        <select className="hw-select" value={routeId} onChange={e => setRouteId(e.target.value)} disabled={!riverId}>
          <option value="">{riverId ? t.routePh : t.routeFirst}</option>
          {filteredRoutes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
      </div>

      <div className="hw-field">
        <label className="hw-label">{t.date}</label>
        <input
          className="hw-input"
          type="date"
          value={date}
          min={minDate}
          max={maxDate || undefined}
          onChange={e => setDate(e.target.value)}
          disabled={!riverId}
        />
      </div>

      <button className="hw-btn" type="submit" disabled={!riverId}>
        {t.cta}
      </button>

      <div className="hw-trust">
        <span>✓ {t.trust1}</span>
        <span>✓ {t.trust2}</span>
      </div>
    </form>
  )
}
