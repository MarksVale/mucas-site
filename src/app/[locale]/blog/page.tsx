import { Link } from '@/i18n/navigation'
import type { Metadata } from 'next'
import { BLOG_POSTS } from '@/content/blog/posts'

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params
  const isLv = locale !== 'en'
  return {
    title: isLv ? 'Blogs | Mučas Laivu Noma' : 'Blog | Mučas Laivu Noma',
    description: isLv
      ? 'Padomi, ceļveži un jaunumi par airēšanu, kanoe un upes braucieniem Latvijā.'
      : 'Tips, guides, and news about kayaking, canoeing, and river trips in Latvia.',
  }
}

export default async function BlogPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params
  const isLv = locale !== 'en'
  const posts = BLOG_POSTS

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>{isLv ? 'Blogs' : 'Blog'}</h1>
          <p>{isLv ? 'Padomi, ceļveži un stāsti no Latvijas upēm' : "Tips, guides, and stories from Latvia's rivers"}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="blog-grid">
            {posts.map((post) => (
              <Link href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }} className="blog-card" key={post.slug}>
                <div className="blog-img">
                  <span style={{ fontSize: 48 }}>{post.heroEmoji}</span>
                </div>
                <div className="blog-body">
                  <div className="blog-category">{isLv && post.categoryLv ? post.categoryLv : post.category}</div>
                  <h3>{isLv && post.titleLv ? post.titleLv : post.title}</h3>
                  <p>{isLv && post.excerptLv ? post.excerptLv : post.excerpt}</p>
                  <div className="blog-meta">{new Date(post.date).toLocaleDateString(isLv ? 'lv-LV' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} &bull; {post.readTime} {isLv ? '' : 'read'}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-banner" style={{ textAlign: 'center' }}>
            <h2>{isLv ? 'Gatavs upes piedzīvojumam?' : 'Ready for Your River Adventure?'}</h2>
            <p>{isLv ? 'Pārlūko marşrutus un rezervē savu braucienu.' : 'Browse our routes and book your trip today.'}</p>
            <Link href="/booking" className="btn btn-primary btn-lg">{isLv ? 'Rezervēt' : 'Book Now'}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
