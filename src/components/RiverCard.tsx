import { Link } from '@/i18n/navigation'
import type { UnifiedRiver } from '@/lib/all-rivers'
import { cldCard } from '@/lib/cloudinary'
import { getTranslations } from 'next-intl/server'

export async function RiverCard({ slug, name, gradient, routeCount, description, region, bookable }: UnifiedRiver) {
  const t = await getTranslations('rivers')
  const desc = description && description.length > 120
    ? description.slice(0, 120).trimEnd() + '…'
    : description
  return (
    <div className="river-card">
      <Link href={{ pathname: '/rivers/[slug]', params: { slug } }} className="rc-img-link">
        <div
          className={`rc-img ${gradient || 'gradient-gauja'}`}
          style={{ backgroundImage: `url(${cldCard(slug)})` }}
        >
          <div className="overlay" />
          <div className="rc-title-row">
            <h3>{name}</h3>
            <span className="rc-badge">{routeCount} {t('routesLabel')}</span>
          </div>
        </div>
      </Link>
      <div className="rc-body">
        <p>{desc}</p>
        <div className="rc-meta">
          <span>{region}</span>
        </div>
        <Link href="/contact" className="rc-book-btn">
          {bookable ? t('bookOnlineTitle') : t('callToBookTitle')}
        </Link>
      </div>
    </div>
  )
}
