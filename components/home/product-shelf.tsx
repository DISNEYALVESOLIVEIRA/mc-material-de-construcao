'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from '@/components/product/product-card'
import type { Product } from '@/lib/products'

interface ProductShelfProps {
  title: string
  products: Product[]
  href?: string
  accent?: 'primary' | 'secondary'
}

export function ProductShelf({
  title,
  products,
  href = '/promocoes',
  accent = 'secondary',
}: ProductShelfProps) {
  const scroller = useRef<HTMLDivElement>(null)

  function scroll(dir: 'left' | 'right') {
    scroller.current?.scrollBy({
      left: dir === 'left' ? -320 : 320,
      behavior: 'smooth',
    })
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={`h-7 w-1.5 rounded-full ${
              accent === 'primary' ? 'bg-primary' : 'bg-secondary'
            }`}
          />
          <h2 className="font-heading text-xl font-bold text-secondary sm:text-2xl">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={href}
            className="hidden text-sm font-semibold text-primary hover:underline sm:block"
          >
            Ver todos
          </Link>
          <button
            onClick={() => scroll('left')}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-background text-secondary hover:bg-muted"
            aria-label="Rolar para a esquerda"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-background text-secondary hover:bg-muted"
            aria-label="Rolar para a direita"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="w-[260px] shrink-0 snap-start sm:w-[280px]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  )
}
