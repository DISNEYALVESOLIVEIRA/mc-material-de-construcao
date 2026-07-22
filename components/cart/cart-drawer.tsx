'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { X, ShoppingCart, Trash2, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { QuantityStepper } from '@/components/ui/quantity-stepper'
import { WhatsappIcon } from '@/components/icons/whatsapp-icon'
import { useCart } from '@/components/cart/cart-provider'
import { formatBRL, pixPrice, whatsappLink } from '@/lib/format'
import { cn } from '@/lib/utils'

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    setQuantity,
    removeItem,
    subtotal,
    totalItems,
  } = useCart()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const waMessage =
    'Olá! Quero finalizar meu pedido:\n' +
    items
      .map((i) => `- ${i.quantity}x ${i.product.name} (${i.product.sku})`)
      .join('\n') +
    `\n\nSubtotal: ${formatBRL(subtotal)}`

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 transition-opacity',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className={cn(
          'fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col bg-background shadow-xl transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="flex items-center gap-2 text-lg font-bold font-heading">
            <ShoppingCart className="size-5 text-primary" />
            Meu Carrinho
            <span className="text-sm font-normal text-muted-foreground">
              ({totalItems})
            </span>
          </h2>
          <button
            onClick={closeCart}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"
            aria-label="Fechar carrinho"
          >
            <X className="size-5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingCart className="size-12 text-muted-foreground/40" />
            <p className="font-medium">Seu carrinho está vazio</p>
            <p className="text-sm text-muted-foreground">
              Adicione produtos para continuar sua compra.
            </p>
            <Button onClick={closeCart} className="mt-2">
              Continuar comprando
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-3 py-4">
                  <Image
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="size-20 shrink-0 rounded-lg border border-border object-cover"
                  />
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="line-clamp-2 text-sm font-medium leading-tight">
                        {product.name}
                      </p>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="shrink-0 rounded p-1 text-muted-foreground hover:text-destructive"
                        aria-label={`Remover ${product.name}`}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <QuantityStepper
                        value={quantity}
                        onChange={(q) => setQuantity(product.id, q)}
                        size="sm"
                        min={1}
                      />
                      <p className="text-sm font-bold">
                        {formatBRL(product.price * quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="space-y-3 border-t border-border px-5 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-lg font-bold">{formatBRL(subtotal)}</span>
              </div>
              <p className="text-right text-sm font-semibold text-whatsapp">
                {formatBRL(pixPrice(subtotal))} à vista no Pix (5% OFF)
              </p>
              <Button size="lg" className="h-12 w-full text-base font-semibold">
                Finalizar Compra
              </Button>
              <a
                href={whatsappLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-whatsapp text-base font-semibold text-whatsapp-foreground transition-colors hover:bg-whatsapp/90"
              >
                <WhatsappIcon className="size-5" />
                Finalizar pelo WhatsApp
              </a>
              <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="size-4 text-whatsapp" />
                Compra 100% segura
              </p>
            </footer>
          </>
        )}
      </aside>
    </>
  )
}
