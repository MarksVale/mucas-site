// Sanity CMS — lightweight fetch client (no SDK)
// Project: jb64rhta | Dataset: production

const PROJECT_ID = 'jb64rhta'
const DATASET = 'production'
const API_VERSION = '2023-05-03'

interface DesignTokenColors {
  primary?: string
  primaryLight?: string
  accent?: string
  bgDark?: string
  bg?: string
  surface?: string
  text?: string
  textMuted?: string
  border?: string
}

interface DesignTokens {
  colors?: DesignTokenColors
  borderRadius?: string
  shadows?: 'none' | 'subtle' | 'visible'
}

export interface SiteSettings {
  brandName?: string
  designTokens?: DesignTokens
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const query = encodeURIComponent(
    '*[_type == "siteSettings" && !(_id in path("drafts.**"))][0]{brandName, designTokens}'
  )
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`

  try {
    const res = await fetch(url, { next: { revalidate: 60 } })
    if (!res.ok) return {}
    const data = await res.json()
    return data.result ?? {}
  } catch {
    return {}
  }
}

const SHADOW_MAP = {
  none: 'none',
  subtle: '0 1px 4px rgba(0,0,0,0.08)',
  visible: '0 2px 12px rgba(0,0,0,0.15)',
}

// Builds a :root { ... } override block from Sanity design tokens.
// Injected as a <style> tag in layout — overrides globals.css defaults.
export function buildDesignTokenCSS(tokens?: DesignTokens): string {
  if (!tokens) return ''

  const lines: string[] = []
  const c = tokens.colors ?? {}

  // Semantic tokens (new naming) — !important ensures these win over globals.css
  if (c.primary)      lines.push(`  --color-primary: ${c.primary} !important;`)
  if (c.primaryLight) lines.push(`  --color-primary-light: ${c.primaryLight} !important;`)
  if (c.accent)       lines.push(`  --color-accent: ${c.accent} !important;`)
  if (c.bgDark)       lines.push(`  --color-bg-dark: ${c.bgDark} !important;`)
  if (c.bg)           lines.push(`  --color-bg: ${c.bg} !important;`)
  if (c.surface)      lines.push(`  --color-surface: ${c.surface} !important;`)
  if (c.text)         lines.push(`  --color-text: ${c.text} !important;`)
  if (c.textMuted)    lines.push(`  --color-text-muted: ${c.textMuted} !important;`)
  if (c.border)       lines.push(`  --color-border: ${c.border} !important;`)

  // Legacy aliases (existing classes use these)
  if (c.primary)      lines.push(`  --primary: ${c.primary} !important;`)
  if (c.accent)       lines.push(`  --accent: ${c.accent} !important;`)
  if (c.bgDark)       lines.push(`  --dark: ${c.bgDark} !important;`)
  if (c.bg)           lines.push(`  --bg: ${c.bg} !important;`)
  if (c.surface)      lines.push(`  --card: ${c.surface} !important;`)
  if (c.text)         lines.push(`  --text: ${c.text} !important;`)
  if (c.textMuted)    lines.push(`  --text-muted: ${c.textMuted} !important;`)
  if (c.border)       lines.push(`  --border: ${c.border} !important;`)

  if (tokens.borderRadius) {
    lines.push(`  --radius-sm: ${tokens.borderRadius} !important;`)
    lines.push(`  --radius: ${tokens.borderRadius} !important;`)
    lines.push(`  --radius-lg: ${tokens.borderRadius} !important;`)
    lines.push(`  --radius-xl: ${tokens.borderRadius} !important;`)
  }

  if (tokens.shadows) {
    const v = SHADOW_MAP[tokens.shadows]
    lines.push(`  --shadow-sm: ${v} !important;`)
    lines.push(`  --shadow-md: ${v} !important;`)
    lines.push(`  --shadow-lg: ${v} !important;`)
  }

  if (lines.length === 0) return ''
  return `:root {\n${lines.join('\n')}\n}`
}
