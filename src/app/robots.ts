import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/waiver', '/drosibas-apliecinajums'],
      },
    ],
    sitemap: 'https://mucas-site.vercel.app/sitemap.xml',
  }
}
