export const metadata = {
  title: 'Admin | Mučas CMS',
  description: 'Content management for Mučas Laivu Noma',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
