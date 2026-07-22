'use client'

import { useEffect, useState } from 'react'
import { Timer } from 'lucide-react'
import { ProductCard } from '@/components/product/product-card'
import type { Product } from '@/lib/products'

function useCountdown(target: number) {
  const [remaining, setRemaining] = useState(target - Date.now())

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(target - Date.now())
    }, 1000)
    return () => clearInterval(id)
  }, [target])

  const clamped = Math.max(0, remaining)
  const days = Math.floor(clamped / 86400000)
  const hours = Math.floor((clamped % 86400000) / 3600000)
  const minutes = Math.floor((clamped % 3600000) / 60000)
  const seconds = Math.floor((clamped % 60000) / 1000)
  return { days, hours, minutes, seconds }
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="flex min-w-11 items-center justify-center rounded-md bg-secondary px-2 py-1.5 font-heading text-lg font-bold tabular-nums text-white sm:text-xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-1 text-[10px] font-medium uppercase text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

export function CountdownOffers({ products }: { products: Product[] }) {
  // Alvo fixo relativo à montagem para evitar mismatch de hidratação.
  const [target] = useState(() => Date.now() + 1000 * 60 * 60 * 26 + 1000 * 47)
  const { days, hours, minutes, seconds } = useCountdown(target)

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 rounded-xl border border-border bg-muted/60 p-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Timer className="size-6" />
            </span>
            <div>
              <h2 className="font-heading text-xl font-bold text-secondary sm:text-2xl">
                Promoções Exclusivas
              </h2>
              <p className="text-sm text-muted-foreground">
                Ofertas por tempo limitado. Aproveite!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TimeBox value={days} label="Dias" />
            <span className="pb-4 font-bold text-secondary">:</span>
            <TimeBox value={hours} label="Horas" />
            <span className="pb-4 font-bold text-secondary">:</span>
            <TimeBox value={minutes} label="Min" />
            <span className="pb-4 font-bold text-secondary">:</span>
            <TimeBox value={seconds} label="Seg" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
