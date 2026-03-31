'use client'
import { useState, useEffect } from 'react'

export function HeroCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className="hero-photo-bg"
          style={{ opacity: i === current ? 1 : 0, transition: 'opacity 1s ease' }}
        />
      ))}
    </>
  )
}
