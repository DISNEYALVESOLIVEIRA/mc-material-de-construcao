'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { QuantityStepper } from '@/components/ui/quantity-stepper'
import { WhatsappIcon } from '@/components/icons/whatsapp-icon'
import { useCart } from '@/components/cart/cart-provider'
import type { Product } from '@/lib/products'
import {
  formatBRL,
  pixPrice,
  installmentValue,
  discountPercent,
  whatsappLink,
} from '@/lib/format'
import { cn } from '@/lib/utils'

const badgeStyles: Record<string, string> = {
  lancamento: 'bg-secondary text-secondary-foreground',
  destaque: 'bg-primary text-primary-foreground',
  esgotado: 'bg-muted-foreground text-white',
}

const badgeLabel: Record<string, string> = {
  lancamento: 'Lançamento',
  destaque: 'Destaque',
  esgotado: 'Esgotado',
}

export function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const discount = discountPercent(product.price, product.oldPrice)
  const href = `/produto/${product.slug}`

  const waMessage = `Olá! Tenho interesse no produto: ${product.name} (${product.sku}). Quantidade: ${quantity}.`

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg">
      <div className="relative">
        <Link href={href} className="block overflow-hidden bg-muted">
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            width={400}
            height={400}
            className={cn(
              'aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105',
              !product.inStock && 'opacity-60',
            )}
          />
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {discount && (
            <span className="rounded-md bg-primary px-2 py-1 text-xs font-bold text-primary-foreground shadow-sm">
              -{discount}%
            </span>
          )}
          {product.badges.map((b) => (
            <span
              key={b}
              className={cn(
                'rounded-md px-2 py-1 text-xs font-semibold shadow-sm',
                badgeStyles[b],
              )}
            >
              {badgeLabel[b]}
            </span>
          ))}
          {!product.inStock && (
            <span className="rounded-md bg-muted-foreground px-2 py-1 text-xs font-semibold text-white shadow-sm">
              Esgotado
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-primary text-primary" />
          <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
          <span>({product.reviews})</span>
        </div>

        <Link
          href={href}
          className="line-clamp-2 min-h-10 text-sm font-medium leading-5 text-foreground hover:text-primary"
        >
          {product.name}
        </Link>

        <div className="mt-auto space-y-0.5">
          {product.oldPrice && (
            <p className="text-sm text-muted-foreground line-through">
              {formatBRL(product.oldPrice)}
            </p>
          )}
          <p className="text-2xl font-bold text-foreground font-heading">
            {formatBRL(product.price)}
          </p>
          <p className="text-sm font-semibold text-whatsapp">
            {formatBRL(pixPrice(product.price))} à vista no Pix
          </p>
          <p className="text-xs text-muted-foreground">
            ou {product.installments}x de{' '}
            {formatBRL(installmentValue(product.price, product.installments))} sem juros
          </p>
        </div>

        <div className="flex flex-col gap-2 pt-1">
          <div className="flex items-center justify-between gap-2">
            <QuantityStepper
              value={quantity}
              onChange={setQuantity}
              size="sm"
            />
            <Button
              size="lg"
              className="flex-1 font-semibold"
              disabled={!product.inStock}
              onClick={() => addItem(product, quantity)}
            >
              {product.inStock ? 'Comprar' : 'Esgotado'}
            </Button>
          </div>
          <a
            href={whatsappLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-whatsapp text-sm font-semibold text-whatsapp-foreground transition-colors hover:bg-whatsapp/90"
          >
            <WhatsappIcon className="size-4" />
            Comprar pelo WhatsApp
          </a>
        </div>
      </div>
    </article>
  )
}
