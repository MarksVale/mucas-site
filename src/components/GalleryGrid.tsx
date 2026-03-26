'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CLD_FALLBACK_URL } from '@/lib/cloudinary'

interface GalleryImage {
  src: string
  alt: string
  river: string
  link: string
}

export default function GalleryGrid({ images, riverNames }: { images: GalleryImage[]; riverNames: string[] }) {
  const [filter, setFilter] = useState<string>('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const visible = images
    .filter(img => filter === 'All' || img.river === filter)

  const lightboxPrev = () => setLightbox(i => i !== null ? (i - 1 + visible.length) % visible.length : null)
  const lightboxNext = () => setLightbox(i => i !== null ? (i + 1) % visible.length : null)

  return (
    <>
      {/* Filter tabs */}
      <div className="gal-filters">
        <button
          className={`gal-tab${filter === 'All' ? ' active' : ''}`}
          onClick={() => setFilter('All')}
        >
          All
        </button>
        {riverNames.map(name => (
          <button
            key={name}
            className={`gal-tab${filter === name ? ' active' : ''}`}
            onClick={() => setFilter(name)}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="gal-masonry">
        {images.map((img, i) => {
          if (filter !== 'All' && img.river !== filter) return null
          const visibleIdx = visible.findIndex(v => v.src === img.src)
          return (
            <div className="gal-item" key={img.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                onClick={() => setLightbox(visibleIdx)}
                onError={(e) => {
                  const el = e.currentTarget
                  if (el.src !== CLD_FALLBACK_URL) el.src = CLD_FALLBACK_URL
                }}
              />
              <div className="gal-overlay">
                <span className="gal-river">{img.river}</span>
                <Link href={img.link} className="gal-link" onClick={e => e.stopPropagation()}>
                  View route →
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {visible.length === 0 && (
        <div className="gal-empty">
          <p>Photos coming soon — we&apos;re uploading images from our latest trips.</p>
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && visible[lightbox] && (
        <div className="gal-lightbox" onClick={() => setLightbox(null)}>
          <button className="gal-lb-close" onClick={() => setLightbox(null)}>&times;</button>
          <button className="gal-lb-prev" onClick={e => { e.stopPropagation(); lightboxPrev() }}>&lsaquo;</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={visible[lightbox].src.replace('w_800,h_560', 'w_1400,h_900')}
            alt={visible[lightbox].alt}
            onClick={e => e.stopPropagation()}
            onError={(e) => {
              const el = e.currentTarget
              if (el.src !== CLD_FALLBACK_URL) el.src = CLD_FALLBACK_URL
            }}
          />
          <button className="gal-lb-next" onClick={e => { e.stopPropagation(); lightboxNext() }}>&rsaquo;</button>
          <div className="gal-lb-caption">
            {visible[lightbox].alt} — {visible[lightbox].river}
          </div>
        </div>
      )}
    </>
  )
}
