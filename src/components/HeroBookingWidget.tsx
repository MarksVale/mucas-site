'use client'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import { DatePicker } from './SharedDatePicker'

interface River { id: string; name: string }
interface Route { id: string; name: string; riverId: string; boatTypeIds: string[] }
interface BoatType { id: string; name: string }
interface BookingWindow { riverId: string; seasonOpen: string; seasonClose: string; type: string }
interface FormData { rivers: River[]; routes: Route[]; boatTypes: BoatType[]; bookingWindows: BookingWindow[] }

function slugify(s: string) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function todayIso() {
  const d = new Date()
  const pad = (n: number) => n < 10 ? '0' + n : '' + n
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`
}

export function HeroBookingWidget() {
  const router = useRouter()
  const locale = useLocale()
  const isLv = locale !== 'en'

  const [data, setData] = useState<FormData | null>(null)
  const [riverId, setRiverId] = useState('')
  const [routeId, setRouteId] = useState('')
  const [boatTypeId, setBoatTypeId] = useState('')
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

  const selectedRoute = useMemo(() =>
    data && routeId ? data.routes.find(r => r.id === routeId) : null,
    [data, routeId]
  )

  const filteredBoats = useMemo(() => {
    if (!data || !selectedRoute) return []
    return data.boatTypes.filter(b => selectedRoute.boatTypeIds.includes(b.id))
  }, [data, selectedRoute])

  const activeWindows = useMemo(() => {
    if (!data || !riverId) return []
    return data.bookingWindows.filter(w => w.riverId === riverId && w.type === 'Open')
  }, [data, riverId])

  const minDate = useMemo(() => {
    if (!activeWindows.length) return todayIso()
    const today = todayIso()
    const earliest = activeWindows.reduce((min, w) => w.seasonOpen < min ? w.seasonOpen : min, activeWindows[0].seasonOpen)
    return earliest > today ? earliest : today
  }, [activeWindows])

  const maxDate = useMemo(() => {
    if (!activeWindows.length) return ''
    return activeWindows.reduce((max, w) => w.seasonClose > max ? w.seasonClose : max, activeWindows[0].seasonClose)
  }, [activeWindows])

  const isDateAllowed = useCallback((d: string) =>
    activeWindows.some(w => d >= w.seasonOpen && d <= w.seasonClose),
    [activeWindows]
  )

  function handleRiverChange(id: string) {
    setRiverId(id)
    setRouteId('')
    setBoatTypeId('')
    setDate('')
  }

  function handleRouteChange(id: string) {
    setRouteId(id)
    setBoatTypeId('')
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
    title:      isLv ? 'Rezervē Braucienu'                : 'Book Your Trip',
    sub:        isLv ? 'Izvēlies upi, maršrutu un datumu' : 'Pick a river, route and date',
    river:      isLv ? 'Upe'                              : 'River',
    riverPh:    isLv ? 'Izvēlies upi...'                  : 'Select river...',
    route:      isLv ? 'Maršruts'                         : 'Route',
    routePh:    isLv ? 'Izvēlies maršrutu...'             : 'Select route...',
    routeFirst: isLv ? 'Vispirms izvēlies upi'            : 'Select a river first',
    boat:       isLv ? 'Laiva'                            : 'Boat',
    boatPh:     isLv ? 'Izvēlies laivu...'                : 'Select boat...',
    boatFirst:  isLv ? 'Vispirms izvēlies maršrutu'       : 'Select a route first',
    date:       isLv ? 'Datums'                           : 'Date',
    datePh:     isLv ? 'Izvēlies datumu...'               : 'Pick a date...',
    cta:        isLv ? 'Skatīt Pieejamību \u2192'         : 'Check Availability \u2192',
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
        <select className="hw-select" value={routeId} onChange={e => handleRouteChange(e.target.value)} disabled={!riverId}>
          <option value="">{riverId ? t.routePh : t.routeFirst}</option>
          {filteredRoutes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
      </div>

      <div className="hw-field">
        <label className="hw-label">{t.boat}</label>
        <select className="hw-select" value={boatTypeId} onChange={e => setBoatTypeId(e.target.value)} disabled={!routeId}>
          <option value="">{routeId ? t.boatPh : t.boatFirst}</option>
          {filteredBoats.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
      </div>

      <div className="hw-field">
        <label className="hw-label">{t.date}</label>
        <DatePicker
          value={date}
          onChange={setDate}
          minDate={minDate}
          maxDate={maxDate}
          isDateAllowed={isDateAllowed}
          placeholder={t.datePh}
          disabled={!riverId}
        />
      </div>

      <button className="hw-btn" type="submit" disabled={!riverId}>
        {t.cta}
      </button>
    </form>
  )
}
