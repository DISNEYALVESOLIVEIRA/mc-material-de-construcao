"use client"

import { useState } from "react"
import { Star, ShieldCheck, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/products"

const TABS = ["Descrição", "Características", "Garantia", "Pagamento", "Avaliações"] as const
type Tab = (typeof TABS)[number]

export function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState<Tab>("Descrição")

  return (
    <section className="mt-12">
      <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={cn(
              "relative whitespace-nowrap px-4 py-3 text-sm font-semibold transition",
              active === tab ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab}
            {active === tab && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />}
          </button>
        ))}
      </div>

      <div className="py-6 text-sm leading-relaxed text-foreground">
        {active === "Descrição" && (
          <p className="max-w-3xl text-muted-foreground">{product.description}</p>
        )}

        {active === "Características" && (
          <div className="max-w-2xl overflow-hidden rounded-lg border border-border">
            <table className="w-full text-left">
              <tbody className="divide-y divide-border">
                {product.features.map((s) => (
                  <tr key={s.label} className="even:bg-muted/40">
                    <th className="w-1/2 px-4 py-2.5 font-medium text-secondary">{s.label}</th>
                    <td className="px-4 py-2.5 text-muted-foreground">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {active === "Garantia" && (
          <div className="flex max-w-2xl items-start gap-3 rounded-lg border border-border bg-muted/40 p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-semibold text-secondary">Garantia de {product.warranty}</p>
              <p className="mt-1 text-muted-foreground">
                Garantia contra defeitos de fabricação conforme o Código de Defesa do Consumidor. Guarde sua nota fiscal para acionamento.
              </p>
            </div>
          </div>
        )}

        {active === "Pagamento" && (
          <div className="flex max-w-2xl items-start gap-3 rounded-lg border border-border bg-muted/40 p-4">
            <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <ul className="space-y-1.5 text-muted-foreground">
              <li>Cartão de crédito em até 12x sem juros</li>
              <li>Pix com 5% de desconto à vista</li>
              <li>Boleto bancário</li>
              <li>Compra 100% segura com criptografia SSL</li>
            </ul>
          </div>
        )}

        {active === "Avaliações" && (
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("h-4 w-4", i < Math.round(product.rating) && "fill-primary")} />
                ))}
              </div>
              <span className="text-sm font-semibold text-secondary">{product.rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">({product.reviews} avaliações)</span>
            </div>
            {[
              { name: "Carlos M.", text: "Produto de ótima qualidade, entrega rápida. Recomendo!" },
              { name: "Fernanda R.", text: "Chegou tudo certinho e bem embalado. Comprarei novamente." },
            ].map((r) => (
              <div key={r.name} className="rounded-lg border border-border p-4">
                <div className="mb-1 flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{r.text}</p>
                <p className="mt-2 text-xs font-medium text-secondary">{r.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
