import Link from 'next/link'
import type { Metadata } from 'next'
import { BLOG_POSTS, getPost } from '@/content/blog/posts'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params
  const post = getPost(slug)
  if (!post) return { title: 'Not Found' }
  return {
    title: `${post.title} | Mučas Laivu Noma`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const post = getPost(slug)
  if (!post) notFound()

  const related = BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 3)

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>
            <Link href="/blog" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}>Blog</Link>
            {' / '}{post.category}
          </p>
          <h1 style={{ fontSize: 32 }}>{post.title}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="blog-content">
            <div className="blog-post-meta">
              {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} &bull; {post.readTime} read &bull; {post.category}
            </div>

            <div dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="blog-cta">
              <h3>Ready to Hit the Water?</h3>
              <p>Browse our routes and book your Latvian river adventure.</p>
              <Link href="/booking" className="btn btn-primary">Book Your Trip</Link>
            </div>
          </div>

          {related.length > 0 && (
            <div style={{ marginTop: 64 }}>
              <h2 className="section-heading">More from the Blog</h2>
              <div style={{ marginTop: 24 }} className="blog-grid">
                {related.map(p => (
                  <Link href={`/blog/${p.slug}`} className="blog-card" key={p.slug}>
                    <div className="blog-img">
                      <span style={{ fontSize: 48 }}>{p.heroEmoji}</span>
                    </div>
                    <div className="blog-body">
                      <div className="blog-category">{p.category}</div>
                      <h3>{p.title}</h3>
                      <p>{p.excerpt}</p>
                      <div className="blog-meta">{new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} &bull; {p.readTime} read</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
