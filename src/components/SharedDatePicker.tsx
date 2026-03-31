'use client'
import { useState, useEffect, useRef } from 'react'

export const DOW = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']
export function pad(n: number) { return n < 10 ? '0' + n : '' + n }
export function fmtDisplay(iso: string) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}

export function Calendar({ value, onChange, minDate, maxDate, isDateAllowed, startDate, endDate }: {
  value: string; onChange: (iso: string) => void; minDate: string; maxDate: string
  isDateAllowed: (d: string) => boolean; startDate?: string; endDate?: string
}) {
  const today = new Date()
  const initMonth = value ? new Date(value + 'T00:00:00') : new Date(minDate ? minDate + 'T00:00:00' : Date.now())
  const [viewYear, setViewYear] = useState(initMonth.getFullYear())
  const [viewMonth, setViewMonth] = useState(initMonth.getMonth())

  const prevMonth = () => { if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) } else setViewMonth(m => m - 1) }
  const nextMonth = () => { if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) } else setViewMonth(m => m + 1) }
  const monthName = new Date(viewYear, viewMonth).toLocaleString('en', { month: 'long', year: 'numeric' })
  const startDow = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const todayIso = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`

  const cells: { day: number; iso: string; disabled: boolean; blocked: boolean }[] = []
  for (let i = 0; i < startDow; i++) cells.push({ day: 0, iso: '', disabled: true, blocked: false })
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${viewYear}-${pad(viewMonth + 1)}-${pad(d)}`
    cells.push({ day: d, iso, disabled: !!(minDate && iso < minDate) || !!(maxDate && iso > maxDate), blocked: !isDateAllowed(iso) })
  }

  function dayClass(cell: typeof cells[0]) {
    if (cell.day === 0) return 'cal-day empty'
    const cls = ['cal-day']
    if (cell.disabled) cls.push('disabled')
    else if (cell.blocked) cls.push('blocked')
    if (cell.iso === todayIso) cls.push('today')
    if (cell.iso === value) cls.push('selected')
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
          <div key={i} className={dayClass(cell)} onClick={() => { if (cell.day && !cell.disabled && !cell.blocked) onChange(cell.iso) }}>
            {cell.day || ''}
          </div>
        ))}
      </div>
      <div className="cal-legend">
        <div className="cal-legend-item"><div className="cal-legend-dot" style={{ background: 'var(--primary)' }} /> Available</div>
        <div className="cal-legend-item"><div className="cal-legend-dot" style={{ background: 'var(--border)' }} /> Unavailable</div>
      </div>
    </div>
  )
}

export function DatePicker({ value, onChange, minDate, maxDate, isDateAllowed, placeholder, startDate, endDate, disabled }: {
  value: string; onChange: (iso: string) => void; minDate: string; maxDate: string
  isDateAllowed: (d: string) => boolean; placeholder: string; startDate?: string; endDate?: string; disabled?: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  return (
    <div className="datepicker-wrap" ref={ref}>
      <button type="button" className={`datepicker-btn${disabled ? ' datepicker-disabled' : ''}`}
        onClick={() => { if (!disabled) setOpen(o => !o) }} disabled={disabled}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M1 6h14" stroke="currentColor" strokeWidth="1.5"/><path d="M5 1v2M11 1v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        <span className={value ? '' : 'placeholder'}>{value ? fmtDisplay(value) : placeholder}</span>
      </button>
      {open && (
        <Calendar value={value} onChange={d => { onChange(d); setOpen(false) }}
          minDate={minDate} maxDate={maxDate} isDateAllowed={isDateAllowed}
          startDate={startDate} endDate={endDate} />
      )}
    </div>
  )
}
