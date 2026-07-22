'use client'

import { useEffect, useState } from 'react'
import { X, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function NewsletterPopup() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem('mc-newsletter-dismissed')
    if (dismissed) return

    const timer = setTimeout(() => setOpen(true), 6000)

    function onExitIntent(e: MouseEvent) {
      if (e.clientY <= 0) setOpen(true)
    }
    document.addEventListener('mouseleave', onExitIntent)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', onExitIntent)
    }
  }, [])

  function close() {
    setOpen(false)
    sessionStorage.setItem('mc-newsletter-dismissed', '1')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (name.trim() && email.trim()) setDone(true)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={close} aria-hidden="true" />
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-background shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-title"
      >
        <button
          onClick={close}
          className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-1.5 text-muted-foreground hover:bg-muted"
          aria-label="Fechar"
        >
          <X className="size-5" />
        </button>

        <div className="flex flex-col items-center gap-2 bg-secondary px-6 py-6 text-center text-secondary-foreground">
          <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Gift className="size-6" />
          </span>
          <h2 id="newsletter-title" className="font-heading text-xl font-extrabold">
            Ganhe 5% OFF na primeira compra
          </h2>
          <p className="text-sm text-white/80">
            Cadastre-se e receba seu cupom de desconto exclusivo.
          </p>
        </div>

        <div className="p-6">
          {done ? (
            <div className="space-y-3 text-center">
              <p className="text-lg font-bold text-secondary">
                Seu cupom está pronto!
              </p>
              <p className="rounded-lg border-2 border-dashed border-primary bg-primary/5 px-4 py-3 font-heading text-xl font-extrabold tracking-widest text-primary">
                PRIMEIRACOMPRA
              </p>
              <Button onClick={close} className="w-full" size="lg">
                Aproveitar agora
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-primary"
                aria-label="Nome"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-primary"
                aria-label="E-mail"
              />
              <Button type="submit" size="lg" className="h-11 w-full font-semibold">
                Quero meu desconto
              </Button>
              <button
                type="button"
                onClick={close}
                className="w-full text-xs text-muted-foreground hover:underline"
              >
                Não, obrigado
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
