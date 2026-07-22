import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { HeroCarousel } from '@/components/home/hero-carousel'
import { BenefitsBar } from '@/components/home/benefits-bar'
import { ProductShelf } from '@/components/home/product-shelf'
import { CategoryShowcase } from '@/components/home/category-showcase'
import { CountdownOffers } from '@/components/home/countdown-offers'
import { BrandsMarquee } from '@/components/home/brands-marquee'
import { SecondaryBanner } from '@/components/home/secondary-banner'
import { products } from '@/lib/products'

export default function HomePage() {
  const lancamentos = products.filter((p) => p.badges.includes('lancamento') || p.badges.includes('destaque'))
  const destaques = products.filter((p) => p.inStock)
  const promocoes = products.filter((p) => p.oldPrice).slice(0, 4)

  return (
    <>
      <SiteHeader />
      <main>
        <HeroCarousel />
        <BenefitsBar />
        <ProductShelf title="Lançamentos" products={lancamentos} accent="primary" />
        <CategoryShowcase />
        <ProductShelf title="Destaques" products={destaques} />
        <CountdownOffers products={promocoes} />
        <BrandsMarquee />
        <SecondaryBanner />
      </main>
      <SiteFooter />
    </>
  )
}
