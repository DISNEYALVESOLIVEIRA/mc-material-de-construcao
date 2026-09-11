import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"
import { CartProvider } from "@/components/cart/cart-provider"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { CookieBanner } from "@/components/marketing/cookie-banner"
import { NewsletterPopup } from "@/components/marketing/newsletter-popup"
import { WhatsappFloat } from "@/components/marketing/whatsapp-float"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: {
    default: "MC Material de Construção | Tudo para sua obra",
    template: "%s | MC Material de Construção",
  },
  description:
    "Do alicerce ao acabamento: pisos, revestimentos, ferramentas, hidráulica e elétrica com entrega rápida e preço justo.",
  keywords: [
    "material de construção",
    "pisos",
    "revestimentos",
    "ferramentas",
    "Salvador",
    "Bairro da Paz",
    "hidráulica",
    "elétrica",
  ],
  authors: [{ name: "MC Material de Construção" }],
  openGraph: {
    title: "MC Material de Construção | Tudo para sua obra",
    description: "Pisos, ferramentas, hidráulica e elétrica com o melhor preço e entrega ágil.",
    url: "https://mc-material-de-construcao.vercel.app",
    siteName: "MC Material de Construção",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased flex flex-col">
        <CartProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <CartDrawer />
          <CookieBanner />
          <NewsletterPopup />
          <WhatsappFloat />
        </CartProvider>
      </body>
    </html>
  )
}
