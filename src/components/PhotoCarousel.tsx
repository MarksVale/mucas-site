'use client'

import { useState } from 'react'

interface Props {
  images: string[]
  alt: string
  placeholder?: string
}

const VISIBLE = 3 // photos shown at once on desktop

export default function PhotoCarousel({ images, alt, placeholder = '/images/photo-placeholder.svg' }: Props) {
  const srcs = images.length > 0 ? images : [placeholder, placeholder, placeholder]
  const total = srcs.length
  const maxStart = Math.max(0, total - VISIBLE)
  const [start, setStart] = useState(0)

  const prev = () => setStart(i => Math.max(0, i - 1))
  const next = () => setStart(i => Math.min(maxStart, i + 1))

  return (
    <div className="carousel-strip-wrap">
      <div className="carousel-strip" style={{ transform: `translateX(-${start * (100 / VISIBLE)}%)` }}>
        {srcs.map((src, i) => (
          <div className="carousel-strip-item" key={i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`${alt} ${i + 1}`} loading={i < VISIBLE ? 'eager' : 'lazy'} />
          </div>
        ))}
      </div>

      {total > VISIBLE && (
        <>
          <button className="carousel-btn carousel-prev" onClick={prev} disabled={start === 0} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button className="carousel-btn carousel-next" onClick={next} disabled={start === maxStart} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </>
      )}
    </div>
  )
}
