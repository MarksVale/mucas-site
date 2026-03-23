'use client'

import { useState } from 'react'

interface Props {
  images: string[]       // array of Cloudinary URLs
  alt: string            // base alt text — numbered automatically
  placeholder?: string   // fallback image URL
}

export default function PhotoCarousel({ images, alt, placeholder = '/images/photo-placeholder.svg' }: Props) {
  const [active, setActive] = useState(0)
  const srcs = images.length > 0 ? images : [placeholder]
  const total = srcs.length

  const prev = () => setActive(i => (i - 1 + total) % total)
  const next = () => setActive(i => (i + 1) % total)

  return (
    <div className="carousel">
      <div className="carousel-track" style={{ transform: `translateX(-${active * 100}%)` }}>
        {srcs.map((src, i) => (
          <div className="carousel-slide" key={i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={total > 1 ? `${alt} ${i + 1}` : alt}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <button className="carousel-btn carousel-prev" onClick={prev} aria-label="Previous photo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button className="carousel-btn carousel-next" onClick={next} aria-label="Next photo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
          <div className="carousel-dots">
            {srcs.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot${i === active ? ' active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>
          <div className="carousel-count">{active + 1} / {total}</div>
        </>
      )}
    </div>
  )
}
