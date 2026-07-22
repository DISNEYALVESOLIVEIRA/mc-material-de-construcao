import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function SecondaryBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="relative overflow-hidden rounded-2xl bg-secondary">
        <Image
          src="/banners/pisos-vinilicos.png"
          alt="Linha completa de pisos vinílicos"
          fill
          className="object-cover opacity-40"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
        <div className="relative flex flex-col items-start gap-3 px-6 py-10 sm:px-12 sm:py-14">
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">
            Novidade
          </span>
          <h2 className="max-w-lg text-balance font-heading text-2xl font-extrabold text-white sm:text-3xl">
            Pisos Vinílicos: uma linha completa para o seu lar
          </h2>
          <p className="max-w-md text-sm text-white/85">
            Conforto, resistência à água e instalação fácil com sistema click.
          </p>
          <Button asChild size="lg" className="mt-2 h-11 px-6 text-base font-semibold">
            <Link href="/categoria/pisos-revestimentos/pisos-vinilicos">
              Conferir linha
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
