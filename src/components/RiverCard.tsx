import Link from 'next/link'
import type { UnifiedRiver } from '@/lib/all-rivers'
import { cldCard } from '@/lib/cloudinary'

export function RiverCard({ slug, name, gradient, routeCount, description, region, bookable, galleryCount }: UnifiedRiver) {
  const desc = description && description.length > 120
    ? description.slice(0, 120).trimEnd() + '…'
    : description
  const hasPhoto = (galleryCount ?? 0) > 0
  return (
    <Link href={`/rivers/${slug}`} className="river-card">
      <div
        className={`rc-img ${gradient || 'gradient-gauja'}`}
        style={hasPhoto ? { backgroundImage: `url(${cldCard(slug)})` } : undefined}
      >
        <div className="overlay" />
        <div className="rc-title-row">
          <h3>{name}</h3>
          <span className="rc-badge">{routeCount} routes</span>
        </div>
      </div>
      <div className="rc-body">
        <p>{desc}</p>
        <div className="rc-meta">
          <span>{region}</span>
          <span style={{ marginLeft: 'auto' }}>{bookable ? 'Book Online' : 'Call to Book'}</span>
        </div>
      </div>
    </Link>
  )
}
