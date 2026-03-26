import Link from 'next/link'
import type { Metadata } from 'next'
import { BLOG_POSTS } from '@/content/blog/posts'

export const metadata: Metadata = {
  title: 'Blog | Mučas Laivu Noma',
  description: 'Tips, guides, and news about kayaking, canoeing, and river trips in Latvia. Everything you need to prepare for your adventure.',
}

export default function BlogPage() {
  const posts = BLOG_POSTS

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Blog</h1>
          <p>Tips, guides, and stories from Latvia&apos;s rivers</p>
        </div>
      </section>

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

      <section className="cta-fullbleed">
        <div className="container">
          <h2>Ready for Your River Adventure?</h2>
          <p>Browse our routes and book your trip today.</p>
          <Link href="/booking" className="btn btn-primary btn-lg">Book Now</Link>
        </div>
      </section>
    </>
  )
}
