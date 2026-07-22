import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { homeCategories } from '@/lib/products'

export function CategoryShowcase() {
  return (
    <section className="bg-muted/60">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-7 w-1.5 rounded-full bg-primary" />
          <h2 className="font-heading text-xl font-bold text-secondary sm:text-2xl">
            Compre por Categorias
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {homeCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="group relative overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className="aspect-4/3 overflow-hidden bg-muted">
                <Image
                  src={cat.image || '/placeholder.svg'}
                  alt={cat.label}
                  width={400}
                  height={300}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-2 p-4">
                <span className="font-heading text-base font-bold text-secondary">
                  {cat.label}
                </span>
                <span className="flex items-center gap-1 text-sm font-semibold text-primary">
                  Comprar
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
