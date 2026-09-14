import type { Metadata } from 'next'
import { getPromotionalProducts } from '@/lib/products'
import { CountdownOffers } from '@/components/home/countdown-offers'

export const metadata: Metadata = {
  title: 'Promoções',
  description:
    'Ofertas por tempo limitado em pisos, ferramentas, hidráulica, elétrica e muito mais. Aproveite antes que acabe.',
}

export default function PromocoesPage() {
  const promotions = getPromotionalProducts()

  return (
    <div className="mx-auto max-w-7xl px-4 py-2">
      {promotions.length > 0 ? (
        <CountdownOffers products={promotions} />
      ) : (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          <p className="font-medium text-foreground">
            Nenhuma promoção ativa no momento.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Volte em breve, novas ofertas chegam toda semana.
          </p>
        </div>
      )}
    </div>
  )
}
