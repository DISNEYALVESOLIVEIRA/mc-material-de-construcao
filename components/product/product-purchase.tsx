"use client"

import { useState } from "react"
import { Star, Ruler, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuantityStepper } from "@/components/ui/quantity-stepper"
import { WhatsappIcon } from "@/components/icons/whatsapp-icon"
import { AreaCalculator } from "@/components/product/area-calculator"
import { ShippingCalculator } from "@/components/product/shipping-calculator"
import { useCart } from "@/components/cart/cart-provider"
import type { Product } from "@/lib/products"
import { formatBRL, pixPrice, installmentValue, discountPercent, whatsappLink } from "@/lib/format"
import { cn } from "@/lib/utils"

export function ProductPurchase({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const [calcOpen, setCalcOpen] = useState(false)
  const { addItem } = useCart()
  const discount = discountPercent(product.price, product.oldPrice)

  const waMessage = `Olá! Tenho interesse no produto: ${product.name} (${product.sku}). Quantidade: ${quantity}.`

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {product.badges.includes("lancamento") && (
            <span className="rounded-md bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground">
              Lançamento
            </span>
          )}
          {discount && (
            <span className="rounded-md bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">
              -{discount}% OFF
            </span>
          )}
          <span className="text-xs text-muted-foreground">SKU: {product.sku}</span>
        </div>

        <h1 className="text-pretty font-heading text-2xl font-bold leading-tight text-secondary md:text-3xl">
          {product.name}
        </h1>

        <div className="mt-2 flex items-center gap-1.5 text-sm">
          <div className="flex items-center gap-0.5 text-primary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={cn("h-4 w-4", i < Math.round(product.rating) && "fill-primary")} />
            ))}
          </div>
          <span className="font-semibold text-foreground">{product.rating.toFixed(1)}</span>
          <span className="text-muted-foreground">({product.reviews} avaliações)</span>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-muted/40 p-5">
        {product.oldPrice && (
          <p className="text-sm text-muted-foreground line-through">{formatBRL(product.oldPrice)}</p>
        )}
        <p className="font-heading text-4xl font-extrabold text-secondary">{formatBRL(product.price)}</p>
        <p className="mt-1 text-lg font-bold text-whatsapp">
          {formatBRL(pixPrice(product.price))}{" "}
          <span className="text-sm font-medium">à vista no Pix (5% OFF)</span>
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          ou {product.installments}x de {formatBRL(installmentValue(product.price, product.installments))} sem juros
        </p>
      </div>

      {product.coveragePerBox && (
        <button
          type="button"
          onClick={() => setCalcOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/50 bg-primary/5 px-4 py-3 text-sm font-bold text-primary transition hover:bg-primary/10"
        >
          <Ruler className="h-5 w-5" />
          CALCULAR M² NECESSÁRIOS
        </button>
      )}

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <QuantityStepper value={quantity} onChange={setQuantity} />
          <span className="text-sm text-muted-foreground">
            {product.inStock ? "Em estoque" : "Produto esgotado"}
          </span>
        </div>

        <Button
          size="lg"
          disabled={!product.inStock}
          onClick={() => addItem(product, quantity)}
          className="h-12 gap-2 text-base font-bold"
        >
          <ShoppingCart className="h-5 w-5" />
          {product.inStock ? "Comprar agora" : "Esgotado"}
        </Button>

        <a
          href={whatsappLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-whatsapp text-base font-bold text-whatsapp-foreground transition-colors hover:bg-whatsapp/90"
        >
          <WhatsappIcon className="h-5 w-5" />
          Comprar pelo WhatsApp
        </a>
      </div>

      <ShippingCalculator />

      {product.coveragePerBox && (
        <AreaCalculator
          open={calcOpen}
          onClose={() => setCalcOpen(false)}
          coveragePerBox={product.coveragePerBox}
          unitLabel="caixas"
          onApply={(boxes) => {
            setQuantity(boxes)
            addItem(product, boxes)
          }}
        />
      )}
    </div>
  )
}
