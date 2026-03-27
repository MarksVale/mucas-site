import { getRoutes, getRivers } from '@/lib/airtable'
import { BLOG_POSTS } from '@/content/blog/posts'
import type { MetadataRoute } from 'next'

const BASE = 'https://mucas-site.vercel.app'

function entry(path: string, priority: number, lastMod?: Date): MetadataRoute.Sitemap[number] {
  const p = path === '/' ? '' : path
  return {
    url: `${BASE}${p}`,
    lastModified: lastMod ?? new Date(),
    priority,
    alternates: {
      languages: {
        lv: `${BASE}${p}`,
        en: `${BASE}/en${p}`,
      },
    },
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [routes, rivers] = await Promise.all([getRoutes(), getRivers()])

  const staticPages: MetadataRoute.Sitemap = [
    entry('/', 1.0),
    entry('/rivers', 0.9),
    entry('/booking', 0.9),
    entry('/fleet', 0.8),
    entry('/blog', 0.8),
    entry('/contact', 0.7),
    entry('/about', 0.6),
  ]

  const riverPages = rivers.map(r => entry(`/rivers/${r.slug}`, 0.8))
  const routePages = routes.map(r => entry(`/routes/${r.slug}`, 0.7))
  const blogPages = BLOG_POSTS.map(p => entry(`/blog/${p.slug}`, 0.6, new Date(p.date)))

  return [...staticPages, ...riverPages, ...routePages, ...blogPages]
}
