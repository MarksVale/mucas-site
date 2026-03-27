import { Link } from '@/i18n/navigation'
import type { Metadata } from 'next'
import { BLOG_POSTS, getPost } from '@/content/blog/posts'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await props.params
  const post = getPost(slug)
  if (!post) return { title: 'Not Found' }
  const isLv = locale !== 'en'
  const title = isLv && post.titleLv ? post.titleLv : post.title
  const excerpt = isLv && post.excerptLv ? post.excerptLv : post.excerpt
  return {
    title: title + ' | Mučas Laivu Noma',
    description: excerpt,
  }
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await props.params
  const post = getPost(slug)
  if (!post) notFound()

  const isLv = locale !== 'en'
  const title = isLv && post.titleLv ? post.titleLv : post.title
  const content = isLv && post.contentLv ? post.contentLv : post.content
  const category = isLv && post.categoryLv ? post.categoryLv : post.category

  const related = BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 3)

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>
            <Link href="/blog" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}>{isLv ? 'Blogs' : 'Blog'}</Link>
            {' / '}{category}
          </p>
          <h1 style={{ fontSize: 32 }}>{title}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="blog-content">
            <div className="blog-post-meta">
              {new Date(post.date).toLocaleDateString(isLv ? 'lv-LV' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} &bull; {post.readTime} {isLv ? '' : 'read'} &bull; {category}
            </div>

            {content && (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            )}

            <div className="blog-cta">
              <h3>{isLv ? 'Gatavs doties uz ūdens?' : 'Ready to Hit the Water?'}</h3>
              <p>{isLv ? 'Pārlūko marşrutus un rezervē savu Latvijas upes piedzīvojumu.' : 'Browse our routes and book your Latvian river adventure.'}</p>
              <Link href="/booking" className="btn btn-primary">{isLv ? 'Rezervēt braucienu' : 'Book Your Trip'}</Link>
            </div>
          </div>

          {related.length > 0 && (
            <div style={{ marginTop: 64 }}>
              <h2 className="section-heading">{isLv ? 'Vairāk no bloga' : 'More from the Blog'}</h2>
              <div style={{ marginTop: 24 }} className="blog-grid">
                {related.map(p => (
                  <Link href={{ pathname: '/blog/[slug]', params: { slug: p.slug } }} className="blog-card" key={p.slug}>
                    <div className="blog-img">
                      <span style={{ fontSize: 48 }}>{p.heroEmoji || '📝'}</span>
                    </div>
                    <div className="blog-body">
                      <div className="blog-category">{isLv && p.categoryLv ? p.categoryLv : p.category}</div>
                      <h3>{isLv && p.titleLv ? p.titleLv : p.title}</h3>
                      <p>{isLv && p.excerptLv ? p.excerptLv : p.excerpt}</p>
                      <div className="blog-meta">{new Date(p.date).toLocaleDateString(isLv ? 'lv-LV' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} &bull; {p.readTime}</div>
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
