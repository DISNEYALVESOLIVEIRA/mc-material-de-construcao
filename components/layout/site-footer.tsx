'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  HardHat,
  Mail,
  Phone,
  MapPin,
  Clock,
  CreditCard,
  ShieldCheck,
  Lock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WhatsappIcon } from '@/components/icons/whatsapp-icon'

const institucional = [
  { label: 'Sobre a Empresa', href: '/sobre' },
  { label: 'Políticas de Envio', href: '/politicas/envio' },
  { label: 'Formas de Pagamento', href: '/politicas/pagamento' },
  { label: 'Política de Privacidade', href: '/politicas/privacidade' },
  { label: 'Trocas e Devoluções', href: '/politicas/trocas' },
]

const payments = ['Visa', 'Master', 'Elo', 'Pix', 'Boleto']

export function SiteFooter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) setSent(true)
  }

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="font-heading text-lg font-bold">
              Cadastre-se em nossa Newsletter
            </h3>
            <p className="text-sm text-white/70">
              Receba ofertas exclusivas e novidades em primeira mão.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
            {sent ? (
              <p className="w-full rounded-lg bg-whatsapp/15 px-4 py-3 text-center text-sm font-medium text-whatsapp">
                Cadastro realizado com sucesso!
              </p>
            ) : (
              <>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu melhor e-mail"
                  className="h-11 flex-1 rounded-lg border border-white/20 bg-white/10 px-4 text-sm text-white outline-none placeholder:text-white/50 focus:border-primary"
                  aria-label="E-mail para newsletter"
                />
                <Button type="submit" size="lg" className="h-11 px-6 font-semibold">
                  Cadastrar
                </Button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Colunas */}
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <HardHat className="size-5" />
            </span>
            <span className="font-heading text-lg font-extrabold">
              MC Material de Construção
            </span>
          </div>
          <p className="text-sm text-white/70">
            Tudo para a sua obra e acabamento em um só lugar, com preço justo e
            entrega rápida.
          </p>
          <a
            href="https://wa.me/5551999990000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-whatsapp px-4 py-2 text-sm font-semibold text-whatsapp-foreground hover:bg-whatsapp/90"
          >
            <WhatsappIcon className="size-4" />
            Fale conosco
          </a>
        </div>

        <div>
          <h4 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide">
            Institucional
          </h4>
          <ul className="space-y-2">
            {institucional.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/70 transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide">
            Atendimento
          </h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-primary" />
              (51) 3000-0000
            </li>
            <li className="flex items-center gap-2">
              <WhatsappIcon className="size-4 shrink-0 text-whatsapp" />
              (51) 99999-0000
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
              Seg. a Sex. 8h às 18h / Sáb. 8h às 12h
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-primary" />
              contato@mcmateriais.com.br
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              Av. das Construções, 1234 - Porto Alegre/RS
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide">
            Pagamento e Segurança
          </h4>
          <div className="flex flex-wrap gap-2">
            {payments.map((p) => (
              <span
                key={p}
                className="flex h-9 items-center rounded-md border border-white/20 bg-white/10 px-3 text-xs font-semibold"
              >
                {p}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium">
              <ShieldCheck className="size-4 text-whatsapp" />
              Site Seguro
            </span>
            <span className="flex items-center gap-1.5 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium">
              <Lock className="size-4 text-whatsapp" />
              SSL
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-white/70">
            <CreditCard className="size-4 text-primary" />
            Parcele em até 12x sem juros
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/60 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} MC Material de Construção. Todos os
            direitos reservados. CNPJ 00.000.000/0001-00.
          </p>
          <p>Desenvolvido com tecnologia de e-commerce de alta performance.</p>
        </div>
      </div>
    </footer>
  )
}
