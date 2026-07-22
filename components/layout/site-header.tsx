'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  HardHat,
  MapPin,
  Headphones,
  User,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Tag,
} from 'lucide-react'
import { Topbar } from '@/components/layout/topbar'
import { SearchBar } from '@/components/layout/search-bar'
import { useCart } from '@/components/cart/cart-provider'
import { categories } from '@/lib/products'

function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="MC Material de Construção - Página inicial">
      <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <HardHat className="size-6" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-lg font-extrabold tracking-tight text-secondary">
          MC
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          Material de Construção
        </span>
      </span>
    </Link>
  )
}

export function SiteHeader() {
  const { totalItems, openCart } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-background shadow-sm">
      <Topbar />

      {/* Header principal */}
      <div className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="size-6 text-secondary" />
          </button>

          <Logo />

          <SearchBar className="hidden flex-1 md:block" />

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <Link
              href="/rastreio"
              className="hidden flex-col items-center rounded-md px-2 py-1 text-secondary hover:bg-muted sm:flex"
            >
              <MapPin className="size-5 text-primary" />
              <span className="text-[11px] font-medium">Rastrear</span>
            </Link>
            <Link
              href="/atendimento"
              className="hidden flex-col items-center rounded-md px-2 py-1 text-secondary hover:bg-muted sm:flex"
            >
              <Headphones className="size-5 text-primary" />
              <span className="text-[11px] font-medium">Atendimento</span>
            </Link>
            <Link
              href="/conta"
              className="flex flex-col items-center rounded-md px-2 py-1 text-secondary hover:bg-muted"
            >
              <User className="size-5 text-primary" />
              <span className="hidden text-[11px] font-medium sm:block">Conta</span>
            </Link>
            <button
              onClick={openCart}
              className="relative flex flex-col items-center rounded-md px-2 py-1 text-secondary hover:bg-muted"
              aria-label={`Carrinho com ${totalItems} itens`}
            >
              <span className="relative">
                <ShoppingCart className="size-5 text-primary" />
                {totalItems > 0 && (
                  <span className="absolute -right-2 -top-2 flex size-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </span>
              <span className="hidden text-[11px] font-medium sm:block">Carrinho</span>
            </button>
          </div>
        </div>

        {/* Busca mobile */}
        <div className="px-4 pb-3 md:hidden">
          <SearchBar />
        </div>
      </div>

      {/* Barra de navegação (desktop) */}
      <nav className="hidden border-b border-border bg-background lg:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 px-4">
          {categories.map((cat) => (
            <div key={cat.slug} className="group relative">
              <Link
                href={`/categoria/${cat.slug}`}
                className="flex items-center gap-1 px-3 py-3 text-sm font-medium text-secondary transition-colors hover:text-primary"
              >
                {cat.label}
                <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="invisible absolute left-0 top-full z-40 min-w-56 rounded-b-lg border border-border bg-popover opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
                <ul className="py-2">
                  {cat.links.map((link) => (
                    <li key={link.slug}>
                      <Link
                        href={`/categoria/${cat.slug}/${link.slug}`}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <Link
            href="/promocoes"
            className="ml-auto my-1.5 flex items-center gap-1.5 rounded-md bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground hover:bg-primary/90"
          >
            <Tag className="size-4" />
            Promoções
          </Link>
        </div>
      </nav>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 top-0 flex h-dvh w-80 max-w-[85%] flex-col bg-background shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <Logo />
              <button onClick={() => setMobileOpen(false)} aria-label="Fechar menu">
                <X className="size-6 text-secondary" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4">
              <Link
                href="/promocoes"
                onClick={() => setMobileOpen(false)}
                className="mb-3 flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"
              >
                <Tag className="size-4" />
                Promoções
              </Link>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <details className="group">
                      <summary className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-secondary hover:bg-muted">
                        {cat.label}
                        <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                      </summary>
                      <ul className="ml-3 border-l border-border pl-3">
                        {cat.links.map((link) => (
                          <li key={link.slug}>
                            <Link
                              href={`/categoria/${cat.slug}/${link.slug}`}
                              onClick={() => setMobileOpen(false)}
                              className="block py-2 text-sm text-muted-foreground hover:text-primary"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-1 border-t border-border pt-4">
                <Link href="/rastreio" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-secondary hover:bg-muted">
                  <MapPin className="size-4 text-primary" /> Rastrear Pedido
                </Link>
                <Link href="/atendimento" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-secondary hover:bg-muted">
                  <Headphones className="size-4 text-primary" /> Atendimento
                </Link>
                <Link href="/conta" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-secondary hover:bg-muted">
                  <User className="size-4 text-primary" /> Minha Conta
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
