// Root layout — minimal shell for routes outside [locale] (e.g. /admin, /api)
// All public pages use src/app/[locale]/layout.tsx

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
