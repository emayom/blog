import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { siteConfig } from '@/config/site'
import { absoluteUrl } from '@/lib/seo'
import { buildPersonJsonLd, buildWebSiteJsonLd } from '@/lib/json-ld'
import { JsonLd } from '@/components/seo/json-ld'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { GoogleAnalytics } from '@/components/analytics/google-analytics'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    types: {
      'application/rss+xml': absoluteUrl('/feed.xml'),
    },
  },
  // openGraph는 페이지 레벨(buildMetadata)에서만 정의한다.
  // layout과 페이지가 둘 다 openGraph.type을 정의하면 dev 모드에서 og:type 메타가 중복 렌더된다.
  twitter: {
    card: 'summary_large_image',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#272729' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      // next-themes가 html class를 직접 조작하므로 hydration 경고 억제
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GoogleAnalytics />
        <JsonLd data={buildWebSiteJsonLd()} />
        <JsonLd data={buildPersonJsonLd({ includeContext: true })} />
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
