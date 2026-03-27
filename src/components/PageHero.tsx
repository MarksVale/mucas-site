import WaveDivider from '@/components/WaveDivider'

interface Props {
  heading: string
  subtitle?: string
}

/**
 * Standard page hero — green background, white text, wave into bg color.
 * Wave fill uses CSS variable so Sanity color changes apply automatically.
 */
export default function PageHero({ heading, subtitle }: Props) {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>{heading}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </section>
      <WaveDivider variant="into-bg" />
    </>
  )
}
