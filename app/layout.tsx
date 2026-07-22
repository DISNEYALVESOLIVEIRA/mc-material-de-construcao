import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { CartProvider } from '@/components/cart/cart-provider'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { NewsletterPopup } from '@/components/marketing/newsletter-popup'
import { CookieBanner } from '@/components/marketing/cookie-banner'
import { WhatsappFloat } from '@/components/marketing/whatsapp-float'
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
  title: 'MC Material de Construção | Tudo para sua obra e acabamento',
  description:
    'Loja completa de materiais de construção e acabamento. Pisos, revestimentos, ferramentas, hidráulica, elétrica e muito mais com frete grátis para Sul e Sudeste e 5% OFF no Pix.',
  generator: 'v0.app',
  keywords: [
    'material de construção',
    'porcelanato',
    'piso',
    'ferramentas',
    'acabamento',
    'obra',
  ],
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
          {children}
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
