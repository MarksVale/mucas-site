import { getRoutes, getRivers } from '@/lib/airtable'
import { BLOG_POSTS } from '@/content/blog/posts'
import type { MetadataRoute } from 'next'

const BASE = 'https://mucas-site.vercel.app'

// lv is the default locale (no prefix), en uses /en prefix
// pathnames are localized: /upes (lv) vs /rivers (en)
function entry(
  lvPath: string,
  enPath: string,
  priority: number,
  lastMod?: Date,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE}${lvPath}`,
    lastModified: lastMod ?? new Date(),
    priority,
    alternates: {
      languages: {
        'x-default': `${BASE}${lvPath}`,
        lv: `${BASE}${lvPath}`,
        en: `${BASE}/en${enPath}`,
      },
    },
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [routes, rivers] = await Promise.all([getRoutes(), getRivers()])

  const staticPages: MetadataRoute.Sitemap = [
    entry('/',                     '/',         1.0),
    entry('/upes',                 '/rivers',   0.9),
    entry('/rezervet',             '/booking',  0.9),
    entry('/flote',                '/fleet',    0.8),
    entry('/blogs',                '/blog',     0.8),
    entry('/kontakti',             '/contact',  0.7),
    entry('/par-mums',             '/about',    0.6),
    entry('/privatuma-politika',   '/privacy',  0.4),
    entry('/noteikumi',            '/terms',    0.4),
  ]

  const riverPages = rivers.map(r =>
    entry(`/upes/${r.slug}`, `/rivers/${r.slug}`, 0.8),
  )

  const routePages = routes.map(r =>
    entry(`/marsruti/${r.slug}`, `/routes/${r.slug}`, 0.7),
  )

  const blogPages = BLOG_POSTS.map(p =>
    entry(`/blogs/${p.slug}`, `/blog/${p.slug}`, 0.6, new Date(p.date)),
  )

  return [...staticPages, ...riverPages, ...routePages, ...blogPages]
}
