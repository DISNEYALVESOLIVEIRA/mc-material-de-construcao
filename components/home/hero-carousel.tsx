'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Slide {
  image: string
  eyebrow: string
  title: string
  subtitle: string
  cta: string
  href: string
}

const slides: Slide[] = [
  {
    image: '/banners/hero-obra.png',
    eyebrow: 'Sua obra começa aqui',
    title: 'Tudo para a sua Obra',
    subtitle: 'Do alicerce ao acabamento com os melhores preços e frete grátis.',
    cta: 'Comprar agora',
    href: '/categoria/materiais-construcao',
  },
  {
    image: '/banners/pisos-vinilicos.png',
    eyebrow: 'Linha de Acabamento',
    title: 'Acabamento a partir de R$ 19,90',
    subtitle: 'Pisos, revestimentos e tintas para transformar seus ambientes.',
    cta: 'Ver ofertas',
    href: '/categoria/pisos-revestimentos',
  },
  {
    image: '/categories/ferramentas.png',
    eyebrow: 'Linha de Ferramentas',
    title: 'Ferramentas Profissionais',
    subtitle: 'Potência e durabilidade para o seu trabalho render mais.',
    cta: 'Explorar',
    href: '/categoria/ferramentas',
  },
]

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    [],
  )
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)

  useEffect(() => {
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [next])

  return (
    <section className="relative overflow-hidden bg-secondary" aria-label="Destaques">
      <div className="relative mx-auto h-[280px] max-w-7xl sm:h-[360px] lg:h-[440px]">
        {slides.map((slide, i) => (
          <div
            key={slide.title}
            className={cn(
              'absolute inset-0 transition-opacity duration-700',
              i === current ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
            aria-hidden={i !== current}
          >
            <Image
              src={slide.image || '/placeholder.svg'}
              alt={slide.title}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/70 to-transparent" />
            <div className="relative flex h-full max-w-xl flex-col justify-center gap-3 px-6 sm:px-10 lg:px-16">
              <span className="w-fit rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">
                {slide.eyebrow}
              </span>
              <h1 className="text-balance font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                {slide.title}
              </h1>
              <p className="max-w-md text-pretty text-sm text-white/85 sm:text-base">
                {slide.subtitle}
              </p>
              <Button asChild size="lg" className="mt-2 h-11 w-fit px-6 text-base font-semibold">
                <Link href={slide.href}>{slide.cta}</Link>
              </Button>
            </div>
          </div>
        ))}

        <button
          onClick={prev}
          className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-secondary shadow-md transition hover:bg-background"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-secondary shadow-md transition hover:bg-background"
          aria-label="Próximo slide"
        >
          <ChevronRight className="size-5" />
        </button>

        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                'h-2 rounded-full transition-all',
                i === current ? 'w-6 bg-primary' : 'w-2 bg-white/60',
              )}
              aria-label={`Ir para o slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
