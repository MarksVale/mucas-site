/**
 * WaveDivider — inline SVG wave that uses CSS variables for fill color.
 * This means the color is fully controlled by Sanity design tokens.
 *
 * variant="into-bg"   → cream wave (--bg), used below green hero / dark sections
 * variant="into-dark" → green wave (--color-bg-dark), used above footer
 * variant="into-white"→ white wave (--color-text-inverse)
 */

type WaveVariant = 'into-bg' | 'into-dark' | 'into-white'

const FILL: Record<WaveVariant, string> = {
  'into-bg':    'var(--bg)',
  'into-dark':  'var(--color-bg-dark)',
  'into-white': '#ffffff',
}

interface Props {
  variant: WaveVariant
  /** 'bottom' (default) sits at the bottom of a section; 'top' sits at the top */
  position?: 'bottom' | 'top'
  height?: number
}

export default function WaveDivider({ variant, position = 'bottom', height = 70 }: Props) {
  const fill = FILL[variant]

  // Bottom wave path (wave "fills" the bottom of the section)
  const bottomPath = "M0,28 C360,65 720,5 1080,38 C1260,55 1380,18 1440,28 L1440,70 L0,70 Z"
  // Top wave path (wave "fills" the top of the section)
  const topPath    = "M0,42 C360,5 720,65 1080,32 C1260,15 1380,52 1440,42 L1440,0 L0,0 Z"

  return (
    <div
      aria-hidden="true"
      style={{
        display: 'block',
        lineHeight: 0,
        marginTop: position === 'top' ? 0 : `-${height - 2}px`,
        marginBottom: position === 'bottom' ? 0 : `-${height - 2}px`,
        pointerEvents: 'none',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 1440 ${height}`}
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: `${height}px` }}
      >
        <path d={position === 'top' ? topPath : bottomPath} style={{ fill }} />
      </svg>
    </div>
  )
}
