import { brands } from '@/lib/products'

export function BrandsMarquee() {
  const doubled = [...brands, ...brands]
  return (
    <section className="border-y border-border bg-background py-8" aria-label="Marcas parceiras">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-5 text-center font-heading text-lg font-bold text-secondary">
          Marcas Parceiras
        </h2>
        <div className="group relative overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-4">
            {doubled.map((brand, i) => (
              <div
                key={`${brand}-${i}`}
                className="flex h-16 w-40 shrink-0 items-center justify-center rounded-lg border border-border bg-card"
              >
                <span className="font-heading text-lg font-bold uppercase tracking-wide text-muted-foreground">
                  {brand}
                </span>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  )
}
