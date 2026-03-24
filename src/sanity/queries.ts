import { sanityClient } from './client'

// ---- Blog Posts ----
export async function getSanityBlogPosts() {
  if (!sanityClient) return null
  try {
    return await sanityClient.fetch(`
      *[_type == "blogPost"] | order(date desc) {
        title,
        "slug": slug.current,
        category,
        excerpt,
        heroEmoji,
        heroImage,
        date,
        readTime,
        body
      }
    `)
  } catch { return null }
}

export async function getSanityBlogPost(slug: string) {
  if (!sanityClient) return null
  try {
    return await sanityClient.fetch(`
      *[_type == "blogPost" && slug.current == $slug][0] {
        title,
        "slug": slug.current,
        category,
        excerpt,
        heroEmoji,
        heroImage,
        date,
        readTime,
        body
      }
    `, { slug })
  } catch { return null }
}

// ---- Route Content ----
export async function getSanityRouteContent(slug: string) {
  if (!sanityClient) return null
  try {
    return await sanityClient.fetch(`
      *[_type == "routeContent" && slug.current == $slug][0] {
        description,
        highlights,
        difficulty,
        km,
        hours,
        galleryCount
      }
    `, { slug })
  } catch { return null }
}

// ---- River Content ----
export async function getSanityRiverContent(slug: string) {
  if (!sanityClient) return null
  try {
    return await sanityClient.fetch(`
      *[_type == "riverContent" && slug.current == $slug][0] {
        description,
        highlights,
        region,
        season,
        totalLength,
        priceFrom,
        galleryCount
      }
    `, { slug })
  } catch { return null }
}

// ---- Site Settings ----
export async function getSanitySettings() {
  if (!sanityClient) return null
  try {
    return await sanityClient.fetch(`
      *[_type == "siteSettings" && _id == "siteSettings"][0]
    `)
  } catch { return null }
}
