'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { cldBoat, cldBoatFull, CLD_BOAT_FALLBACK, BOAT_SPECS } from '@/lib/cloudinary'
import { BoatIcon } from '@/components/Icons'

interface Boat {
  slug: string
  name: string
  category: string
  seats: number
}

interface Props {
  boat: Boat
  seatLabel: string
  seatsLabel: string
}

export default function BoatCardWithModal({ boat, seatLabel, seatsLabel }: Props) {
  const [open, setOpen] = useState(false)
  const specs = BOAT_SPECS[boat.name]

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close])

  return (
    <>
      {/* Card — clickable */}
      <div
        className="boat-card boat-card-clickable"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setOpen(true) }}
        aria-label={`View details for ${boat.name}`}
      >
        <div className="bc-photo">
          <Image
            src={cldBoat(boat.name)}
            alt={boat.name}
            width={640}
            height={420}
            onError={e => { (e.currentTarget as HTMLImageElement).src = CLD_BOAT_FALLBACK }}
            unoptimized
          />
        </div>
        <div className="bc-body">
          <div className="bc-icon-wrap">
            <BoatIcon category={boat.category} size={20} />
          </div>
          <h3>{boat.name}</h3>
          <div className="bc-meta">{boat.seats} {boat.seats === 1 ? seatLabel : seatsLabel}</div>
          <div className="bc-hint">Tap to see details</div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="bm-overlay" onClick={close} role="dialog" aria-modal="true" aria-label={boat.name}>
          <div className="bm-panel" onClick={e => e.stopPropagation()}>
            <button className="bm-close" onClick={close} aria-label="Close">✕</button>

            <div className="bm-image">
              <Image
                src={cldBoatFull(boat.name)}
                alt={boat.name}
                width={1200}
                height={800}
                onError={e => { (e.currentTarget as HTMLImageElement).src = CLD_BOAT_FALLBACK }}
                unoptimized
                priority
              />
            </div>

            <div className="bm-content">
              <div className="bm-header">
                <span className="bm-badge">{boat.category}</span>
                <h2 className="bm-title">{boat.name}</h2>
              </div>

              {specs && (
                <div className="bm-specs">
                  <div className="bm-spec">
                    <span className="bm-spec-label">Length</span>
                    <span className="bm-spec-value">{specs.lengthCm} cm</span>
                  </div>
                  <div className="bm-spec">
                    <span className="bm-spec-label">Width</span>
                    <span className="bm-spec-value">{specs.widthCm} cm</span>
                  </div>
                  <div className="bm-spec">
                    <span className="bm-spec-label">Capacity</span>
                    <span className="bm-spec-value">{specs.capacityKg != null ? `${specs.capacityKg} kg` : '—'}</span>
                  </div>
                  <div className="bm-spec">
                    <span className="bm-spec-label">Seats</span>
                    <span className="bm-spec-value">{specs.seats}</span>
                  </div>
                  <div className="bm-spec">
                    <span className="bm-spec-label">Weight</span>
                    <span className="bm-spec-value">{specs.weightKg} kg</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
