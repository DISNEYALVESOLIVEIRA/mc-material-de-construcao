import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { CartProvider } from '@/components/cart/cart-provider'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { NewsletterPopup } from '@/components/marketing/newsletter-popup'
import { CookieBanner } from '@/components/marketing/cookie-banner'
import { WhatsappFloat } from '@/components/marketing/whatsapp-float'
import { SITE_URL } from '@/lib/format'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'MC Material de Construção | Tudo para sua obra e acabamento',
    template: '%s | MC Material de Construção',
  },
  description:
    'Loja completa de materiais de construção e acabamento em Salvador, BA. Pisos, revestimentos, ferramentas, hidráulica, elétrica e muito mais com 5% OFF no Pix.',
  generator: 'v0.app',
  keywords: [
    'material de construção',
    'material de construção Salvador',
    'porcelanato',
    'piso',
    'ferramentas',
    'acabamento',
    'obra',
  ],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'MC Material de Construção',
    title: 'MC Material de Construção | Tudo para sua obra e acabamento',
    description:
      'Loja completa de materiais de construção e acabamento em Salvador, BA, com os melhores preços e 5% OFF no Pix.',
    images: [{ url: '/banners/hero-obra.png', width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ff6600',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`light bg-background ${inter.variable} ${poppins.variable}`}>
      <body className="antialiased">
        <CartProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <CartDrawer />
          <NewsletterPopup />
          <CookieBanner />
          <WhatsappFloat />
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}