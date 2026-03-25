import { getRoutes, getRivers } from '@/lib/airtable'
import { BLOG_POSTS } from '@/content/blog/posts'
import type { MetadataRoute } from 'next'

const BASE = 'https://mucas-site.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = await getRoutes()
  const rivers = await getRivers()

  const staticPages = [
    { url: BASE, lastModified: new Date(), priority: 1.0 },
    { url: `${BASE}/rivers`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE}/fleet`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE}/booking`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE}/contact`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE}/about`, lastModified: new Date(), priority: 0.6 },
    { url: `${BASE}/blog`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE}/gallery`, lastModified: new Date(), priority: 0.7 },
  ]

  const riverPages = rivers.map(r => ({
    url: `${BASE}/rivers/${r.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }))

  const routePages = routes.map(r => ({
    url: `${BASE}/routes/${r.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }))

  const blogPages = BLOG_POSTS.map(p => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    priority: 0.6,
  }))

  return [...staticPages, ...riverPages, ...routePages, ...blogPages]
}
