'use client'

import { CLD_FALLBACK_URL } from '@/lib/cloudinary'

interface Props {
  src: string
  fallback: string
  alt: string
  className?: string
}

export default function BoatPhoto({ src, fallback, alt, className }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        const img = e.currentTarget
        if (img.src !== fallback) { img.src = fallback }
        else if (img.src !== CLD_FALLBACK_URL) { img.src = CLD_FALLBACK_URL }
      }}
    />
  )
}
