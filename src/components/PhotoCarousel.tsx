'use client'

import { useState } from 'react'

interface Props {
  images: string[]
  alt: string
  placeholder?: string
}

const VISIBLE = 3 // photos shown at once on desktop

export default function PhotoCarousel({ images, alt, placeholder = '/images/photo-placeholder.svg' }: Props) {
  const base = images.length > 0 ? images : [placeholder, placeholder, placeholder]
  // Duplicate enough times so looping always has items to show
  const srcs = base.length < VISIBLE * 2 ? [...base, ...base, ...base] : [...base, ...base]
  const total = base.length
  const [start, setStart] = useState(0)

  const prev = () => setStart(i => (i - 1 + total) % total)
  const next = () => setStart(i => (i + 1) % total)

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

      <button className="carousel-btn carousel-prev" onClick={prev} aria-label="Previous">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button className="carousel-btn carousel-next" onClick={next} aria-label="Next">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  )
}
