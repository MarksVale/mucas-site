'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { cldBoat, CLD_BOAT_FALLBACK, BOAT_SPECS } from '@/lib/cloudinary'
import { BoatIcon } from '@/components/Icons'

interface Boat {
  slug: string
  name: string
  category: string
  seats: number
  cloudinaryId: string
}

interface Props {
  boats: Boat[]
  labels: {
    filterType: string
    filterSeats: string
    all: string
    seat: string
    seats: string
    specLength: string
    specWidth: string
    specCapacity: string
    specSeats: string
    specWeight: string
    noResults: string
    seatsLabel: (n: number) => string
  }
}

function seatCount(seats: string): number {
  if (seats.includes('+')) return seats.split('+').map(Number).reduce((a, b) => a + b, 0)
  return parseInt(seats, 10)
}

const TYPE_ORDER = ['Kayak', 'Canoe', 'Raft', 'SUP']

export default function FleetBrowser({ boats, labels }: Props) {
  const [activeType, setActiveType] = useState<string | null>(null)
  const [activeSeats, setActiveSeats] = useState<number | null>(null)

  // Derive available filter options from real data
  const availableTypes = useMemo(() => {
    const types = new Set<string>()
    boats.forEach(b => {
      const s = BOAT_SPECS[b.name]
      if (s) types.add(s.type)
    })
    return TYPE_ORDER.filter(t => types.has(t))
  }, [boats])

  const availableSeats = useMemo(() => {
    const counts = new Set<number>()
    boats.forEach(b => {
      const s = BOAT_SPECS[b.name]
      if (s) counts.add(seatCount(s.seats))
    })
    return Array.from(counts).sort((a, b) => a - b)
  }, [boats])

  const filtered = useMemo(() => {
    return boats.filter(b => {
      const s = BOAT_SPECS[b.name]
      if (!s) return true
      if (activeType && s.type !== activeType) return false
      if (activeSeats !== null && seatCount(s.seats) !== activeSeats) return false
      return true
    })
  }, [boats, activeType, activeSeats])

  return (
    <div className="fleet-layout">
      {/* ── Sidebar filters ── */}
      <aside className="fleet-sidebar">
        <div className="fleet-filter-group">
          <div className="fleet-filter-label">{labels.filterType}</div>
          <button
            className={`fleet-filter-btn${activeType === null ? ' active' : ''}`}
            onClick={() => setActiveType(null)}
          >
            {labels.all}
          </button>
          {availableTypes.map(type => (
            <button
              key={type}
              className={`fleet-filter-btn${activeType === type ? ' active' : ''}`}
              onClick={() => setActiveType(activeType === type ? null : type)}
            >
              <BoatIcon category={type} size={15} />
              {type}
            </button>
          ))}
        </div>

        <div className="fleet-filter-group">
          <div className="fleet-filter-label">{labels.filterSeats}</div>
          <button
            className={`fleet-filter-btn${activeSeats === null ? ' active' : ''}`}
            onClick={() => setActiveSeats(null)}
          >
            {labels.all}
          </button>
          {availableSeats.map(n => (
            <button
              key={n}
              className={`fleet-filter-btn${activeSeats === n ? ' active' : ''}`}
              onClick={() => setActiveSeats(activeSeats === n ? null : n)}
            >
              {n} {n === 1 ? labels.seat : labels.seats}
            </button>
          ))}
        </div>
      </aside>

      {/* ── Card grid ── */}
      <div className="fleet-grid-wrap">
        {filtered.length === 0 ? (
          <p className="fleet-no-results">{labels.noResults}</p>
        ) : (
          <div className="fleet-card-grid">
            {filtered.map(boat => {
              const specs = BOAT_SPECS[boat.name]
              return (
                <div className="fleet-card" key={boat.slug}>
                  <div className="fleet-card-photo">
                    <Image
                      src={cldBoat(boat.cloudinaryId)}
                      alt={boat.name}
                      width={640}
                      height={420}
                      onError={e => { (e.currentTarget as HTMLImageElement).src = CLD_BOAT_FALLBACK }}
                      unoptimized
                    />
                  </div>
                  <div className="fleet-card-body">
                    <div className="fleet-card-top">
                      <span className="fleet-card-badge">{specs?.type ?? boat.category}</span>
                      <div className="fleet-card-icon">
                        <BoatIcon category={specs?.type ?? boat.category} size={18} />
                      </div>
                    </div>
                    <h3 className="fleet-card-name">{boat.name}</h3>
                    {specs && (
                      <dl className="fleet-card-specs">
                        <div className="fleet-spec">
                          <dt>{labels.specSeats}</dt>
                          <dd>{specs.seats}</dd>
                        </div>
                        <div className="fleet-spec">
                          <dt>{labels.specLength}</dt>
                          <dd>{specs.lengthCm} cm</dd>
                        </div>
                        <div className="fleet-spec">
                          <dt>{labels.specWidth}</dt>
                          <dd>{specs.widthCm} cm</dd>
                        </div>
                        <div className="fleet-spec">
                          <dt>{labels.specWeight}</dt>
                          <dd>{specs.weightKg} kg</dd>
                        </div>
                        {specs.capacityKg != null && (
                          <div className="fleet-spec">
                            <dt>{labels.specCapacity}</dt>
                            <dd>{specs.capacityKg} kg</dd>
                          </div>
                        )}
                      </dl>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
