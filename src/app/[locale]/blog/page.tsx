import Link from 'next/link'
import PageHero from '@/components/PageHero'
import type { Metadata } from 'next'
import { buildAlternates, buildOpenGraph, twitterCard, SITE_NAME } from '@/lib/seo'
import { BLOG_POSTS } from '@/content/blog/posts'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isLv = locale !== 'en'
  const title = isLv ? `Blogs | ${SITE_NAME}` : `Blog | ${SITE_NAME}`
  const description = isLv
    ? 'Padomi, ceļveži un stāsti no Latvijas upēm. Viss, kas jāzina, lai sagatavotos savam piedzīvojumam.'
    : "Tips, guides, and news about kayaking, canoeing, and river trips in Latvia. Everything you need to prepare for your adventure."
  return {
    title, description,
    alternates: buildAlternates('/blog'),
    openGraph: buildOpenGraph({ locale, title, description, path: '/blog' }),
    twitter: twitterCard,
  }
}

export default function BlogPage() {
  const posts = BLOG_POSTS

  return (
    <>
      <PageHero heading="Blog" subtitle="Tips, guides, and stories from Latvia's rivers" />

      <section className="section">
        <div className="container">
          <div className="blog-grid">
            {posts.map((post: { slug: string; title: string; excerpt: string; category: string; date: string; readTime: string; heroEmoji: string }) => (
              <Link href={`/blog/${post.slug}`} className="blog-card" key={post.slug}>
                <div className="blog-img">
                  <span style={{ fontSize: 48 }}>{post.heroEmoji}</span>
                </div>
                <div className="blog-body">
                  <div className="blog-category">{post.category}</div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="blog-meta">{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} &bull; {post.readTime} read</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>Ready for Your River Adventure?</h2>
            <p>Browse our routes and book your trip today.</p>
            <Link href="/booking" className="btn btn-primary btn-lg">Book Now</Link>
          </div>
        </div>
      </section>
    </>
  )
}
