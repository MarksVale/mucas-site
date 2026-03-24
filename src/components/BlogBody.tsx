'use client'
import { PortableText } from '@portabletext/react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BlogBody({ value }: { value: any }) {
  return <PortableText value={value} />
}
